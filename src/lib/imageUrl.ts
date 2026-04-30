/**
 * Builds a Supabase Storage image-transformation URL for thumbnail use.
 *
 * Supabase transforms the image server-side (resize + compress) when the
 * URL path starts with /storage/v1/render/image/ instead of
 * /storage/v1/object/. On the Free plan the endpoint exists but returns the
 * original; on Pro+ it returns the resized image — so using this everywhere
 * is safe and automatically improves when the project upgrades.
 *
 * @param url     - Public storage URL as returned by getPublicUrl()
 * @param width   - Target pixel width (default 600)
 * @param quality - JPEG/WebP quality 1-100 (default 75)
 */
export function thumbUrl(
  url: string | null | undefined,
  width = 600,
  quality = 75,
): string {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.pathname.includes("/storage/v1/object/public/")) {
      u.pathname = u.pathname.replace(
        "/storage/v1/object/public/",
        "/storage/v1/render/image/public/",
      );
      u.searchParams.set("width", String(width));
      u.searchParams.set("quality", String(quality));
      return u.toString();
    }
  } catch {
    // Not a valid absolute URL — fall through
  }
  return url;
}
