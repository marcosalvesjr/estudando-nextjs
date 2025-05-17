import { Header } from "@/components/header";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aula Next JS do zero",
  description: "Aprendendo Next JS do zero",
  openGraph: {
    title: "Aprendendo Next JS do zero com Sujeiro Programador",
    description: "Aprendendo next js com Sujeito Programador no youtube",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
