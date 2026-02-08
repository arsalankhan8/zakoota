import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import MenuPage from "./pages/Menu.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Categories from "./pages/Categories.jsx";
import Items from "./pages/Items.jsx";
import Layout from "./components/Layout.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
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

          {/* ✅ Add all public routes here */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<About />} />
          </Routes>

          <Footer />
        </div>
      )}

      {/* ✅ Login + Admin */}
      <Routes>
        <Route path="/login" element={<Login />} />

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
      </Routes>
    </>
  );
}
