import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="وزارة البيئة والمياه والزراعة - منصة الثقافة المؤسسية"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Preload critical images for faster initial load */}
        {/* Note: Brand images are imported as modules, so they're already optimized */}
        <link rel="preload" as="image" href="/pgbg.jpg" />
        <link rel="preload" as="image" href="/fgbg.png" />
        {/* External SVG has CORS restrictions, skip preload */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
