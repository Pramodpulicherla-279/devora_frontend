import { useEffect } from 'react';

/**
 * Hides the body-level ad units (#site-ads in index.html) for as long as the
 * calling screen is mounted.
 *
 * Those units are injected by third-party scripts directly into <body>, after
 * #root, so React never owns them. On screens that size themselves to the
 * viewport and scroll internally — the lesson screen — the ad blocks add a
 * page-level scroll region *below* the app. Scrolling the page then slides the
 * lesson out of view and fills the screen with ads instead of content.
 *
 * Restores the previous inline display value on unmount so ads keep showing on
 * normally-scrolling pages (landing, tracks, profile, …).
 */
export function useHideSiteAds() {
  useEffect(() => {
    const ads = document.getElementById('site-ads');
    if (!ads) return;

    const previous = ads.style.display;
    ads.style.display = 'none';

    return () => { ads.style.display = previous; };
  }, []);
}

export default useHideSiteAds;
