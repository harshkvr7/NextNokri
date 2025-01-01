import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Headlines = () => {
  const [posts, setPosts] = useState([]);
  const [headlines, setHeadlines] = useState([]);
  const [newHeadline, setNewHeadline] = useState('');
  const [selectedPostId, setSelectedPostId] = useState('');

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Fetch headlines from the backend
  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get('/api/headlines');
        setHeadlines(response.data);
      } catch (error) {
        console.error('Error fetching headlines:', error);
      }
    };

    fetchHeadlines();
  }, []);

  // Add a new headline
  const addHeadline = async () => {
    if (!newHeadline || !selectedPostId) return;

    try {
      const response = await axios.post('/api/headlines', {
        pid: selectedPostId,
        headline_text: newHeadline
      });

      setHeadlines([...headlines, { id: response.data.id, pid: selectedPostId, headline_text: newHeadline }]);
      setNewHeadline('');
      setSelectedPostId('');
    } catch (error) {
      console.error('Error adding headline:', error);
    }
  };

  // Delete a headline
  const deleteHeadline = async (headlineId) => {
    try {
      await axios.delete(`/api/headlines/${headlineId}`);
      setHeadlines(headlines.filter((headline) => headline.id !== headlineId));
    } catch (error) {
      console.error('Error deleting headline:', error);
    }
  };

  return (
    <div className="w-3/4 p-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-gray-800">Manage Headlines</h2>

        <div className="flex gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-300">
          <select
            value={selectedPostId}
            onChange={(e) => setSelectedPostId(e.target.value)}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
          >
            <option value="">Select Post</option>
            {posts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newHeadline}
            onChange={(e) => setNewHeadline(e.target.value)}
            placeholder="Enter headline"
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
          />

          <button
            onClick={addHeadline}
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
          >
            Add Headline
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-medium text-gray-800">Current Headlines</h3>
          <ul className="list-none mt-4 space-y-4">
            {headlines.length > 0 ? (
              headlines.map((headline) => (
                <li
                  key={headline.id}
                  className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all ease-in-out"
                >
                  <div className="text-lg text-gray-700">{headline.headline_text}</div>
                  <button
                    onClick={() => deleteHeadline(headline.id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <div className="text-gray-500">No headlines available</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Headlines;
