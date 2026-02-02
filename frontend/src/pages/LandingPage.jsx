import React from "react";
import LandingHeroSection from "../components/LandingHeroSection.jsx";
import FoodCategories from "../components/FoodCategories.jsx";
function LandingPage() {
  return (
    <main className="w-full overflow-hidden">
      <LandingHeroSection />
      <FoodCategories />
    </main>
  );
}

export default LandingPage;
