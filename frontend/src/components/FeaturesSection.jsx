import qualityFoods from "../assets/quality-foods.svg";
import originalRecipes from "../assets/original-recipes.svg";
import fastDelivery from "../assets/fast-delivery.svg";

const features = [
  {
    title: "QUALITY FOODS",
    desc: "Freshly prepared, premium-quality chicken made with carefully selected ingredients for bold, authentic flavor.",
    icon: qualityFoods,
  },
  {
    title: "ORIGINAL RECIPES",
    desc: "Inspired by New York street food, our signature recipes deliver crispy texture and unforgettable taste.",
    icon: originalRecipes,
  },
  {
    title: "FAST DELIVERY",
    desc: "Hot, fresh, and delivered fast—so you can enjoy Zakoota’s flavors anytime, anywhere.",
    icon: fastDelivery,
  },
];


export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#f4f1ea]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-14 text-center md:grid-cols-3 md:gap-10">
          {features.map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              
              {/* Icon */}
              <div className="relative mb-6 flex items-center justify-center">
                {/* Yellow circle background */}
                <div className="absolute h-16 w-16 rounded-full" />
                
                <img
                  src={item.icon}
                  alt={item.title}
                  className="relative h-[90px] w-[90px] object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-[22px] font-extrabold tracking-[0.05em] uppercase text-[#1e1e1e]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-4 max-w-[320px] text-[18px] leading-[22px] text-black/60">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
