import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center py-10">
      <div className="content flex max-w-[800px] flex-col">
        <h1 className="mb-[25px] text-4xl font-bold">
          {t("createGroup.createGroup")}
        </h1>
      </div>

      <div className="content flex max-w-[800px] flex-col items-center">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;