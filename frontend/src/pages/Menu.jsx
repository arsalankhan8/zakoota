import React from "react";
import PageHero from "../components/PageHero";
import SurpriseMenuSection from "../components/SurpriseMenuSection";
import FeaturesSection from "../components/FeaturesSection";
import MenuPromoBanner from "../components/MenuPromoBanner";

export default function Menu() {
  return (
    <>
      <PageHero title="MENU" crumb="Home" />
      <SurpriseMenuSection />
      <FeaturesSection />
      <MenuPromoBanner />
    </>
  );
}
