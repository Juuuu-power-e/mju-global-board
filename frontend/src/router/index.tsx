import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../shared/Layout";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";
import PostCreate from "../pages/PostCreate";
import PostEdit from "../pages/PostEdit";

const AppRouter: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/new" element={<PostCreate />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<PostEdit />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default AppRouter;
