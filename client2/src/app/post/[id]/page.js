import React from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function getPost(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function PostPage({ params }) {
  const { id } = await params; // Await the params object
  const post = await getPost(id);

  if (!post) {
    return <div className="text-center text-lg text-red-600">Post not found</div>;
  }

  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-3xl bg-white p-6 border border-gray-300 shadow-md rounded-lg space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">{post.title}</h1>
        <div className="text-center text-gray-600 mb-4">
          <p><strong>Updated:</strong> {new Date(post.updated).toLocaleString()}</p>
          <p><strong>Last Date:</strong> {post.last_date ? new Date(post.last_date).toLocaleString() : "N/A"}</p>
          {post.region}
        </div>
        <div className="border-t-2 border-gray-200 pt-4">
          <div className="post-content text-base leading-relaxed text-gray-800" 
               dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
}
