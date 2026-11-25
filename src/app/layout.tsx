import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thalassa-yacht.vercel.app"),
  title: "THALASSA | 62M Luxury Superyacht — A Journey from Dawn to Midnight",
  description:
    "Experience THALASSA, an ultra-luxury 62-meter bespoke superyacht. A continuous cinematic voyage through light, sound, and ocean from dawn to midnight.",
  keywords: ["superyacht", "luxury charter", "Thalassa", "Monaco", "yacht design", "bespoke voyage"],
  openGraph: {
    title: "THALASSA | 62M Luxury Superyacht",
    description: "A continuous cinematic voyage from dawn to midnight.",
    images: ["/videos/dawn.mp4"],
  },
};

export const viewport: Viewport = {
  themeColor: "#040914",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} bg-[#040914] text-[#FAF7F2] antialiased`}>
      <body className="min-h-screen bg-[#040914] text-[#FAF7F2] font-sans selection:bg-[#C5A880]/30 selection:text-[#FAF7F2] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
