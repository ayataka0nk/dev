import { AppProps } from 'next/dist/next-server/lib/router/router'

function MyApp({ Component, pageProps }: AppProps) {
  const hoge = 'hoge'
  return <Component {...pageProps} />
}

export default MyApp
