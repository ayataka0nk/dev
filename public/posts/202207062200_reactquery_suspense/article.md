---
title: React-Query で Suspense モードを使う
published: 2022-07-06 22:00:00
updated: 2022-07-13 22:00:00
tags: 技術,React,react-query
---

# React-Query で Suspense モードを使う

## 2022/07/13 追記

まだ react-query の useQueries は suspense で動かない不具合がある？らしき issue がありました。私が前やったとき動いたように感じたのは何かの間違いだったのか…？まだ自分で検証はできていませんが、とりあえずリンク張っておきます。

[https://github.com/TanStack/query/issues/1523:embed:cite]

とはいえそのうち使えるようにするらしき雰囲気があるので、当記事の結論そのものに変更は無いですが。

## 結論

React Query で Suspense モードを使うときは、並列化を想定して QueryOptions 単位で共通化して任意の場所で useQueries に突っ込めるようにしておく。

## 詳細

React Query は React 用のキャッシュ管理が楽になるライブラリです。それ以上の概要については既に多くの記事があったので省きます。

React Query で Suspense モードを使う場合まず公式のコレを読みましょう。
[https://react-query.tanstack.com/guides/suspense#_top:embed:cite]

では本題。React Query を使うときは useQuery 単位で抽象化しがちです。しかし React18 で Suspense と合わせて使うことを想定すると並列化において問題が生じます。それについて公式サイトは次のように言及しています。

[https://react-query.tanstack.com/guides/parallel-queries:embed:cite]

> When using React Query in suspense mode, this pattern of parallelism does not work, since the first query would throw a promise internally and would suspend the component before the other queries run. To get around this, you'll either need to use the useQueries hook (which is suggested) or orchestrate your own parallelism with separate components for each useQuery instance (which is lame).

要するに useQuery を連続で書くだけだと一個目の useQuery の時点でサスペンドしてしまい並列取得にならないという話です。それを解決するためには自前の並列化機構を用意するか useQueries を使うことが推奨されています。

[https://react-query.tanstack.com/reference/useQueries#_top:embed:cite]

useQueries は引数に QueryOptions 型の配列を取ります。QueryOptions 型についてはソースの型宣言を読むといいです。普通に使うとき node_modules 参照して読めばいいと思いますが、github でいうとこの辺です。

[https://github.com/TanStack/query/blob/2d2de448c5f9ca9680b0ac5ad094fd69de0c928e/src/core/types.ts#L53:embed:cite]

useQuery の options 項目読んでもおそらく大体載ってます。

[https://react-query.tanstack.com/reference/useQuery#_top:embed:cite]

## サンプル

この方向性で作ったサンプルと一部抜粋です。

[https://github.com/ayataka0nk/nextjs12-reactquery-sample:embed:cite]

必要に応じて QueryOptions を生成するようにして、使う側で useQuery や useQueries を選びます。使う側から staleTime や cacheTime、refetchOnMount など変更したい QueryOption があるなら createUserQueryOptions の引数で受け取るようにすれば柔軟に対応できます。

```typescript
import { InvalidateOptions, useQueryClient, UseQueryOptions } from 'react-query'
import { QueryFilters } from 'react-query/types/core/utils'
import { User } from '../../types/User'

const userQueryKey = '/users'

type UserQueryKeys = [path: string, params: { userId: number }]

export const createUserQueryOptions = (
  userId: number
): UseQueryOptions<User, unknown, User, UserQueryKeys> => {
  return {
    queryKey: [userQueryKey, { userId }],
    queryFn: async ({ queryKey }) => {
      const [path, { userId }] = queryKey
      const result = await fetch(
        'http://localhost:3000/api' + path + '/' + userId,
        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        }
      )
      return result.json()
    },
  }
}
```

```typescript
export const UserEditFormFoo = ({ userId }: UserEditCardProps) => {
  const user = useQuery(createUserQueryOptions(userId))
...
}
```

```typescript
export const UserEditFormBar = ({ userId }: UserEditCardProps) => {
  const [ user ] = useQueries([createUserQueryOptions(userId)])
...
```

## 余談

prefetch したいならこんな感じでそのまま放り込むこともできます。

```typescript
import { useQueryClient } from 'react-query'
...
export const HogeComponent = () => {
...
  const queryClient = useQueryClient()
    useEffect(() => {
      queryClient.prefetchQuery(createUserQueryOptions(userId))
    }, [queryClient, userId])
...
}
```

今回は react-query がメインだったので QueryOptions の queryFn 内で直接 fetch 使いましたが、通常は fetch 部分を切り出した方が絶対に良いです。
バックエンドから受け取る型をフロントエンドで扱う型に変換する層を hooks ではなく純粋関数で作り、queryFn でそれを使いましょう。API レスポンスはスネークケースだが React ではキャメルケースとかよくある話ですよね。
