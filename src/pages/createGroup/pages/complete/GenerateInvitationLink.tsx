import Button from "@/components/button/Button";
import Card from "@/components/card/Card";
import Select from "@/components/select/Select";
import { cn } from "@/utils/clsx";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ClipBoardShake from "@/assets/animations/clipboard-shake.json";
import CompleteOutlineCircle from "@/assets/animations/complete-outline-circle.json";
import copyToClipboard from "@/utils/copyToClipboard";
import useSWR from "swr";
import { generateInviteCode } from "@/apis/group";
import invitationLinkGenerator from "../../utils/invitationLinkGenerator";
import apiKeys, { Methods } from "@/types/api-keys";
import Loading from "@/components/loading/Loading";

interface GenerateInvitationLinkProps {
  groupUuid: string;
}

const A_DAY_SECOND = 60 * 60 * 24;

const GenerateInvitationLink = ({ groupUuid }: GenerateInvitationLinkProps) => {
  const { t } = useTranslation();

  const LINK_EXPIRATION_OPTIONS = [
    {
      id: 0,
      value: t("groupInvitation.linkExpirationSelect.aDay"),
      expirationTime: 1,
    },
    {
      id: 1,
      value: t("groupInvitation.linkExpirationSelect.threeDays"),
      expirationTime: 3,
    },
    {
      id: 2,
      value: t("groupInvitation.linkExpirationSelect.aWeek"),
      expirationTime: 7,
    },
    {
      id: 3,
      value: t("groupInvitation.linkExpirationSelect.aMonth"),
      expirationTime: 30,
    },
  ];

  const [expirationOption, setExpirationOption] = useState(
    LINK_EXPIRATION_OPTIONS[0],
  );

  const { data, isLoading, error } = useSWR(
    [
      apiKeys.group.generateInviteCode,
      Methods.Get,
      groupUuid,
      expirationOption.expirationTime,
    ],
    () =>
      generateInviteCode(
        groupUuid,
        expirationOption.expirationTime * A_DAY_SECOND,
        3
      ),
  );

  const [invitationLink, setInvitationLink] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;
    setInvitationLink(invitationLinkGenerator(data.code,groupUuid));
  }, [data]);

  const [isCopyAnimationPlay, setIsCopyAnimationPlay] = useState(false);

  const onLinkCopyClick = () => {
    if (!invitationLink) return;

    copyToClipboard(invitationLink);
    setIsCopyAnimationPlay(true);
  };

  const onLinkCopyButtonMouseLeave = () => {
    setTimeout(() => {
      setIsCopyAnimationPlay(false);
    }, 300);
  };

  return (
    <div className="flex flex-col md:w-[400px] justify-start items-center gap-2.5">
      <p className="text-dark dark:text-grey text-xl font-bold">
        {t("groupInvitation.title")}
      </p>

      <Select
        className="w-full"
        options={LINK_EXPIRATION_OPTIONS}
        selectedValue={expirationOption}
        onOptionClick={(value) => {
          setInvitationLink(null);
          setExpirationOption(value);
        }}
      />

      <div className="min-h-20 w-full">
        <Button
          className={cn(
            "w-full min-h-0 px-[15px] py-2.5 justify-center items-center relative",
            "bg-greyLight rounded-[10px] text-start",
            "transition-all hover:min-h-20 group",
          )}
          onClick={onLinkCopyClick}
          onMouseLeave={onLinkCopyButtonMouseLeave}
        >
          {invitationLink && (
            <p className="flex break-all justify-start itmes-center text-primary text-sm font-medium font-['Inconsolata'] leading-tight">
              {invitationLink}
            </p>
          )}
          {isLoading && (
            <div className="w-full">
              <Loading withText={false} className="w-10" topSpacing="" />
            </div>
          )}

          <Card
            className={cn(
              "absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-0",
              "transition-opacity opacity-0 group-hover:opacity-100",
              "bg-primary",
            )}
          >
            {!isCopyAnimationPlay ? (
              <>
                <Lottie animationData={ClipBoardShake} className="w-10 h-10" />
                <p className="text-white text-sm">
                  {t("groupInvitation.linkActions.hover")}
                </p>
              </>
            ) : (
              <>
                <Lottie
                  animationData={CompleteOutlineCircle}
                  loop={false}
                  className="w-10 h-10"
                />
                <p className="text-white text-sm">
                  {t("groupInvitation.linkActions.complete")}
                </p>
              </>
            )}
          </Card>
        </Button>
      </div>

      <div className="text-greyDark text-base font-medium">
        {t("groupInvitation.description")}
      </div>
    </div>
  );
};

export default GenerateInvitationLink;
