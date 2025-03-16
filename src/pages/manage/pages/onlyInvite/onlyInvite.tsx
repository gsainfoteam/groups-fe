import InviteSection from "../members/component/InviteSection";
import { useTranslation } from "react-i18next";

export default function OnlyInvitePage() {
    const { t } = useTranslation();
    return <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
        <InviteSection />
        <div className="w-full self-stretch px-6 py-[22px] bg-greyLight rounded-[10px] flex-col justify-start items-start gap-3.5 flex">
          <div className="self-stretch justify-start items-start flex text-dark dark:text-grey text-xl font-bold">
            {t("manageGroup.members.role.title")}
          </div>
          <div className="self-stretch justify-start items-start flex flex-col gap-2.5">
            <div className="self-stretch justify-start items-start inline-flex">
              <p className="text-dark  dark:text-grey text-base font-bold">
                {t("manageGroup.members.role.admin.title")}
                <span className="text-dark dark:text-grey text-base font-medium">
                  {" "}
                  - {t("manageGroup.members.role.admin.description")}
                </span>
              </p>
            </div>
            <div className="self-stretch justify-start items-start inline-flex">
              <p className="text-dark  dark:text-grey text-base font-bold">
                {t("manageGroup.members.role.manager.title")}
                <span className="text-dark dark:text-grey text-base font-medium">
                  {" "}
                  - {t("manageGroup.members.role.manager.description")}
                </span>
              </p>
            </div>
            <div className="self-stretch justify-start items-start inline-flex">
              <p className="text-dark dark:text-grey text-base font-bold">
                {t("manageGroup.members.role.normal.title")}
                <span className="text-dark dark:text-grey text-base font-medium">
                  {" "}
                  - {t("manageGroup.members.role.normal.description")}
                </span>
              </p>
            </div>
          </div>
        </div>
    </div>
}