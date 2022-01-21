import GoogleTagManager from 'components/GoogleTagManager'
import { AppProps } from 'next/dist/next-server/lib/router/router'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleTagManager>
      <Component {...pageProps} />
    </GoogleTagManager>
  )
}

export default MyApp
