// No invented production origin: indexing stays disabled until configured.
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const siteUrl = configuredUrl ? new URL(configuredUrl) : undefined;
if (siteUrl && (siteUrl.protocol !== "https:" || !siteUrl.pathname.endsWith("/") || siteUrl.search || siteUrl.hash)) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS URL with a trailing slash, without a query or hash.");
}
