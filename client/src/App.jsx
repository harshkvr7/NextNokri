import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import AdNavbar from './admin/components/Navbar';
import Headlines from './admin/pages/Headlines';
import AdPost from './admin/pages/Post';
import AdPosts from './admin/pages/Posts';
import PostEditor from './admin/pages/Post';
import Trending from './admin/pages/Trending';
import PrivateRoute from './components/PrivateRoute'; 
import Post from './pages/Post';

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><Home /><Footer /></>,
  },
  {
    path: "/post/:id",
    element: <><Navbar /><Post /><Footer /></>,
  },
  {
    path: "/",
    element: <><Navbar /><Home /><Footer /></>,
  },
  {
    path: "/login",
    element: <><Login /></>,
  },
  {
    path: "/admin",
    element: <PrivateRoute element={<><AdNavbar /><Headlines /></>} />,
  },
  {
    path: "/admin/post",
    element: <PrivateRoute element={<><AdNavbar /><AdPost /></>} />,
  },
  {
    path: "/admin/posts",
    element: <PrivateRoute element={<><AdNavbar /><AdPosts /></>} />,
  },
  {
    path: "/admin/post/:id",
    element: <PrivateRoute element={<><AdNavbar /><PostEditor /></>} />,
  },
  {
    path: "/admin/trending",
    element: <PrivateRoute element={<><AdNavbar /><Trending /></>} />,
  },
]);

function App() {
  return (
    <div>
      <div className='w-100 flex flex-col items-center'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
