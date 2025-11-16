import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import {
  preloadAllImages,
  preloadCriticalImages,
  preloadRouteImages,
} from "../lib/imagePreloader";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Preload critical images immediately
    preloadCriticalImages();

    // Preload all images in the background (non-blocking)
    preloadAllImages().catch((err) => {
      console.warn("Some images failed to preload:", err);
    });

    // Preload images for current route
    preloadRouteImages(router.pathname);

    // Preload images for next route on route change start
    const handleRouteChangeStart = (url) => {
      preloadRouteImages(url);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router]);

  return (
    <div dir="rtl" lang="ar">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

