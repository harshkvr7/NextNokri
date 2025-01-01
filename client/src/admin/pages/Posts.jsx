import React, { useEffect, useState } from 'react';
import axios from 'axios';
import deleteIcon from '../../assets/delete.png';
import editIcon from '../../assets/edit.png';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-600">{error}</div>;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      setError('Error deleting post');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/post/${id}`);
  };

  return (
    <div className="w-3/4 pl-8 pt-6">
      <h2 className="text-3xl font-semibold text-gray-800">Manage Posts</h2>
      <div className="flex flex-col gap-6 pt-6 self-start justify-start">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center gap-6 p-5 bg-white border rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out"
          >
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
              <p className="text-sm text-gray-500">Updated: {new Date(post.updated).toLocaleString()}</p>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <img
                src={deleteIcon}
                className="w-6 h-6 hover:cursor-pointer transition-transform transform hover:scale-110"
                alt="delete"
                onClick={() => handleDelete(post.id)}
              />
              <img
                src={editIcon}
                className="w-6 h-6 hover:cursor-pointer transition-transform transform hover:scale-110"
                alt="edit"
                onClick={() => handleUpdate(post.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
