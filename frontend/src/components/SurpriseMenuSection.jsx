// SurpriseMenuSection.jsx
import girlPizza from "../assets/girl-pizza.webp";

const items = [
    { name: "BIG MAC", desc: "BURGERS.", price: "$35.15" },
    { name: "CLASSIC ROAST BEEF", desc: "BURGERS,PIZZA.", price: "$9.58" },
    { name: "CLASSIC CHICKEN SANDWICH", desc: "BURGERS.", price: "$2.35" },
    { name: "PEPPERONI PIZZA", desc: "BURGERS,SALADS,SANDWICH.", price: "$12.49" },
    { name: "SONIC BLAST", desc: "BURGERS,SALADS,SANDWICH.", price: "$6.29" },
];

export default function SurpriseMenuSection() {
    return (
        <section className="w-full bg-[#f4f1ea]">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
                {/* Top heading */}
                <div className="text-center">
                    <p className="text-[16px] font-extrabold tracking-[0.1em] text-[#d6362b] uppercase">
                        Explore the new taste
                    </p>

                    <h2 className="mt-3 text-[40px] sm:text-[52px] lg:text-[64px] leading-10 font-extrabold tracking-[0.04em] text-[#1e1e1e] uppercase">
                        We love to surprise you
                    </h2>
                </div>

                {/* Content */}
                <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-start">
                    {/* Left image */}
                    <div className="w-full">
                        <div className="overflow-hidden">
                            <img
                                src={girlPizza}
                                alt="Girl eating pizza"
                                className="h-[320px] rounded-2xl w-full object-cover sm:h-[420px] lg:h-[460px]"
                            />
                        </div>
                    </div>

                    {/* Right list */}
                    <div className="w-full lg:pt-8">
                        <div className="space-y-10">
                            {items.map((it) => (
                                <div key={it.name} className="w-full">
                                    {/* Title row with dotted leader */}
                                    <div className="flex items-end gap-4">
                                        <h3 className="text-[20px] sm:text-[18px] font-extrabold tracking-[0.06em] uppercase text-[#1e1e1e] whitespace-nowrap">
                                            {it.name}
                                        </h3>

                                        <div className="flex-1 border-b border-dotted border-black/30 translate-y-[-4px]" />

                                        <span className="text-[20px] sm:text-[18px] font-extrabold text-[#d6362b] whitespace-nowrap">
                                            {it.price}
                                        </span>
                                    </div>

                                    {/* Small category line */}
                                    <p className="mt-2 text-[12px] font-semibold tracking-[0.14em] text-black/45 uppercase">
                                        {it.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
