import { cn } from "@/utils/clsx";
import { cva } from "class-variance-authority";
import { ClassArray, ClassValue } from "clsx";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next/TransWithoutContext";

dayjs.extend(relativeTime);

const DDayVariants = cva(
  "h-fit rounded-md px-[10px] py-[3px] text-sm text-white dark:text-d_white",
  {
    variants: {
      isClosed: {
        true: ["bg-greyDark"],
        false: ["bg-primary"],
      },
    },
  },
);

interface DDayProps {
  deadline: Dayjs | string;
  className?: ClassValue;
}

const DDay = ({ deadline, className }: DDayProps) => {
  const isClosed = dayjs(deadline).isBefore();

  const { t } = useTranslation();

  return (
    <p className={cn(DDayVariants({ isClosed }), className)}>
      {isClosed ? (
        t("common.overdue")
      ) : (
        <Trans t={t} i18nKey={"zabo.timeLeft"}>
          {{ timeLeft: dayjs(deadline).fromNow(true) }}
        </Trans>
      )}
    </p>
  );
};

export default DDay;
