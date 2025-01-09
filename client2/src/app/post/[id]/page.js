"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation"; 

const Post = () => {
  const router = useRouter();  
  const pathname = usePathname(); // Full pathname, e.g., "/posts/123"
  const id = pathname.split("/").pop(); // Extract the last part as id

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching post");
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!post) {
    return <div className="text-center text-lg">Post not found</div>;
  }

  return (
    <div className="flex justify-center items-center py-6 px-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">{post.title}</h1>
        <div className="text-center text-gray-600 mb-4">
          <p><strong>Updated:</strong> {new Date(post.updated).toLocaleString()}</p>
          <p><strong>Last Date:</strong> {post.last_date ? new Date(post.last_date).toLocaleString() : "N/A"}</p>
          {post.region}
        </div>
        <div className="border-t-2 border-gray-200 pt-4">
          <div
            className="post-content text-base leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
