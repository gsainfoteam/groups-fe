import { ParseKeys } from "i18next";
import { useTranslation } from "react-i18next";

interface RoleItemProps {
  titleKey: ParseKeys;
  descriptionKey: ParseKeys;
}

const RoleItem = ({ titleKey, descriptionKey }: RoleItemProps) => {
  const { t } = useTranslation();

  return (
    <div className="self-stretch justify-start items-start inline-flex">
      <p className="text-dark dark:text-grey text-base font-bold">
        {t(titleKey)}
        <span className="text-dark dark:text-grey text-base font-medium">
          {" "}
          - {t(descriptionKey)}
        </span>
      </p>
    </div>
  );
};

export default RoleItem;
