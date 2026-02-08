import React from "react";
import { Home } from "lucide-react";
import { useLocation, Link } from "react-router-dom"; // import useLocation
import heroBg from "../assets/menu-page-hero-bg.webp";

export default function PageHero({ title = "PAGE", bgImage = heroBg }) {
  const location = useLocation();

  // Split path into segments, e.g. "/about/team" => ["about", "team"]
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <section className="w-full bg-[#f4f1ea] py-10">
      <div className="mx-auto max-w-[1260px] px-4">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background */}
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          {/* Content */}
          <div className="relative flex min-h-[160px] flex-col items-center justify-center text-center text-white">
            <h1 className="text-3xl sm:text-5xl">{title}</h1>

            <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
              <Home size={16} />

              {/* Dynamic Breadcrumb */}
              <Link to="/" className="hover:underline">
                Home
              </Link>
              {pathSegments.map((segment, idx) => {
                const path = "/" + pathSegments.slice(0, idx + 1).join("/");
                return (
                  <React.Fragment key={path}>
                    <span>/</span>
                    <Link to={path} className="capitalize hover:underline">
                      {segment.replace(/-/g, " ")}
                    </Link>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
