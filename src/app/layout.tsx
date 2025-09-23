import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./(components)/navbar";
import Footer from "./(components)/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A⚡️GH – O Raio dos Videojogos em Angola",
  description:
    "Publisher de jogos • Do Indie ao Pro | Academy | Esports | Negócios • A melhor escolha para a indústria Angolana de videojogos.",
  openGraph: {
    title: "A⚡️GH – O Raio dos Videojogos em Angola",
    description:
      "🎮 Do Indie ao Pro | Academy | Esports | Negócios • Transformando o futuro dos videojogos em Angola.",
    url: "https://seu-dominio.com",
    siteName: "A⚡️GH",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AIGH – O Raio dos Videojogos em Angola",
      },
    ],
    locale: "pt_AO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A⚡️GH – O Raio dos Videojogos em Angola",
    description:
      "Do Indie ao Pro | Academy | Esports | Negócios • A melhor escolha para a indústria Angolana.",
    images: ["/og-image.png"],
  },
  keywords: [
    "AIGH",
    "Angola Indie Game Hub",
    "videojogos Angola",
    "indie games",
    "esports",
    "academy",
    "publisher",
  ],
  authors: [{ name: "AIGH Team" }],
  creator: "AIGH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        {/* <Header /> */}
        <div className="min-h-screen bg-black">
          {children}
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}