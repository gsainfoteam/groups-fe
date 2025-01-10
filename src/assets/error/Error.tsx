import { PropsWithChildren } from "react";
import WarningSign from "@/assets/illustrations/warning-sign.svg?react";
import Button from "@/components/button/Button";
import { useNavigate } from "react-router-dom";
import Path from "@/types/paths";
import { useTranslation } from "react-i18next";

interface ErrorProps extends PropsWithChildren {
  redirectTo?: string;
  redirectButtonValue?: string;
}

const Error = ({
  children,
  redirectTo = Path.Home,
  redirectButtonValue,
}: ErrorProps) => {
  const navigator = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <WarningSign className="w-[200px] h-fit" />

      <div className="h-3" />

      {children}

      <div className="h-5" />

      {redirectTo && (
        <Button
          variant="outlined"
          size="big"
          onClick={() => {
            navigator(redirectTo);
          }}
        >
          {redirectButtonValue ?? t("common.backToMain")}
        </Button>
      )}
    </>
  );
};

export default Error;
