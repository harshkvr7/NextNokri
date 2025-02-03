import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Post from './pages/Post';

const AdNavbar = lazy(() => import('./admin/components/Navbar'));
const Headlines = lazy(() => import('./admin/pages/Headlines'));
const AdPost = lazy(() => import('./admin/pages/Post'));
const AdPosts = lazy(() => import('./admin/pages/Posts'));
const PostEditor = lazy(() => import('./admin/pages/Post'));
const Trending = lazy(() => import('./admin/pages/Trending'));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/post/:id",
    element: (
      <>
        <Navbar />
        <Post />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AdNavbar />
            <Headlines />
          </Suspense>
        }
      />
    ),
  },
  {
    path: "/admin/post",
    element: (
      <PrivateRoute
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AdNavbar />
            <AdPost />
          </Suspense>
        }
      />
    ),
  },
  {
    path: "/admin/posts",
    element: (
      <PrivateRoute
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AdNavbar />
            <AdPosts />
          </Suspense>
        }
      />
    ),
  },
  {
    path: "/admin/post/:id",
    element: (
      <PrivateRoute
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AdNavbar />
            <PostEditor />
          </Suspense>
        }
      />
    ),
  },
  {
    path: "/admin/trending",
    element: (
      <PrivateRoute
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AdNavbar />
            <Trending />
          </Suspense>
        }
      />
    ),
  },
]);

function App() {
  return (
    <div className="w-100 flex flex-col items-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
