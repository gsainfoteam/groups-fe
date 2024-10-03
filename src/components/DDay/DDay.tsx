import { cn } from "@/utils/clsx";
import { cva, VariantProps } from "class-variance-authority";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next/TransWithoutContext";

const DDayVariants = cva(
  "h-fit rounded-md px-[10px] py-[3px] text-sm text-white",
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
  deadline: dayjs.Dayjs | string;
  className?: string;
}

const DDay = ({ deadline, className }: DDayProps) => {
  const isClosed = dayjs(deadline).isBefore();

  const { t } = useTranslation();

  return (
    <p className={cn(DDayVariants({ isClosed }))}>
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
