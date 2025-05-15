import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col mt-5">
      <h1 className="font-bold text-4xl mb-2">Pagina 404 não encontrada!</h1>
      <p>Essa página não existe</p>
      <Link href={'/'}>Voltar para home</Link>
    </div>
  );
}
