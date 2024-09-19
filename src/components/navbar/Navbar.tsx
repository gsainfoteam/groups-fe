import Path from "@/types/Paths";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ZiggleLogo from "@/assets/logos/ziggle.svg?react";
import ZiggleCompactLogo from "@/assets/logos/ziggle-compact.svg?react";
import ZiggleCompactLogoDark from "@/assets/logos/ziggle-compact-dark.svg?react";
import ZiggleLogoDark from "@/assets/logos/ziggle-dark.svg?react";
import Button from "../button/Button";
import AccountIcon from "@/assets/icons/account.svg?react";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  to: string;
}

const Navbar = ({ to }: NavbarProps) => {
  const user = null;
  const { t } = useTranslation();

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

        <div
          className={
            "mr-[10px] flex h-full flex-row-reverse items-center md:mr-[20px] md:w-full"
          }
        >
          <Link to={to}>
            <Button variant="outlined">돌아가기</Button>
          </Link>
        </div>

        <Link
          to={user ? `/mypage` : `/login`}
          className="hidden items-center justify-center gap-2 md:flex"
        >
          <AccountIcon className="flex h-6" />
          <div className="whitespace-nowrap align-middle font-medium text-primary">
            {user ?? t("navbar.login")}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
