import { useState, useEffect } from "react";
export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://fragile-pea-coat-jay.cyclic.app/api/v1/art"
      );
      const data = await response.json();
      setPosts(data);
    };
    fetchData();
  }, []);
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="max-w-sm bg-white rounded overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4">
              <img
                className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
                src={post.url}
              />
              <p className="text-gray-700 text-base">{post.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
