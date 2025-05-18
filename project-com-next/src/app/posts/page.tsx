import { Button } from "@/components/button";

interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface ResponseProps {
  posts: PostProps[];
}

export default async function PostsPage() {
  const response = await fetch("https://dummyjson.com/posts");
  const data: ResponseProps = await response.json();

  async function handleFetchPosts() {
    "use server";
    const response = await fetch("https://dummyjson.com/posts");
    const data: ResponseProps = await response.json();
    console.log(data);
  }
  async function handleSearchUser(formData: FormData) {
    "use server";

    const userId = formData.get("userId");
    const response = await fetch(`https://dummyjson.com/posts/user/${userId}`);
    const data: ResponseProps = await response.json();
    console.log(data);
  }

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-2">Todos os posts</h1>
      <button onClick={handleFetchPosts}>Clicar</button>

      <form className="flex gap-2 my-4" action={handleSearchUser}>
        <input
          type="text"
          placeholder="ID do usuário"
          className="border border-gray-200 p-2"
          name="userId"
        />
        <button type="submit" className="bg-blue-500 p-2 text-white">
          Buscar usuário
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {data.posts.map((post) => (
          <div key={post.id} className="bg-gray-200 rounded-md p-4">
            <h2 className="font-bold text-center">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
