import { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

import Fire from "@/assets/icons/fire.svg?react";

import ShareIcon from "@/assets/icons/share.svg?react";
import { EmojiString, Notice, Reaction } from "@/types/interfaces";

import Button from "../../button/Button";

type ZaboActionsProps = Notice;

interface FireButtonProps {
  id: number;
  fire: Reaction;
}

const FireButton = ({ id, fire }: FireButtonProps) => {
  const { t } = useTranslation();

  const [currentFire, setCurrentFire] = useState<Reaction>(fire);

  return (
    <div className={"flex items-center gap-1"}>
      <Fire
        width={36}
        className="stroke-text duration-150 hover:scale-125 stroke-black dark:stroke-d_white"
      />
      <p className={"font-semibold dark:text-d_white"}>{currentFire.count}</p>
    </div>
  );
};

interface ShareButtonProps {
  title: string;
}

const ShareButton = ({ title }: ShareButtonProps) => {
  const { t } = useTranslation();
  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!navigator.canShare) {
      return Swal.fire({ title: t("zabo.share.unsupported"), icon: "error" });
    }
    navigator.share({
      title,
      text: t("zabo.share.content", { title }),
      url: window.location.href,
    });
  };

  return (
    <Button
      animated
      className="group flex items-center gap-1"
      onClick={handleShare}
    >
      <ShareIcon
        width={26}
        className="stroke-text stroke-2 duration-150 hover:scale-125 stroke-black dark:stroke-d_white"
      />
    </Button>
  );
};

const ZaboActions = ({ id, title, reactions }: ZaboActionsProps) => {
  const fire = reactions.find(({ emoji }) => emoji === EmojiString.FIRE) ?? {
    emoji: EmojiString.FIRE,
    count: 0,
    isReacted: false,
  };

  return (
    <div className={"flex items-center justify-between"}>
      <FireButton id={id} fire={fire} />
      <ShareButton title={title} />
    </div>
  );
};

export default ZaboActions;
