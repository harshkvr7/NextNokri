import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [centralJobs, setCentralJobs] = useState([]);
  const [examPosts, setExamPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const centralJobsResponse = await axios.get("/api/posts/?region=central");
        setCentralJobs(centralJobsResponse.data);

        const trendingPostsResponse = await axios.get("/api/trending");
        setTrendingPosts(trendingPostsResponse.data);

        setLoading(false);
      } catch (err) {
        setError("Error fetching posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="flex justify-center items-start py-6 px-4 w-3/4 gap-9">
      <div className="flex flex-row space-x-8">
        {/* Main Section */}
        <div className="w-2/3 space-y-8">
          {/* Central Jobs Section */}
          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Central Jobs</h2>
            <ul className="space-y-3">
              {centralJobs.length > 0 ? (
                centralJobs.map((post) => (
                  <li key={post.id} className="border-b border-gray-200 pb-2">
                    <Link
                      to={`/post/${post.id}`}
                      className="text-blue-600 hover:underline text-lg font-medium"
                    >
                      {post.title}
                    </Link>
                    <p className="text-gray-500 text-sm">
                      Updated: {new Date(post.updated).toLocaleString()}
                    </p>
                  </li>
                ))
              ) : (
                <li>No posts available</li>
              )}
            </ul>
          </div>

          {/* Exam Section */}
          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Exams</h2>
            <ul className="space-y-3">
              {examPosts.length > 0 ? (
                examPosts.map((post) => (
                  <li key={post.id} className="border-b border-gray-200 pb-2">
                    <Link
                      to={`/post/${post.id}`}
                      className="text-blue-600 hover:underline text-lg font-medium"
                    >
                      {post.title}
                    </Link>
                    <p className="text-gray-500 text-sm">
                      Updated: {new Date(post.updated).toLocaleString()}
                    </p>
                  </li>
                ))
              ) : (
                <li>No posts available</li>
              )}
            </ul>
          </div>
        </div>

        {/* Trending Section */}
        <div className="w-1/3 bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Trending</h2>
          <ul className="space-y-3">
            {trendingPosts.length > 0 ? (
              trendingPosts.map((post) => (
                <li key={post.id} className="border-b border-gray-200 pb-2">
                  <Link
                    to={`/post/${post.id}`}
                    className="text-blue-600 hover:underline text-lg font-medium"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-500 text-sm">
                    Updated: {new Date(post.updated).toLocaleString()}
                  </p>
                </li>
              ))
            ) : (
              <li>No trending posts</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
