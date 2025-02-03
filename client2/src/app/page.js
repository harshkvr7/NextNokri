import Link from "next/link";

async function fetchData() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Fallback for local dev

  try {
    const [centralJobsRes, examPostsRes, trendingPostsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/posts/?region=central&limit=10`, { next: { revalidate: 60 } }), // Limit to 10 central jobs
      fetch(`${API_BASE_URL}/api/posts/?type=exam&limit=10`, { next: { revalidate: 60 } }),    // Limit to 10 exam posts
    ]);

    if (!centralJobsRes.ok || !examPostsRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const [centralJobs, examPosts] = await Promise.all([
      centralJobsRes.json(),
      examPostsRes.json(),
    ]);

    return { centralJobs, examPosts };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { centralJobs: [], examPosts: []};
  }
}

export default async function Page() {
  const { centralJobs, examPosts, trendingPosts } = await fetchData();

  return (
    <div className="flex justify-center items-center px-4 w-full">
      <div className="flex flex-row w-full">
        <div className="w-full">
          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Central Jobs</h2>
            <ul className="space-y-3">
              {centralJobs.length > 0 ? (
                centralJobs.map((post) => (
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
                <li>No posts available</li>
              )}
            </ul>
          </div>

          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Exams</h2>
            <ul className="space-y-3">
              {examPosts.length > 0 ? (
                examPosts.map((post) => (
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
                <li>No posts available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
