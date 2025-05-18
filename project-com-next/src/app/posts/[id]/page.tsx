import { Suspense } from "react";
import { PostInfo } from "../_components/post";
import { PostProps } from "../page";

export default async function DetailsPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-center font-bold text-4xl">Detalhes do post: {id}</h1>
      <Suspense fallback={<h1>Carregando...</h1>}>
        <PostInfo id={id} />
      </Suspense>
    </div>
  );
}
