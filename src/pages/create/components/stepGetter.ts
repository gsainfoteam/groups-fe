import { ParseKeys } from "i18next";
import { useTranslation } from "react-i18next";

interface Step {
  step: number;
  stepTranslation: ParseKeys;
  stepNameTranslation: ParseKeys;
}

const stepGetter = (stepParam: string | undefined): Step | never => {
  const { t } = useTranslation();

  if (!stepParam) {
    throw new Error("param must be specified to get matched step.");
  }

  let step: Step = {
    step: 0,
    stepTranslation: t("common.error"),
    stepNameTranslation: t("common.error"),
  };

  switch (stepParam) {
    case "createGroup":
    case "name":
      step = {
        step: 1,
        stepTranslation: t("createGroup.name.step"),
        stepNameTranslation: t("createGroup.name.stepName"),
      };
      break;
    case "complete":
      step = {
        step: 2,
        stepTranslation: t("createGroup.complete.step"),
        stepNameTranslation: t("createGroup.complete.stepName"),
      };
      break;
  }

  if (
    step.stepNameTranslation === t("common.error") ||
    step.stepNameTranslation === t("common.error")
  ) {
    throw new Error("invalid stepParam for stepGetter");
  }

  return step;
};

export default stepGetter;
