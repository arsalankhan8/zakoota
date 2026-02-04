import React from "react";
import { Home } from "lucide-react";
import heroBg from "../assets/menu-page-hero-bg.webp";

export default function PageHero({
    title = "PAGE",
    crumb = "Home",
    bgImage = heroBg,
}) {
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
                        <h1 className="text-3xl  sm:text-5xl">
                            {title}
                        </h1>

                        <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
                            <Home size={16} />
                            <span className="text-[16px]">{crumb}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
