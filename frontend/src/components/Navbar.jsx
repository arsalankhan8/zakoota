import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Bike } from "lucide-react";
import logo from "../assets/site-logo.webp";

const navItem =
  "whitespace-nowrap text-[18px] max-[1380px]:text-[16px] font-extrabold tracking-wide max-[1380px]:tracking-[0.06em] uppercase transition hover:text-[#d6362b]";

const navItemActive =
  "whitespace-nowrap text-[18px] max-[1380px]:text-[16px] font-extrabold tracking-wide max-[1380px]:tracking-[0.06em] uppercase text-[#d6362b]";

const SocialIcon = ({ href = "#", label, children, className = "" }) => (
  <a
    href={href}
    aria-label={label}
    className={`inline-flex items-center justify-center transition ${className}`}
    target="_blank"
    rel="noreferrer"
  >
    {children}
  </a>
);


const FacebookIcon = () => (
  <svg
    focusable="false"
    width="9"
    height="17"
    viewBox="0 0 9 17"
    className="h-[14px] w-auto"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.486 16.2084L2.486 8.81845H0L0 5.93845L2.486 5.93845L2.486 3.81845C2.38483 2.79982 2.73793 1.78841 3.45107 1.05407C4.16421 0.319722 5.16485 -0.0628415 6.186 0.00844868C6.9284 0.00408689 7.67039 0.0441585 8.408 0.128449V2.69845L6.883 2.69845C6.4898 2.61523 6.08104 2.73438 5.79414 3.01585C5.50724 3.29732 5.3803 3.70373 5.456 4.09845L5.456 5.93845H8.308L7.936 8.81845H5.46L5.46 16.2084H2.486Z"
      fill="currentColor"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg
    focusable="false"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    className="h-[14px] w-auto"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C5.827 0 5.555.01 4.702.048 3.85.087 3.269.222 2.76.42a3.921 3.921 0 00-1.417.923c-.445.444-.719.89-.923 1.417-.198.509-.333 1.09-.372 1.942C.01 5.555 0 5.827 0 8s.01 2.445.048 3.298c.039.852.174 1.433.372 1.942.204.526.478.973.923 1.417.444.445.89.719 1.417.923.509.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.445-.01 3.298-.048c.852-.039 1.433-.174 1.942-.372a3.922 3.922 0 001.417-.923c.445-.444.719-.89.923-1.417.198-.509.333-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.298c-.039-.852-.174-1.433-.372-1.942a3.922 3.922 0 00-.923-1.417A3.921 3.921 0 0013.24.42c-.509-.198-1.09-.333-1.942-.372C10.445.01 10.173 0 8 0zm0 1.441c2.136 0 2.39.009 3.233.047.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.009 2.39-.047 3.233c-.036.78-.166 1.203-.276 1.485-.145.374-.318.64-.598.92-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.844.038-1.097.047-3.233.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.479 2.479 0 01-.92-.598 2.478 2.478 0 01-.598-.92c-.11-.282-.24-.705-.276-1.485-.038-.844-.047-1.097-.047-3.233s.009-2.39.047-3.233c.036-.78.166-1.203.276-1.485.145-.374.318-.64.598-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.844-.038 1.097-.047 3.233-.047zm0 9.226a2.667 2.667 0 110-5.334 2.667 2.667 0 010 5.334zm0-6.775a4.108 4.108 0 100 8.216 4.108 4.108 0 000-8.216zm5.23-.162a.96.96 0 11-1.92 0 .96.96 0 011.92 0z"
      fill="currentColor"
    />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    focusable="false"
    width="18"
    height="13"
    viewBox="0 0 18 13"
    className="h-[14px] w-auto"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.0325 0.369454C16.807 0.572743 17.4168 1.17173 17.6238 1.9324C18 3.31101 18 6.1875 18 6.1875C18 6.1875 18 9.06389 17.6238 10.4427C17.4168 11.2033 16.807 11.8023 16.0325 12.0056C14.6288 12.375 9 12.375 9 12.375C9 12.375 3.37122 12.375 1.96752 12.0056C1.19311 11.8023 0.583159 11.2033 0.376159 10.4427C0 9.06389 0 6.1875 0 6.1875C0 6.1875 0 3.31101 0.376159 1.9324C0.583159 1.17173 1.19311 0.572743 1.96752 0.369454C3.37122 0 9 0 9 0C9 0 14.6288 0 16.0325 0.369454ZM11.8636 6.1876L7.1591 8.79913V3.57588L11.8636 6.1876Z"
      fill="currentColor"
    />
  </svg>
);

