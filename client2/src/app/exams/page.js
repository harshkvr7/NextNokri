import Link from "next/link";

// Fetch exams based on type (upcoming or all exams)
async function fetchExams(status, region) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    
    const queryParams = new URLSearchParams();
    if (region) queryParams.append("region", region);
    queryParams.append("type", "exam");
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

export default async function ExamsPage({ searchParams }) {
  const { type, status, region } = await searchParams;

  const exams = await fetchExams(status, region);

  return (
    <div className="flex bg-white border border-gray-300  rounded-lg shadow-md">
      <div className="max-w-screen-xl w-max  p-6 rounded-lg space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {region ? `${region.charAt(0).toUpperCase() + region.slice(1)} Jobs` : "All Exams"}
          {type === "exam" && status === "upcoming" ? " - Upcoming Exams" : ""}
        </h1>

        {exams.length > 0 ? (
          <ul className="space-y-4">
            {exams.map((exam) => (
              <li key={exam.id} className="border-b border-gray-300 pb-4">
                <Link
                  href={`/post/${exam.id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {exam.title}
                </Link>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Date:</strong> {new Date(exam.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Updated: {new Date(exam.updated).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No exams available for this type</p>
        )}
      </div>
    </div>
  );
}
