import React from "react";

// ✅ Left image
import aboutFood from "../assets/about-food-img.webp";

// ✅ Icons (place these in your assets folder)
import burgerIcon from "../assets/burger.svg";
import houseIcon from "../assets/house.svg";
import bikeIcon from "../assets/bike.svg";
import bgFood from "../assets/four-food-white-bg-img.webp";

export default function AboutFoodSection() {
    const features = [
        {
            icon: burgerIcon,
            title: "A NEW LOOK ON\nTHE RIGHT FOOD!",
        },
        {
            icon: houseIcon,
            title: "THE USE OF NATURAL\nBEST QUALITY PRODUCTS",
        },
        {
            icon: bikeIcon,
            title: "FASTEST ON YOUR\nDOOR STEP",
        },
    ];

    return (
        <section className="relative w-full bg-[#F4F1EA] overflow-hidden">
            <div className="pointer-events-none absolute inset-0 hidden xl:flex justify-center">
                <img
                    src={bgFood}
                    alt=""
                    className="h-full w-full max-w-8xl object-cover"
                />
            </div>


            <div className="mx-auto max-w-7xl px-6 py-8 sm:py-10 lg:py-16">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    {/* LEFT */}
                    <div className="relative">
                        <div className="relative lg:mx-auto w-full max-w-[560px] lg:max-w-none">
                            <img
                                src={aboutFood}
                                alt="About Food"
                                className="w-full h-auto object-contain"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="w-full">
                        <p className="text-[16px] sm:text-[18px] font-extrabold  text-[#c33130]">
                            ABOUT OUR FOOD
                        </p>

                        <h2 className="mt-4 text-[34px] leading-[1.05]  sm:text-[55px] lg:text-[65px] font-black tracking-[1px] text-[#1f1f1f]">
                            WE MAKE THE BEST
                            <br className="hidden sm:block" />
                            BURGER IN YOUR TOWN
                        </h2>

                        <p className="mt-5 sm:max-w-[90%] text-[18px] leading-[1.3em] sm:text-[18px] text-[#464646]">
                            The mouth-watering aroma of sizzling burgers now fills the streets
                            of Birmingham thanks to the passionate pursuit of three brothers,
                            the British founders of Fazfood. After over 50 years of experience
                            in the culinary industry between them, they set out on a journey to
                            discover the ultimate burger.
                        </p>

                        {/* FEATURES */}
                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5">
                            {features.map((f, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3"
                                >
                                    <img
                                        src={f.icon}
                                        alt=""
                                        className="h-16 max-w-16 object-contain"
                                        loading="lazy"
                                    />

                                    <p className="whitespace-pre-line text-[18px] font-extrabold tracking-[.3px] leading-[1.35] text-[#212121]">
                                        {f.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* /RIGHT */}
                </div>
            </div>
        </section>
    );
}
