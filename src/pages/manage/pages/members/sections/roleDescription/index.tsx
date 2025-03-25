import { useTranslation } from "react-i18next";
import RoleItem from "./RoleItem";
import { ROLE_KEYS } from "./constants";

const RoleDescriptionSection = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full self-stretch px-6 py-[22px] bg-greyLight rounded-[10px] flex-col justify-start items-start gap-3.5 flex">
      <div className="self-stretch justify-start items-start flex text-dark dark:text-grey text-xl font-semibold">
        {t("manageGroup.members.role.title")}
      </div>
      <div className="self-stretch justify-start items-start flex flex-col gap-2.5">
        {ROLE_KEYS.map((role) => (
          <RoleItem
            key={role.titleKey}
            titleKey={role.titleKey}
            descriptionKey={role.descriptionKey}
          />
        ))}
      </div>
    </div>
  );
};

export default RoleDescriptionSection;
