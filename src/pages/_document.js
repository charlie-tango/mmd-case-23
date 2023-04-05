import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
