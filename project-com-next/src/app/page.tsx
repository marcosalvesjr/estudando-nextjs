import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Aula Next JS do zero",
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

export default function Home() {
  return (
    <div>
      <h1 className="bg-amber-300 text-amber-950">Página Home</h1>
      <Link href={"/contatos"}>Contatos</Link>
    </div>
  );
}
