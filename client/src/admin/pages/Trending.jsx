import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Trending = () => {
  const [posts, setPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await axios.get('/api/trending');
        setTrendingPosts(response.data);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      }
    };

    const fetchAllPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchTrendingPosts();
    fetchAllPosts();

    setIsLoading(false);
  }, []);

  const addTrending = async () => {
    if (!selectedPostId) return;

    try {
      await axios.post('/api/trending', { pid: selectedPostId });
      setSelectedPostId(''); 

      const response = await axios.get('/api/trending');
      setTrendingPosts(response.data); 
    } catch (error) {
      console.error('Error adding trending post:', error);
    }
  };

  const deleteTrending = async (id) => {
    try {
      await axios.delete(`/api/trending/${id}`);
      setTrendingPosts(trendingPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting trending post:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-3/4 p-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-gray-800">Manage Trending Posts</h2>

        <div className="flex gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-300">
          <select
            value={selectedPostId}
            onChange={(e) => setSelectedPostId(e.target.value)}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-all ease-in-out w-full md:w-1/3"
          >
            <option value="">Select Post</option>
            {posts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>

          <button
            onClick={addTrending}
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
          >
            Add to Trending
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-medium text-gray-800">Current Trending Posts</h3>
          <ul className="list-none mt-4 space-y-4">
            {trendingPosts.length > 0 ? (
              trendingPosts.map((post) => (
                <li
                  key={post.id}
                  className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all ease-in-out"
                >
                  <div className="text-lg text-gray-700">{post.title}</div>
                  <span className="text-sm text-gray-500">
                    Updated: {new Date(post.updated).toLocaleString()}
                  </span>
                  <button
                    onClick={() => deleteTrending(post.id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <div className="text-gray-500">No trending posts available</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Trending;
