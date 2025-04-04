import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  GroupCreationProvider,
  useGroupCreation,
} from "../context/GroupCreationContext";
import StatusBar from "../components/StatusBar";
import stepGetter from "../components/stepGetter";
import { useEffect } from "react";

const CreateGroupLayoutContent = () => {
  const { t } = useTranslation();
  const pathname = useLocation().pathname;
  const stepParam = pathname.split("/").pop();
  const step = stepGetter(stepParam);
  const { resetState } = useGroupCreation();

  useEffect(() => {
    return () => {
      resetState();
    };
  }, []);

  return (
    <main className="flex flex-col items-center py-10">
      <div className="content flex max-w-[800px] flex-col">
        <h1 className="mb-[25px] text-4xl font-bold">
          {t("createGroup.createGroup")}
        </h1>

        <div className="flex items-center gap-[10px]">
          <div className="text-lg font-bold text-primary">
            {step.stepTranslation}
          </div>
          <div className="h-[1px] w-[40px] bg-greyDark" />
          <div className="text-lg font-medium text-greyDark">
            {step.stepNameTranslation}
          </div>
        </div>

        <div className="mt-[14px] w-full">
          <StatusBar maxStep={4} currentStep={step.step} />
        </div>
      </div>

      <div className="content flex max-w-[800px] flex-col items-center">
        <Outlet />
      </div>
    </main>
  );
};

const CreateGroupLayout = () => {
  return (
    <GroupCreationProvider>
      <CreateGroupLayoutContent />
    </GroupCreationProvider>
  );
};

export default CreateGroupLayout;
