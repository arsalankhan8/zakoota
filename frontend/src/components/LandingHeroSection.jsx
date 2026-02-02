import React from 'react'
import heroBg from "../assets/Home-Hero-Bg-Img.webp";
import heroBurger from "../assets/Home-Hero-Right-Img.webp";
import burgerText from "../assets/Burger-Text.svg";
import rightArrow from "../assets/btn-arrow-right.svg"

function LandingHeroSection() {
    return (
        <section className="relative w-full overflow-hidden">
            {/* BG */}
            <div className="absolute inset-0">
                <img
                    src={heroBg}
                    alt="Hero Background"
                    className="h-full w-full object-cover object-left sm:object-center"
                />

            </div>

            {/* Content */}
            <div className="relative mx-auto max-w-7xl px-6 min-h-[850px] sm:min-h-[1200px] lg:min-h-[800px] flex items-center">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 w-full">
                    {/* LEFT */}
                    <div className="relative flex flex-col items-center">
                        <div className="relative inline-block">
                            <div className="absolute -top-24 left-[90px] w-[260px] sm:w-[320px] select-none">
                            </div>

                            <div className="relative pt-10">

                                <img
                                    src={burgerText}
                                    alt="Burger"
                                    className="absolute sm:-top-24 top-[-30px] left-[100px] w-[180px] sm:w-[320px] lg:w-[300px] xl:w-[380px]  pointer-events-none z-40"
                                />

                                {/* Text above SVG */}
                                <div className="relative z-10 text-white font-extrabold flex justify-center flex-col items-center leading-[0.9] tracking-tight">
                                    <div className="text-6xl sm:text-8xl llg:text-[95px] xl:text-[120px]">GRILLED</div>
                                    <div className="text-6xl sm:text-8xl lg:text-[95px] xl:text-[120px]">BEEF BURGER</div>
                                </div>
                            </div>

                        </div>

                        <p className="mt-6 max-w-md text-[18px] sm:text-[20px] text-center w-[70%] text-white/70">
                            Secret family recipes are the stuff of legends and Stack burger
                            blend is no exception.
                        </p>

                        <div className="mt-8">
                            <button className="inline-flex items-center justify-center rounded-md bg-[#00833e] px-6 py-3 text-[16px] font-extrabold tracking-wide text-white shadow-[0_10px_30px_-15px_rgba(16,185,129,0.9)] hover:opacity-95">
                                ORDER NOW <span className="ml-2">
                                    <img src={rightArrow} alt="" />
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="relative flex justify-center lg:justify-end">

                        {/* Burger image */}
                        <img
                            src={heroBurger}
                            alt="Burger"
                            className="w-[320px] sm:w-[420px] lg:w-[560px] drop-shadow-[0_40px_50px_rgba(0,0,0,0.65)]"
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default LandingHeroSection