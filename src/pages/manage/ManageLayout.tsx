import Navigator from "./components/Navigator";
import ArrowRight from "@/assets/icons/arrow-right.svg?react";
import Path from "@/types/paths";
import { Link, Outlet } from "react-router-dom";

const ManageLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full px-[18px] md:w-[600px] md:px-0 pt-10 pb-10 flex-col items-center gap-[30px] md:gap-16">
        <div className="flex flex-col items-start gap-5 self-stretch">
          <div className="flex flex-col items-start gap-2.5 self-stretch">
            <Link to={Path.Home}>
              <div className="flex items-center">
                <ArrowRight className="h-5 w-5 md:h-6 md:w-6 stroke-primary scale-x-[-1]" />
                <p className="text-primary text-base md:text-xl font-medium">
                  뒤로
                </p>
              </div>
            </Link>

            <p className="text-dark text-[26px] md:text-4xl font-bold">
              그룹 이름
            </p>
          </div>

          <Navigator />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
