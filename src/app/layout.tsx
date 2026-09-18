import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFrame } from "@/components/site-frame";
import "./globals.css";

const sans = localFont({
  src: [
    {
      path: "../fonts/HurmeGeometricSans1-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/HurmeGeometricSans1-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/HurmeGeometricSans1-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/HurmeGeometricSans1-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/HurmeGeometricSans1-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "block",
  adjustFontFallback: false,
});

const serif = localFont({
  src: [
    {
      path: "../fonts/SometimesTimes-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SometimesTimes-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/SometimesTimes-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "block",
  adjustFontFallback: false,
});

const display = localFont({
  src: "../fonts/BebasNeuePro-Bold.otf",
  variable: "--font-display",
  weight: "700",
  display: "block",
  adjustFontFallback: false,
});

const quote = localFont({
  src: "../fonts/MinionPro-Regular.otf",
  variable: "--font-quote",
  weight: "400",
  display: "block",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "Prince Hassan Group",
    template: "%s — Prince Hassan Group",
  },
  description:
    "Six markets. Five languages. One maker of legacies.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f3efe8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable} ${display.variable} ${quote.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-brown">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
