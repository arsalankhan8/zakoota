import { NavLink } from "react-router-dom";
import logo from "../assets/site-logo.webp";
import FbIcon from "../assets/facebook-icon.svg?react";
import IgIcon from "../assets/instagram-icon.svg?react";
import YtIcon from "../assets/youtube-icon.svg?react";

const SocialIcon = ({ href = "#", label, children, className = "" }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noreferrer"
    className={`inline-flex items-center justify-center transition ${className}`}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="w-full bg-[#f7f2e9] font-[Barlow_Condensed] text-black">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="py-14">
 <div className="grid gap-10 md:gap-12 lg:gap-16
                grid-cols-2 sm:grid-cols-2 md:grid-cols-2
                lg:grid-cols-[1.1fr_1.2fr_0.9fr_0.9fr]
                items-start">
            {/* Left */}
            <div>
              <img src={logo} alt="Fazfood" className="h-[44px] object-contain" />

              <div className="mt-8 space-y-3 text-[16px] sm:text-[17px] text-black/70">
                <p>2972 Westheimer Rd. Santa Ana,</p>
                <p>Illinois 85486</p>
                <p>support@example.com</p>
                <p className="font-extrabold text-[#d6362b]">+(084) 456-0789</p>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-[18px] font-extrabold tracking-[0.12em] uppercase">
                PRODUCTS
              </h3>

              <ul className="mt-8 space-y-3">
                {["BURGERS", "KING DELIGHT PRODUCTS", "CRISPY FLAVORS", "BREAKFAST PRODUCTS"].map(
                  (t) => (
                    <li
                      key={t}
                      className="text-[16px] sm:text-[17px] font-extrabold uppercase tracking-wide text-black/70"
                    >
                      {t}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-[18px] font-extrabold tracking-[0.12em] uppercase">
                QUICK LINKS
              </h3>

              <ul className="mt-8 space-y-3">
                {[
                  { to: "/", label: "HOME" },
                  { to: "/menu", label: "MENU" },
                  { to: "/about", label: "ABOUT US" },
                  { to: "/contacts", label: "CONTACTS" },
                ].map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      className="text-[16px] sm:text-[17px] font-extrabold uppercase tracking-wide text-black/70 hover:text-[#d6362b] transition"
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opening Hours */}
       <div className="lg:border-l lg:border-black/20 lg:pl-12
                sm:col-span-2 md:col-span-1 lg:col-span-1">

              <h3 className="text-[18px] font-extrabold tracking-[0.12em] uppercase">
                OPENING HOURS
              </h3>

              <div className="mt-8 space-y-3 text-[16px] sm:text-[17px] text-black/70">
                <p>
                  Monday – Friday:{" "}
                  <span className="text-[#d6362b] font-extrabold">8am – 4pm</span>
                </p>
                <p>
                  Saturday:{" "}
                  <span className="text-[#d6362b] font-extrabold">08:00 - 12:00 Uhr</span>
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <SocialIcon
                  label="Facebook"
                  href="#"
                  className="h-10 w-10 rounded-full border border-black/30 grid place-items-center text-black/70 hover:bg-white/60 hover:text-black transition"
                >
                  <FbIcon className="h-[14px] w-auto" />
                </SocialIcon>

                <SocialIcon
                  label="Instagram"
                  href="#"
                  className="h-10 w-10 rounded-full border border-black/30 grid place-items-center text-black/70 hover:bg-white/60 hover:text-black transition"
                >
                  <IgIcon className="h-[14px] w-auto" />
                </SocialIcon>

                <SocialIcon
                  label="YouTube"
                  href="#"
                  className="h-10 w-10 rounded-full border border-black/30 grid place-items-center text-black/70 hover:bg-white/60 hover:text-black transition"
                >
                  <YtIcon className="h-[14px] w-auto" />
                </SocialIcon>
              </div>
            </div>
          </div>

          <div className="mt-12 h-px w-full bg-black/10" />

          <div className="py-10 text-center text-[15px] sm:text-[16px] text-black/70">
            Copyright © 2023{" "}
            <span className="text-[#d6362b] font-extrabold">Fazfood</span>. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
