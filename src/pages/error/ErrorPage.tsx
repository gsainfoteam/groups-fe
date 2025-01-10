import Error from "@/assets/error/Error";
import Path from "@/types/paths";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <main className="area h-dvh">
        <div className="h-full flex flex-col justify-center items-center">
          <Error
            redirectTo={Path.Home}
            redirectButtonValue={t("common.backToMain")}
          >
            <h1 className="font-black text-greyDark text-3xl my-2">
              Error 404
            </h1>
          </Error>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
