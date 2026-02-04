import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Categories from "./pages/Categories.jsx";
import Items from "./pages/Items.jsx";
import Layout from "./components/Layout.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function Protected({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");
  const isLogin = location.pathname === "/login";

  const isPublic = !isAdmin && !isLogin;

  return (
    <>
      {isPublic && (
        <div className="public-site">
          <Navbar />

          <Routes>
            {/* 🌐 Public pages */}
            <Route path="/" element={<LandingPage />} />
          </Routes>

          <Footer />
        </div>
      )}

      {/* 🔐 Login */}
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* 🔒 Admin */}
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
    </>
  );
}
