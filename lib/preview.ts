// Preview image for a live demo URL, fetched from the URL itself.
// 1. Fetch the live site's HTML and use its own og:image / twitter:image
//    when it has one (MediaVerse and Cuberverse do, for example).
// 2. Otherwise fall back to a live screenshot of that URL via thum.io,
//    which returns a PNG of the site as it looks right now.
// This never uses a GitHub og image for a project that has a live URL,
// and it works even when a site blocks iframes (SplitLLM sends
// X-Frame-Options: DENY, so an iframe preview can never show it).
// Returns null only when there is no demo URL at all.
export async function fetchSitePreview(demo: string): Promise<string | null> {
  const screenshot = `https://image.thum.io/get/width/1200/crop/750/noanimate/${demo}`
  try {
    const res = await fetch(demo, {
      signal: AbortSignal.timeout(5000),
      headers: { "User-Agent": "siv19.dev preview fetch" },
    })
    if (!res.ok) return screenshot
    const type = res.headers.get("content-type") ?? ""
    if (!type.includes("text/html")) return screenshot
    const html = await res.text()
    const match =
      html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image)["']/i)
    if (match?.[1]) {
      try {
        return new URL(match[1], demo).toString()
      } catch {
        return screenshot
      }
    }
    return screenshot
  } catch {
    return screenshot
  }
}
