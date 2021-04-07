import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <script
            async
            custom-element="amp-analytics"
            src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
          ></script>
        </Head>
        <body>
          <amp-analytics
            config="https://www.googletagmanager.com/amp.json?id=GTM-MB3CCZZ&gtm.url=SOURCE_URL"
            data-credentials="include"
          ></amp-analytics>

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
