import GoogleTagManager from 'components/GoogleTagManager'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleTagManager>
      <Component {...pageProps} />
    </GoogleTagManager>
  )
}

export default MyApp
