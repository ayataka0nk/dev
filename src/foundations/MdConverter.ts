import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkToRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import { makeImagePathReplacer } from './unified-plugin'

export const markdownToAmpHtml = async (slug: string, markdown: string) => {
  const processer = unified()
    .use(remarkParse)
    .use(remarkToRehype, { allowDangerousHtml: true }) //Markdown内の生htmlを許容しながら変換
    .use(rehypeRaw) //Markdown内にあった生htmlをデコード
    .use(makeImagePathReplacer(slug)) //画像パスを変換
    .use(rehypeHighlight) //<code>のハイライトを有効
    .use(rehypeStringify) //htmlを文字列に変換
  const parsedContent = await processer.process(markdown)
  const content = parsedContent.toString()
  return content
}