const PhoneIcon = ({ className = "", size = 25, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M13.6719 0.125C15.7878 0.157552 17.6921 0.678385 19.3848 1.6875C21.0775 2.69661 22.4284 4.04753 23.4375 5.74023C24.4466 7.43294 24.9674 9.33724 25 11.4531C24.9349 12.1693 24.5443 12.5599 23.8281 12.625C23.112 12.5599 22.7214 12.1693 22.6562 11.4531C22.5911 8.91406 21.7122 6.79818 20.0195 5.10547C18.3268 3.41276 16.2109 2.53385 13.6719 2.46875C12.9557 2.40365 12.5651 2.01302 12.5 1.29688C12.5651 0.580729 12.9557 0.190104 13.6719 0.125ZM14.0625 9.5C14.5182 9.5 14.8926 9.64648 15.1855 9.93945C15.4785 10.2324 15.625 10.6068 15.625 11.0625C15.625 11.5182 15.4785 11.8926 15.1855 12.1855C14.8926 12.4785 14.5182 12.625 14.0625 12.625C13.6068 12.625 13.2324 12.4785 12.9395 12.1855C12.6465 11.8926 12.5 11.5182 12.5 11.0625C12.5 10.6068 12.6465 10.2324 12.9395 9.93945C13.2324 9.64648 13.6068 9.5 14.0625 9.5ZM12.5 5.98438C12.5651 5.26823 12.9557 4.8776 13.6719 4.8125C15.5599 4.84505 17.1224 5.49609 18.3594 6.76562C19.6289 8.0026 20.2799 9.5651 20.3125 11.4531C20.2474 12.1693 19.8568 12.5599 19.1406 12.625C18.4245 12.5599 18.0339 12.1693 17.9688 11.4531C17.9362 10.2487 17.513 9.23958 16.6992 8.42578C15.8854 7.61198 14.8763 7.1888 13.6719 7.15625C12.9557 7.09115 12.5651 6.70052 12.5 5.98438ZM16.0645 14.1387C16.7155 13.4225 17.4805 13.2272 18.3594 13.5527L23.8281 15.8965C24.2513 16.0918 24.5768 16.401 24.8047 16.8242C25 17.2148 25.0488 17.638 24.9512 18.0938L23.7793 23.5625C23.5189 24.5391 22.8841 25.0599 21.875 25.125C21.582 25.125 21.2891 25.125 20.9961 25.125C20.5078 25.0924 20.0195 25.0436 19.5312 24.9785C15.8203 24.5553 12.5 23.3509 9.57031 21.3652C6.64062 19.347 4.32943 16.7754 2.63672 13.6504C0.911458 10.5254 0.0325521 7.05859 0 3.25C0.0651042 2.24089 0.585938 1.60612 1.5625 1.3457L7.03125 0.173828C7.48698 0.0761719 7.91016 0.125 8.30078 0.320312C8.72396 0.548177 9.0332 0.873698 9.22852 1.29688L11.5723 6.76562C11.8978 7.64453 11.7025 8.40951 10.9863 9.06055L9.0332 10.6719C10.3678 12.9505 12.1745 14.7572 14.4531 16.0918L16.0645 14.1387ZM22.6074 17.9473L17.6758 15.8477L16.2598 17.6055C15.8691 18.0286 15.3971 18.2891 14.8438 18.3867C14.3229 18.4844 13.8021 18.403 13.2812 18.1426C10.6445 16.5801 8.54492 14.4805 6.98242 11.8438C6.68945 11.3229 6.5918 10.7858 6.68945 10.2324C6.81966 9.71159 7.09635 9.25586 7.51953 8.86523L9.27734 7.44922L7.17773 2.51758L2.34375 3.5918C2.44141 7.13997 3.35286 10.3464 5.07812 13.2109C6.77083 16.0755 9.04948 18.3542 11.9141 20.0469C14.7786 21.7721 18.0013 22.6836 21.582 22.7812L22.6074 17.9473Z"
      fill="currentColor"
    />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="w-full font-[Barlow_Condensed]">
      {/* ─────────────── Top Utility Bar ─────────────── */}
      <div className="hidden md:block w-full bg-[#1f1f1f] text-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          {/* Use grid so center text stays perfectly centered (aligned with logo below) */}
          <div className="py-2 sm:py-0 sm:h-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-[16px] sm:text-[18px]">
            {/* Left */}
            <div className="justify-self-start lg:w-[320px] max-[1380px]:lg:w-[260px]">
              <button className="flex items-center gap-2 opacity-90 hover:opacity-100">
                <MapPin size={18} />
                Find a store
              </button>
            </div>

            {/* Center */}
            <div className="justify-self-center opacity-90 text-center">
              100% Secure delivery without contacting the courier
            </div>

            {/* Right */}
            <div className="justify-self-end lg:w-[320px] max-[1380px]:lg:w-[260px]">
              <div className="flex items-center justify-end gap-4">
                <SocialIcon label="Facebook" href="#">
                  <FacebookIcon />
                </SocialIcon>
                <SocialIcon label="Instagram" href="#">
                  <InstagramIcon />
                </SocialIcon>
                <SocialIcon label="YouTube" href="#">
                  <YoutubeIcon />
                </SocialIcon>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────── Main Navbar ─────────────── */}
      <div className="w-full bg-[#f7f2e9] border-b border-black/10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="h-[76px] sm:h-[86px] lg:h-[96px] flex items-center justify-between gap-3">
            {/* Left: Mobile Menu + Desktop Support */}
            <div className="flex items-center gap-3 lg:gap-4 lg:min-w-[320px] max-[1380px]:lg:min-w-[260px]">


              {/* ✅ Desktop support visible at lg+ */}
              <div className="hidden lg:flex items-center">
                <div className="w-12 h-12 flex items-center">
                  <PhoneIcon size={25} className="text-green-600" />
                </div>

                <div className="leading-tight">
                  <div className="text-[14px] font-extrabold uppercase tracking-wide">
                    24/7 Support Center
                  </div>
                  <div className="text-[24px] font-extrabold text-[#d6362b]">
                    +1 718-904-4450
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Desktop Nav / Mobile Logo */}
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-8 max-[1380px]:gap-6 2xl:gap-14">
              <NavLink
                to="/menu"
                className={({ isActive }) => (isActive ? navItemActive : navItem)}
              >
                MENU
              </NavLink>

              <NavLink
                to="/shop"
                className={({ isActive }) => (isActive ? navItemActive : navItem)}
              >
                SHOP
              </NavLink>

              <img src={logo} alt="Fazfood" className="h-[44px] object-contain" />

              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? navItemActive : navItem)}
              >
                ABOUT US
              </NavLink>

              <NavLink
                to="/contacts"
                className={({ isActive }) => (isActive ? navItemActive : navItem)}
              >
                CONTACTS
              </NavLink>
            </nav>

            {/* ✅ Mobile logo visible up to 1024px */}
            <div className="lg:hidden flex-1 flex justify-start">
              <img
                src={logo}
                alt="Fazfood"
                className="h-[44px] max-[1380px]:h-[40px] object-contain flex-shrink-0"
              />
            </div>


            {/* Right:  + Order */}
            {/* Right:  + Order */}
            <div className="flex items-center justify-end min-w-0 gap-2 sm:gap-3 lg:gap-6 max-[1180px]:lg:gap-3 lg:min-w-[320px] max-[1380px]:lg:min-w-[260px]">

              {/* ✅ Hamburger icon on right (mobile/tablet only) */}


              <button className="bg-[#d6362b] text-white h-[42px] sm:h-[44px] px-4 sm:px-7 rounded-xl flex items-center gap-2 sm:gap-3 text-[14px] sm:text-[16px] font-extrabold uppercase shadow-[0_10px_24px_-14px_rgba(214,54,43,0.7)] hover:bg-[#bf2f26] transition tracking-[1px] whitespace-nowrap">
                <Bike size={18} />
                <span className="hidden min-[380px]:inline">ORDER NOW</span>
                <span className="min-[380px]:hidden">ORDER</span>
              </button>
              <button
                className="lg:hidden inline-flex h-[42px] sm:h-[44px] w-[42px] sm:w-[44px] items-center justify-center rounded-xl border border-black/10 bg-white/50 hover:bg-white transition"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ─────────────── Mobile Drawer ─────────────── */}
      {/* ✅ Drawer active up to 1024px (lg breakpoint) */}
      <div className={`lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity ${open ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setOpen(false)}
        />

        {/* panel */}
        <div
          className={`fixed z-50 top-0 left-0 h-full w-[86%] max-w-[360px] bg-[#f7f2e9] border-r border-black/10 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
            }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="p-4">
            {/* header */}
            <div className="flex items-center justify-between">
              <img src={logo} alt="Fazfood" className="h-[38px] object-contain" />
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/50 hover:bg-white transition"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* support */}
            <div className="mt-4 rounded-2xl border border-black/10 bg-white/60 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white grid place-items-center border border-black/10">
                  <PhoneIcon size={20} className="text-green-600" />
                </div>
                <div className="leading-tight">
                  <div className="text-[12px] font-extrabold uppercase tracking-wide text-black/70">
                    24/7 Support Center
                  </div>
                  <div className="text-[18px] font-extrabold text-[#d6362b]">
                    +1 718-904-4450
                  </div>
                </div>
              </div>
            </div>

            {/* links */}
            <div className="mt-5 flex flex-col gap-2">
              {[
                { to: "/menu", label: "MENU" },
                { to: "/shop", label: "SHOP" },
                { to: "/about", label: "ABOUT US" },
                { to: "/contacts", label: "CONTACTS" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 border border-black/10 bg-white/40 hover:bg-white/70 transition ${isActive ? "text-[#d6362b]" : "text-black/80"
                    } text-[16px] font-extrabold tracking-wide uppercase`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* actions */}
            <div className="mt-5 grid grid-cols-1 gap-3">
              <button className="bg-[#d6362b] text-white h-12 rounded-2xl flex items-center justify-center gap-2 font-extrabold uppercase tracking-[1px] shadow-[0_10px_24px_-14px_rgba(214,54,43,0.7)] hover:bg-[#bf2f26] transition">
                <Bike size={18} />
                ORDER NOW
              </button>
            </div>

            {/* socials */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-black/50">
                FOLLOW
              </span>
              <div className="flex items-center gap-4 text-black/70">
                <SocialIcon label="Facebook" href="#">
                  <FacebookIcon />
                </SocialIcon>
                <SocialIcon label="Instagram" href="#">
                  <InstagramIcon />
                </SocialIcon>
                <SocialIcon label="YouTube" href="#">
                  <YoutubeIcon />
                </SocialIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}