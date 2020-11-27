---
title: Markdown で記事を管理できる Amp 対応ブログを Next.js により Static Generation する
published: 2020-11-26T23:00:00.000+09:00
tags: react,next.js,markdown,amp
---

# Markdown で記事を管理できる Amp 対応ブログを Next.js により Static Generation する

## 前置き

以前より Google は Google 検索結果からのページ遷移を早くするために、[AMP](https://amp.dev/ja/)技術を推奨するなどしてきた。そしてページの表示速度などを含むユーザ体験に関する指標、[Page Experience](https://developers.google.com/search/docs/guides/page-experience)が SEO に影響を及ぼすようになる更新を 2021 年 5 月にリリースすると発表した ([Google 検索へのページ エクスペリエンスの導入時期](https://developers.google.com/search/blog/2020/11/timing-for-page-experience))。同発表によると AMP 対応の有無それ自体は SEO に影響を与えない。しかし AMP は静的 Web サイトに関するある種のベストプラクティスが詰め込まれているので、AMP に対応すれば自然とある程度の Page Experience が保証される。

しかし AMP には制限が多い、ページの表示が崩れるなどのデメリットも見受けられる。また 0 から amp を書くと、[AMP 公式](https://amp.dev/ja/)を読むとわかるが、意識すべきことがとても多い。つまり簡単ではない上に、黎明期の技術なので全振りしてページを作ってもゴミになる可能性が捨てきれないということである。

そこで[Next.js の Amp 対応機能](https://nextjs.org/docs/api-reference/next/amp)を使えば、ゼロから作るよりずっと簡単に AMP に対応できる上に、比較的簡単に AMP をやめることもできる。また AMP 対応ページと非対応ページを混在させることも簡単にできる。

今回は Next.js の Static Generation によって AMP に対応したブログを作成する上でのポイントを簡単に示す。ソースはここ[naoto-kamba/dev](https://github.com/naoto-kamba/dev)。

## 準備

[Getting Started](https://nextjs.org/docs/getting-started)に従い、通常通り Next.js のプロジェクトを用意する。今回は [TypeScript](https://nextjs.org/docs/basic-features/typescript) も導入している。

## Next.js 　と AMP

[next/amp](https://nextjs.org/docs/api-reference/next/amp)に従うだけでできる。今回はすべて AMP First Page とした。AMP にするかどうかは、ページごとに決定できる。今回はそうしてないが、例えば個別記事ページは検索から来る人を想定して速度重視の AMP、検索ページとタグページは非 AMP として機能を盛るなど、使い分けることができる。

## AMP 専用 Tag と TypeScript

2020/11/27 現在、next.js はデフォルトで amp-img のような AMP 専用タグに対応しているが、TypeScript は AMP 専用タグに対応していない。したがって、types/amp.d.ts のような型宣言ファイルを作成し、型を定義しなければならない。例えば amp-img タグであれば、次のようになる。

```TypeScript
declare namespace JSX {
  interface AmpImg {
    className?: string
    alt?: string
    src: string
    width: string
    height: string
    layout?: string
  }
  interface IntrinsicElements {
    'amp-img': AmpImg
  }
}
```

## Next.js -> Static Generation

[getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation)で柔軟に作るべきページのパス一覧を用意する。用意されたパス 1 つに対して[getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)が 1 回実行され、ページの Props を生成する。

### 個別記事ページの例

例えば個別記事ページは、[/src/pages/posts/[slug].tsx](https://github.com/naoto-kamba/dev/blob/main/src/pages/posts/%5Bslug%5D.tsx)のように作成する。

### 個別記事ページにおける getStaticPaths

`getStaticPaths` にて、記事格納先[/public/posts](https://github.com/naoto-kamba/dev/tree/main/public/posts)下の全ディレクトリ名を`readSlugs()`によって取得し、フォルダ名の一覧を含む情報を paths として 返した。この場合、paths として与えられたフォルダ名ひとつひとつが、`[slug]`と置き換わり、URL となる。例えば`/public/posts/202010170628_sample1`に格納した記事の URL は`/posts/202010170628_sample1`となる。

### 個別記事ページにおける getStaticProps

`getStaticPaths` で指定したパス一覧から、パス 1 つにつき `getStaticProps` は 1 回実行されると説明した。今回の例では、あるひとつのパス`202010170628_sample1`のとき、`getStaticProps` の引数 `context.params.slug` に文字列`202010170628_sample1`が格納されているので、その文字列から読むべき記事フォルダの場所を特定し、Markdown から投稿日時などを抽出したのち HTML 変換して返している。Markdown 変換については後述する。ここで返されたものは、NextPage コンポーネントの props に渡されるので、それを用いてあとは通常の React と同じようにページを生成する。

### タグページの例

これはタグページにも応用でき、[/src/pages/tags/[tag].tsx](https://github.com/naoto-kamba/dev/blob/main/src/pages/tags/%5Btag%5D.tsx)のように作成する。ここでは、`getStaticPaths` にて全記事からタグを重複無しで取得して返している。そして`getStaticProps`にて各タグに属するページの一覧情報を取得して返している。それは当該 NextPage コンポーネントの props に渡されるので、普通の React と同様にページを作る。

## Markdown -> HTML 変換

Markdown の扱いに関しては検索すると既に多くの情報があるので、抽象的な説明は省略し、キーワードのみ記す。key: `Unified, Remark, Rehype`

今回の例では[/src/foundations/MdConverter.ts](https://github.com/naoto-kamba/dev/blob/main/src/foundations/MdConverter.ts)のように作成した。プロセッサー部だけ抜き出すと次のようになっている。適用している変換を順に示す。

```TypeScript
const processer = unified()
    .use(remarkParse)
    .use(remarkToRehype, { allowDangerousHtml: true }) //Markdown内の生htmlを許容しながら変換
    .use(rehypeRaw) //Markdown内にあった生htmlをデコード
    .use(makeImagePathReplacer(slug)) //画像パスを変換
    .use(rehypeHighlight) //<code>のハイライトを有効
    .use(htmlAmpConverter) //一部タグをamp仕様に変換
    .use(rehypeStringify) //htmlを文字列に変換
```

### remark-pase

Markdown を Markdown の木構造テキストである mdhast に変換。

### remark-rehype

mdhast を html の木構造テキストである hast に変換。`allowDangerousHtml`オプションを有効にして、Markdown に生で書いた HTML タグも維持する。

### rehype-raw

Markdown に生で書いた HTML タグをデコード。

### rehype-highlight

Markdown においてシングルクォート 3 つで囲った中に書いたコードを分析し、`highlight.js`にしたがって色付けのためのクラス名を付与したタグを、しかるべき場所に挿入する。実際に色をつけるには CSS を導入しておく必要があり、[https://highlightjs.org/](https://highlightjs.org/)などで手に入れる。「hilightjs css」などで検索してもよい。

### ImagePathReplacer

自作の Unified Attacher。ソース →[/src/foundations/unified-plugin/ImagePathReplacer.ts](https://github.com/naoto-kamba/dev/blob/main/src/foundations/unified-plugin/ImagePathReplacer.ts)。

Markdown ファイルをローカルで編集することを考えると、画像のパスは Markdown ファイルとの相対パスで記述されているはずである。しかし HTML 変換しデプロイすると、そのパスはもちろん変化する。それに対応するために、パスを都合よく書き換える必要がある。
今回は`/public/posts`を記事の配置場所とし、それに合わせて Markdown ファイル内の画像パスを書き換えている。

### HtmlAmpConverter

自作の Unified Attacher。ソース →[/src/foundations/unified-plugin/HtmlAmpConverter.ts](https://github.com/naoto-kamba/dev/blob/main/src/foundations/unified-plugin/HtmlAmpConverter.ts)。

Markdown->HTML 変換の際に、一部タグを AMP 対応タグに変換する。たとえば AMP において画像タグには `<amp-img>` を使うべきだが remark-rehype では`<img>`になる。したがってここで、`<img>`を`<amp-img>`に置き換える。`<amp-img>`には width と height の指定が必須なので、元の画像に width と height が指定されていなかった場合の対応などもここで行っている。

### rehype-stringify

hast を HTML 文字列に変換する。

## 記事の CSS

[/src/components/article/ArticleContent.tsx](https://github.com/naoto-kamba/dev/blob/main/src/components/article/ArticleContent.tsx)に style-jsx で記述している。`<style jsx global>`でグローバル定義した 記事用 CSS を、親要素に md-body クラスを指定することで閉じ込めている。記述する CSS は [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)をこの辺から抜いてきて、AMP に対応すべく`!import`を消すなどの整理をした。

既に rehype-hilight の項目で触れたが、`<code>`への hilight を有効にするための CSS も記事の CSS に含めている。

## 〆

以上のポイントを押さえて、今回は当ブログを作成した。個別の説明は検索すれば多く出てくるため、各項目では目的に対して大筋を示すことを重視した。

質問やマサカリはリプか DM にて。→ 　https://twitter.com/ayataka0nk
