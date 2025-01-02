import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '../../components/Editor';

const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [ptype, setPtype] = useState("");
  const [region, setRegion] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState('');
  const [lastDate, setLastDate] = useState(''); // State for last_date
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/posts/${id}`);
          const post = response.data;
          setTitle(post.title);
          setPtype(post.type);
          setRegion(post.region);
          setStatus(post.status);
          setContent(post.content);
          setLastDate(post.last_date || ''); // Set last_date if available
        } catch (error) {
          console.error("Error fetching post details:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleSavePost = () => {
    const formattedLastDate = lastDate ? new Date(lastDate).toISOString() : null;
  
    const postData = {
      title,
      type: ptype,
      region,
      status,
      content,
      last_date: formattedLastDate,
    };
  
    const request = id
      ? axios.put(`/api/posts/${id}`, postData)
      : axios.post("/api/posts", postData);
  
    request
      .then((response) => {
        console.log("Post saved successfully:", response.data);
        navigate("/admin/posts");
      })
      .catch((error) => {
        console.error("There was an error saving the post:", error);
      });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col w-3/4 bg-white -pt-6 space-y-6 mx-auto mt-3">
      <h2 className="text-2xl font-semibold text-center text-gray-800">{id ? "Edit Post" : "Create New Post"}</h2>

      <div className="flex flex-col gap-4">
        <input
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
        />
        <input
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          onChange={e => setPtype(e.target.value)}
          value={ptype}
          placeholder="Post Type"
        />
        <input
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          onChange={e => setRegion(e.target.value)}
          value={region}
          placeholder="Region"
        />
        <input
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          onChange={e => setStatus(e.target.value)}
          value={status}
          placeholder="Status"
        />
        <input
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          type="datetime-local" // Input for date and time
          onChange={e => setLastDate(e.target.value)}
          value={lastDate}
          placeholder="Last Date"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Editor setContent={setContent} content={content} />
      </div>

      <div
        onClick={handleSavePost}
        className="self-center text-lg bg-blue-600 text-white p-3 rounded-md hover:bg-blue-500 transition duration-200 cursor-pointer w-full sm:w-auto"
      >
        {id ? "Update" : "Publish"}
      </div>
    </div>
  );
};

export default PostEditor;
