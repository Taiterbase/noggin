import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    /* 'overflow-hidden h-full' and 'h-full overflow-auto are to disable overscrolling effects */
    return (
      <Html lang="en">
        <Head>
          <meta property="title" content="Noggin" key="title" />
        </Head>
        <body className='overflow-hidden h-full overscroll-none'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument