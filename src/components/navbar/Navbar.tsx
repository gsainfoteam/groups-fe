import { generateOAuthLoginURL } from "@/apis/auth";
import AccountIcon from "@/assets/icons/account.svg?react";
import GroupsCompactLogoDark from "@/assets/logos/groups-compact-dark.svg?react";
import GroupsCompactLogo from "@/assets/logos/groups-compact.svg?react";
import GroupsLogoDark from "@/assets/logos/groups-dark.svg?react";
import GroupsLogo from "@/assets/logos/groups.svg?react";
import useAuth from "@/hooks/useAuth";
import LocalStorageKeys from "@/types/localstorage";
import Path from "@/types/paths";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Button from "../button/Button";

const Navbar = () => {
  const { userInfo } = useAuth();

  const { t } = useTranslation();

  const location = useLocation();

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
          className={twMerge([
            "flex h-full flex-row-reverse items-center",
            "mr-2.5",
            "md:mr-5 md:w-full",
          ])}
        >
          <Link to={import.meta.env.VITE_ZIGGLE_URL}>
            <Button
              variant="outlined"
              size="big"
              className={"rounded-[10px] py-[7px]"}
            >
              {t("navbar.button.goBackToZiggle")}
            </Button>
          </Link>
        </div>

        <Button
          onClick={async () => {
            localStorage.setItem(
              LocalStorageKeys.ReturnTo,
              location.state?.returnTo ?? "",
            );

            window.location.href = await generateOAuthLoginURL();
          }}
          className="hidden items-center justify-center gap-2 md:flex"
        >
          <AccountIcon className="flex h-6" />
          <div className="whitespace-nowrap align-middle font-medium text-primary">
            {userInfo?.name ?? t("navbar.login")}
          </div>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
