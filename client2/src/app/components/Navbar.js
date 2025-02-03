import Link from "next/link";
import Image from "next/image";

async function fetchHeadlines() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${API_BASE_URL}/api/headlines`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch headlines");

    return await res.json();
  } catch (error) {
    console.error("Error fetching headlines:", error);
    return [];
  }
}

export default async function Navbar() {
  const headlines = await fetchHeadlines();

  const states = [
    "haryana",
    "uttar Pradesh",
    "delhi",
    "punjab",
    "rajisthan",
  ]; 

  return (
    <div className="w-3/4 justify-self-center">
      <div className="flex px-16 flex-row justify-between border-b pb-2 gap-9 pt-1 items-center border-b-slate-300">
        <div className="flex flex-row gap-10 items-center">
          <Link href="/" className="text-3xl font-semibold mr-10">
            NextNokri
          </Link>

          <div className="relative group">
            <Link
              href="/jobs"
              className="hover:underline transition-all text-lg group-hover:underline"
            >
              Jobs
            </Link>
            <div className="absolute hidden group-hover:block left-0 w-56 bg-white border border-gray-300 shadow-lg rounded-md p-2 z-50">
              <div className="border-b pb-2 mb-2">
                <Link href="/jobs?region=central&type=job" className="block px-4 py-2 hover:bg-gray-200">
                  Central 
                </Link>
                <Link
                  href="/jobs?type=job&status=upcoming"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Upcoming 
                </Link>
                <Link
                  href="/jobs"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  All Jobs
                </Link>
              </div>
              <div>
                {states.map((state) => (
                  <Link
                    key={state}
                    href={`/jobs?region=${state}&type=job`}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    {state.charAt(0).toUpperCase() + state.slice(1)} 
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link
              href="/exams"
              className="hover:underline transition-all text-lg group-hover:underline"
            >
              Exams
            </Link>
            <div className="absolute hidden group-hover:block left-0 w-56 bg-white border border-gray-300 shadow-lg rounded-md p-2 z-50">
              <div className="border-b pb-2 mb-2">
              <Link href="/exams?region=central&type=job" className="block px-4 py-2 hover:bg-gray-200">
                  Central 
                </Link>
                <Link href="/exams?type=exam&status=upcoming" className="block px-4 py-2 hover:bg-gray-200">
                  Upcoming Exams
                </Link>
                <Link
                  href="/exams"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  All Exams
                </Link>
              </div>
              <div>
                
                {states.map((state) => (
                  <Link
                    key={state}
                    href={`/exams?region=${state}&type=job`}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border border-slate-300 p-1 rounded-md">
          <Image src="/search.png" width={20} height={20} alt="search-icon" />
          <form method="GET" action="/search" className="flex w-full">
            <input
              type="text"
              name="tag"
              placeholder="search"
              className="border-none outline-none p-1 text-sm h-100 focus:border-none rounded-md w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded-md ml-2"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="flex w-full justify-center gap-10 border-b-slate-700 border-b py-2">
        {headlines.length > 0 ? (
          headlines.map((headline) => (
            <Link
              key={headline.id}
              href={`/post/${headline.pid}`}
              className="font-medium text-gray-700 hover:text-blue-600 hover:underline transition-all"
            >
              {headline.headline_text}
            </Link>
          ))
        ) : (
          <div className="text-gray-500">No headlines available</div>
        )}
      </div>
    </div>
  );
}
