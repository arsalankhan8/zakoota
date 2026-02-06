import redBg from "../assets/red-save-upto-bg-img.webp";
import greenBg from "../assets/green-delivery-bg-img.webp";
import rightArrow from "../assets/btn-arrow-right.svg";

export default function MenuPromoBanner() {
    return (
        <section className="w-full bg-[#F4F1EA]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                {/* 🔴 LEFT BANNER */}
                <div className="relative w-full overflow-hidden lg:h-[560px]">
                    {/* Image: mobile auto height, desktop cover */}
                    <img
                        src={redBg}
                        alt="Super Delicious Promotion"
                        loading="lazy"
                        className="
              w-full h-auto object-cover
              lg:absolute lg:inset-0 lg:w-full lg:h-full
            "
                    />

                    {/* Text overlay: ON TOP (mobile + desktop) */}
                    <div
                        className="
              absolute inset-0 z-10
              flex items-start lg:items-center
              px-3 sm:px-8 xl:pl-20 lg:pl-10 lg:pr-10
              pt-6 sm:pt-8 lg:pt-0
              text-white
            "
                    >
                        <div className="max-w-[500px]">
                            <h2 className="text-[25px] sm:text-[36px] lg:text-[62px] font-extrabold leading-[1.05] uppercase">
                                Super <br /> Delicious
                            </h2>

                            <p className="mt-3 lg:mt-5 text-[12px] sm:text-[13px] font-semibold tracking-widest uppercase text-white/80">
                                Call us now:
                            </p>

                            <p className="mt-1 text-[18px] sm:text-[20px] lg:text-[26px] font-bold text-[#d6362b]">
                                1-800-555-333
                            </p>

                            <button
                                type="button"
                                className="
                  mt-4 lg:mt-6
                  inline-flex items-center gap-3
                  bg-white text-black
                  rounded-xl
                  px-5 sm:px-6 py-2.5 sm:py-3
                  font-bold uppercase tracking-wider
                  text-[13px] sm:text-[14px] lg:text-[16px]
                  transition
                  hover:scale-[1.04]
                  active:scale-[0.98]
                "
                            >
                                ORDER NOW
                                <img src={rightArrow} alt="" className="w-4 h-4 filter brightness-0" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 🟢 RIGHT BANNER */}
                <div className="relative w-full overflow-hidden lg:h-[560px]">
                    <img
                        src={greenBg}
                        alt="30 Minutes Delivery"
                        loading="lazy"
                        className="
              w-full h-auto object-cover
              lg:absolute lg:inset-0 lg:w-full lg:h-full
            "
                    />

                    <div
                        className="
              absolute inset-0 z-10
              flex items-start lg:items-center
              px-3 sm:px-8 xl:pl-20 lg:pl-10 lg:pr-10
              pt-6 sm:pt-8 lg:pt-0
              text-white
            "
                    >
                        <div className="max-w-[520px]">
                            <h2 className="text-[25px] sm:text-[36px] lg:text-[54px] font-extrabold leading-tight uppercase">
                                30 Minutes <br /> Delivery!
                            </h2>

                            <p className="mt-3 lg:mt-5 text-[14px] sm:text-[15px] lg:text-[18px] text-white/90 leading-relaxed sm:w-auto w-[80%]">
                                Late night meeting? Need an extra push?
                            </p>

                            <button
                                type="button"
                                className="
                  mt-4 lg:mt-6
                  inline-flex items-center gap-3
                  bg-white text-black
                  rounded-xl
                  px-5 sm:px-6 py-2.5 sm:py-3
                  font-bold uppercase tracking-wider
                  text-[13px] sm:text-[14px] lg:text-[16px]
                  transition
                  hover:scale-[1.04]
                  active:scale-[0.98]
                "
                            >
                                ORDER NOW
                                <img src={rightArrow} alt="" className="w-4 h-4 filter brightness-0" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
