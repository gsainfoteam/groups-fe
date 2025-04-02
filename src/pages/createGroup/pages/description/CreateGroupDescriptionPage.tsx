import Button from "@/components/button/Button";
import Path from "@/types/paths";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import useGroupDescriptionSequence from "../../hooks/useGroupDescriptionSequence";
import { useGroupCreation } from "../../context/GroupCreationContext";

const CreateGroupDescriptionPage = () => {
  const { t } = useTranslation();
  const { state, updateState } = useGroupCreation();
  const { descriptionLength, setDescription, isNextButtonValid, description } =
    useGroupDescriptionSequence();

  const navigate = useNavigate();

  useEffect(() => {
    if (state.description) {
      setDescription(state.description);
    }
  }, [state.description, setDescription]);

  const handlePreviousClick = () => {
    updateState({
      description: description || "",
    });
    navigate(Path.CreateName);
  };

  const handleNextClick = () => {
    updateState({
      description: description || "",
    });
    navigate(Path.CreateNotion);
  };

  return (
    <>
      <div className={"w-full max-w-[600px] md:h-[500px] flex"}>
        <section className={"w-full flex flex-col mt-20 gap-[15px]"}>
          <h2 className={"create-subtitle"}>
            {t("createGroup.description.title")}
          </h2>
          <p>
            <Trans i18nKey={"createGroup.description.description"} />
          </p>

          <textarea
            className={
              "w-full rounded-[10px] border-[1.5px] border-solid border-primary py-3 pl-4 pr-[10px] bg-white"
            }
            placeholder={t("createGroup.description.placeholder")}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className={"text-xs text-right text-greyDark mt-[-10px]"}>
            {descriptionLength}/200
          </p>
        </section>
      </div>

      <div className={"flex gap-[10px] w-full mt-[30px] justify-center"}>
        <Button
          variant={"outlined"}
          className="w-full py-[15px] text-[18px] max-w-[240px]"
          size="cta"
          onClick={handlePreviousClick}
        >
          {t("createGroup.previous")}
        </Button>
        <Button
          variant={isNextButtonValid ? "emphasized" : "disabled"}
          className="w-full py-[15px] text-[18px] max-w-[240px]"
          size="cta"
          disabled={!isNextButtonValid}
          onClick={handleNextClick}
        >
          {t("createGroup.next")}
        </Button>
      </div>
    </>
  );
};

export default CreateGroupDescriptionPage;
