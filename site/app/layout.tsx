import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://partyunfiltered.example.com"),
  title: "Party Unfiltered™ — East Africa Edition | The Game That Brings the Sherehe to the Table",
  description:
    "170 cards. 3 heat levels. Zero forced vulnerability. The ultimate East African party game for grown-ups (18+). 155 core cards plus the sealed 15-card Filters Off pack — unlocked only by unanimous consent.",
  keywords: [
    "party game",
    "East Africa",
    "Kenya",
    "Nairobi",
    "card game",
    "adult party game",
    "sherehe",
  ],
  openGraph: {
    title: "Party Unfiltered™ — East Africa Edition",
    description:
      "The game that brings the sherehe to the table. 170 cards, 3 heat levels, zero forced vulnerability. 18+.",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Party Unfiltered™ — East Africa Edition",
    description: "170 cards. 3 heat levels. Zero forced vulnerability. 18+.",
  },
};

export const viewport: Viewport = {
  themeColor: "#120b26",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Clash Display (headings) + General Sans (body) via Fontshare */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
