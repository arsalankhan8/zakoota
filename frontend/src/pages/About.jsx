// About.jsx
import React from "react";
import PageHero from "../components/PageHero";
import aboutBg from "../assets/about-page-hero-bg.jpg";
import AboutPageFoodSection from "../components/AboutPageFoodSection";
import TimelineSection from "../components/TimelineSection";
export default function About() {
  return (
    <>
      <PageHero title="About Us" bgImage={aboutBg} />
      <AboutPageFoodSection />
      <TimelineSection />
    </>
  );
}
