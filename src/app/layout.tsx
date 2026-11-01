import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/cyrillic-400.css";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import { assetPath } from "@/lib/paths";

const title = "Руслан Эхтибаров — инженер-конструктор в Санкт-Петербурге";
const description = "3D-моделирование, конструкторская документация, испытания электрооборудования и сопровождение производства. Опыт работы в НПП «ЭПРО» с 2021 года. Резюме и контакты.";
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title, description,
  applicationName: "Руслан Эхтибаров · инженерное портфолио",
  authors: [{ name: "Руслан Эхтибаров" }],
  alternates: siteUrl ? { canonical: siteUrl.href } : undefined,
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
  openGraph: { title, description, locale: "ru_RU", type: "website", ...(siteUrl ? { url: siteUrl, images: [{ url: new URL("images/og-cover.jpg", siteUrl).href, width: 1200, height: 630, alt: "Руслан Эхтибаров — инженер-конструктор" }] } : {}) },
  twitter: { card: "summary_large_image", title, description, ...(siteUrl ? { images: [new URL("images/og-cover.jpg", siteUrl).href] } : {}) },
  icons: { icon: assetPath("/favicon.svg"), apple: assetPath("/apple-touch-icon.png") },
};
export const viewport: Viewport = { themeColor: "#0b1420", colorScheme: "dark" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body><a className="skip-link" href="#main-content">Перейти к содержимому</a>{children}</body></html>;
}
