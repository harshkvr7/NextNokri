"use client"; 

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function Search() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = tag
          ? await fetch(`/api/posts?tags=${tag}`) 
          : await fetch(`/api/posts?limit=10`); 

        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [tag]); 

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-screen-xl rounded-lg space-y-6">
        <div className="space-y-8">
          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Search Results for: <span className="text-blue-600">{tag}</span>
            </h2>
            <ul className="space-y-3">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <li key={post.id} className="border-b border-gray-200 pb-2">
                    <Link href={`/post/${post.id}`} className="text-blue-600 hover:underline text-lg font-medium">
                      {post.title}
                    </Link>
                    <p className="text-gray-500 text-sm">
                      Updated: {new Date(post.updated).toLocaleString()}
                    </p>
                    {post.last_date && (
                      <p className="text-red-600 text-sm">
                        Last Date: {new Date(post.last_date).toLocaleDateString()}
                      </p>
                    )}
                  </li>
                ))
              ) : (
                <li>No posts found</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <Search />
    </Suspense>
  );
}
