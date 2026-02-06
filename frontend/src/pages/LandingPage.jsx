import React from "react";
import LandingHeroSection from "../components/LandingHeroSection.jsx";
import FoodCategories from "../components/FoodCategories.jsx";
import AboutFoodSection from "../components/AboutFoodSection.jsx";
import PromoBanners from "../components/PromoBanners.jsx";
import PopularDishesMarquee from "../components/PopularDishesMarquee.jsx";
import BestSellingDishesSection from "../components/BestSellingDishesSection";
import FoodPromiseSection from "../components/FoodPromiseSection.jsx";
import PromoBannersSecondSection from "../components/PromoBannersSecondSection.jsx";
function LandingPage() {
  return (
    <main className="w-full overflow-hidden">
      <LandingHeroSection />
      <FoodCategories />
      <AboutFoodSection />
      <PromoBanners />
      <PopularDishesMarquee />
      <BestSellingDishesSection />
      <FoodPromiseSection />
      <PromoBannersSecondSection />
    </main>
  );
}

export default LandingPage;
