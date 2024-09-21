import AccountIcon from "@/assets/icons/account.svg?react";
import GroupsCompactLogoDark from "@/assets/logos/groups-compact-dark.svg?react";
import GroupsCompactLogo from "@/assets/logos/groups-compact.svg?react";
import GroupsLogoDark from "@/assets/logos/groups-dark.svg?react";
import GroupsLogo from "@/assets/logos/groups.svg?react";
import Path from "@/types/paths";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Button from "../button/Button";

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
            <GroupsLogo className="hidden h-8 overflow-visible md:flex" />
            <GroupsCompactLogo className="h-8 overflow-visible md:hidden" />
          </div>
          <div className="hidden dark:block">
            <GroupsLogoDark className="hidden h-8 overflow-visible md:flex" />
            <GroupsCompactLogoDark className="h-8 overflow-visible md:hidden" />
          </div>
        </Link>

        <div
          className={
            "mr-[10px] flex h-full flex-row-reverse items-center md:mr-[20px] md:w-full"
          }
        >
          <Link to={to}>
            <Button variant="outlined">
              {t("navbar.button.goBackToZiggle")}
            </Button>
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
