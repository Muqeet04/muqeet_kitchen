import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Native Coast — Kitchen Appliances, Fitted & Renovated",
  description:
    "Native Coast Appliances — bespoke kitchen fitting and renovation. Hand-built cabinetry, stone worktops and brass fixtures, fitted by our own crew.",
  keywords: [
    "Native Coast",
    "Kitchen Fitting",
    "Kitchen Renovation",
    "Bespoke Kitchens",
    "London Kitchens",
    "Cabinetry",
    "Quartz Worktops",
  ],
  authors: [{ name: "Native Coast" }],
  openGraph: {
    title: "Native Coast — Kitchen Appliances, Fitted & Renovated",
    description:
      "Hand-built cabinetry, polished stone worktops and brass fixtures — fitted by our own crew.",
    type: "website",
    locale: "en_GB",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A0A0E",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
