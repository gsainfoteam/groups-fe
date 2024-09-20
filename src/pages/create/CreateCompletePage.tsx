import Button from "@/components/button/Button";
import { Trans, useTranslation } from "react-i18next";
import CompleteAnimation from "./components/CompleteAnimation";

const CreateGroupSequenceComplete = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="flex w-full flex-col items-center justify-center py-[60px] md:min-h-[500px]">
        <CompleteAnimation />

        <h2 className="mb-[10px] mt-[15px] break-keep text-center text-[28px] font-bold">
          <Trans t={t} i18nKey="createGroup.complete.title">
            {{ groupName: "asasdfsddf" }}
          </Trans>
        </h2>
        <p className="text-greyDark">{t("createGroup.complete.description")}</p>
      </section>

      <Button
        variant="contained"
        className="w-full py-[15px] text-[18px] md:w-[240px]"
        isBig
      >
        {t("createGroup.goBack")}
      </Button>
    </>
  );
};

export default CreateGroupSequenceComplete;
