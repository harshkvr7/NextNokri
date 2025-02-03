import Link from "next/link";

async function fetchTrendingPosts() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${API_BASE_URL}/api/trending`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch trending posts");

    return await res.json();
  } catch (error) {
    console.error("Error fetching trending posts:", error);
    return [];
  }
}

export default async function Sidebar() {
  const trendingPosts = await fetchTrendingPosts();

  return (
    <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Trending Posts</h2>
      <ul className="space-y-3">
        {trendingPosts.length > 0 ? (
          trendingPosts.map((post) => (
            <li key={post.id} className="border-b border-gray-200 pb-2">
              <Link
                href={`/post/${post.id}`}
                className="text-blue-600 hover:underline text-lg font-medium"
              >
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
          <li>No trending posts available</li>
        )}
      </ul>
    </div>
  );
}
