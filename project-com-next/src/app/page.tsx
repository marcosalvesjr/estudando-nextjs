import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="bg-amber-300 text-amber-950">Página Home</h1>
      <Link href={"/contatos"}>Contatos</Link>
    </div>
  );
}
