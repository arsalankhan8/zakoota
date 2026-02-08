// Menu.jsx
import React from "react";
import PageHero from "../components/PageHero";
import menuBg from "../assets/menu-page-hero-bg.webp";
import SurpriseMenuSection from "../components/SurpriseMenuSection";
import FeaturesSection from "../components/FeaturesSection";
import MenuPromoBanner from "../components/MenuPromoBanner";
import MenuByCategorySection from "../components/MenuByCategorySection";

export default function Menu() {
  return (
    <>
      <PageHero title="Our Menu" bgImage={menuBg} />
      <SurpriseMenuSection />
      <MenuByCategorySection />
      <FeaturesSection />
      <MenuPromoBanner />
    </>
  );
}
