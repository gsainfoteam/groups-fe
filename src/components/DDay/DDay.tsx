import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next/TransWithoutContext";

interface DDayProps {
  deadline: dayjs.Dayjs | string;
  className?: string;
}

const DDay = ({ deadline, className }: DDayProps) => {
  const isClosed = dayjs(deadline).isBefore();

  const { t } = useTranslation();

  return (
    <p
      className={
        `h-fit rounded-md ${
          isClosed ? "bg-greyDark" : "bg-primary"
        } px-[10px] py-[3px] text-[14px] text-white dark:text-text ` + className
      }
    >
      {isClosed ? (
        t("common.overdue")
      ) : (
        <Trans t={t} i18nKey={"zabo.timeLeft"}>
          {/* @ts-ignore */}
          {{ timeLeft: dayjs(deadline).fromNow(true) }}
        </Trans>
      )}
    </p>
  );
};

export default DDay;
