import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://neofitflow.com.br'),
  title: {
    default: "NeoFitFlow - Automação WhatsApp para Academias",
    template: "%s | NeoFitFlow"
  },
  description: "Plataforma de automação WhatsApp com construtor visual de fluxos para academias gerenciarem leads, retenção e operações sem saber programar.",
  keywords: "automação whatsapp academia, gestão fitness, crm academia, retenção alunos, conversão leads academia",
  authors: [{ name: "NeoFitFlow" }],
  creator: "NeoFitFlow",
  publisher: "NeoFitFlow",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://neofitflow.com.br",
    siteName: "NeoFitFlow",
    title: "NeoFitFlow - Automação WhatsApp para Academias",
    description: "Reduza evasão e aumente matrículas com automação visual no WhatsApp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
