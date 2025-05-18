"use client";

import { useEffect, useState } from "react";

export default function PageTest() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []);
  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-2">
        Todos os posts lado client
      </h1>
      <div className="flex flex-col gap-4">
        {posts.map((post: any) => (
          <div key={post.id} className="bg-gray-200 rounded-md p-4">
            <h2 className="font-bold text-center">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
