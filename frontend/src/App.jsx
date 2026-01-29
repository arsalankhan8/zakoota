import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Categories from "./pages/Categories.jsx";
import Items from "./pages/Items.jsx";
import Layout from "./components/Layout.jsx";

function Protected({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* 🌐 Public website */}
      <Route path="/" element={<LandingPage />} />

      {/* 🔐 Login */}
      <Route path="/login" element={<Login />} />

      {/* 🔒 Admin area */}
      <Route
        path="/admin"
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="items" element={<Items />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
