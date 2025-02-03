import Link from "next/link";

async function fetchJobs(region, type, status) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  const queryParams = new URLSearchParams();
  if (region) queryParams.append("region", region);
  queryParams.append("type", "job");
  if (status) queryParams.append("status", status);

  try {
    const res = await fetch(`${API_BASE_URL}/api/posts?${queryParams.toString()}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export default async function JobsPage({ searchParams }) {
  const { region, type, status } = await searchParams;

  const posts = await fetchJobs(region, type, status);

  return (
    <div className="flex bg-white border border-gray-300  rounded-lg shadow-md">
      <div className="max-w-screen-xl w-max  p-6 rounded-lg space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {region ? `${region.charAt(0).toUpperCase() + region.slice(1)} Jobs` : "All Jobs"}
          {type === "job" && status === "upcoming" ? " - Upcoming Jobs" : ""}
        </h1>

        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="border-b border-gray-300 pb-4">
                <Link
                  href={`/post/${post.id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <div className="text-sm text-gray-600">
                {post.last_date && (
                      <p className="text-red-600 text-sm">
                        Last Date: {new Date(post.last_date).toLocaleDateString()}
                      </p>
                    )}
                  <p>
                    <strong>Region:</strong> {post.region}
                  </p>
                  <p className="text-gray-500 text-sm">
                      Updated: {new Date(post.updated).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs available in this region</p>
        )}
      </div>
    </div>
  );
}
