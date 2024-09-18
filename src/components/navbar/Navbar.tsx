import Path from "@/types/Paths";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ZiggleLogo from "@/assets/logos/ziggle.svg?react";
import ZiggleCompactLogo from "@/assets/logos/ziggle-compact.svg?react";
import ZiggleCompactLogoDark from "@/assets/logos/ziggle-compact-dark.svg?react";
import ZiggleLogoDark from "@/assets/logos/ziggle-dark.svg?react";

const Navbar = () => {
  return (
    <header
      className={twMerge(
        "flex w-full items-center justify-between",
        "py-3 pl-2 pr-1",
        "md:px-4 md:py-2",
      )}
    >
      <div className="relative flex h-full w-full items-center justify-between">
        <Link to={Path.Home}>
          <div className="block dark:hidden">
            <ZiggleLogo className="hidden h-8 overflow-visible md:flex" />
            <ZiggleCompactLogo className="h-8 overflow-visible md:hidden" />
          </div>
          <div className="hidden dark:block">
            <ZiggleLogoDark className="hidden h-8 overflow-visible md:flex" />
            <ZiggleCompactLogoDark className="h-8 overflow-visible md:hidden" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
