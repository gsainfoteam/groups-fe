import { useState, useEffect } from "react";
import Select, { SelectOptionBase } from "@/components/select/Select";
import { generateInviteCode } from "@/apis/group";
import { GroupContextType } from "../../groupInfo/ManageGroupInfoPage";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";

const InviteSection = () => {
  const { t } = useTranslation();
  const { group } = useOutletContext<GroupContextType>();
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  const expirationOptions = [
    { id: 1, value: "1일 후 만료" },
    { id: 7, value: "7일 후 만료" },
    { id: 30, value: "30일 후 만료" },
  ];

  const [selectedOption, setSelectedOption] = useState(expirationOptions[0]);

  useEffect(() => {
    const generateLink = async () => {
      if (!group?.uuid || !selectedOption) return;

      setLoading(true);
      try {
        const data = await generateInviteCode(
          group.uuid,
          selectedOption.id * 86400,
        );
        const link = `https://inviteGroup.ziggle.gistory.me/${data.code}`;
        setInviteLink(link);
      } catch (error) {
        console.error("링크 생성 실패:", error);
        alert("링크 생성에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    generateLink();
  }, [selectedOption, group?.uuid]);

  const handleOptionClick = (option: SelectOptionBase) => {
    setSelectedOption(option);
  };

  const handleCopyLink = () => {
    if (!inviteLink) {
      alert("생성된 링크가 없습니다.");
      return;
    }

    navigator.clipboard
      .writeText(inviteLink)
      .then(() => alert("링크가 복사되었습니다!"))
      .catch((err) => console.error("복사 실패:", err));
  };

  return (
    <div className="flex flex-col md:w-[400px] justify-start items-center gap-2.5">
      <p className="text-dark dark:text-grey text-xl font-bold">
        {t("manageGroup.members.invite.title")}
      </p>
      <Select
        size="big"
        options={expirationOptions}
        selectedValue={selectedOption}
        onOptionClick={handleOptionClick}
        className="flex w-full bg-greyLight rounded-[10px] justify-start items-center gap-2.5 text-dark dark:text-grey"
      />
      <div
        className="w-full min-h px-[15px] py-2.5 bg-greyLight rounded-[10px] justify-center items-center"
        onClick={handleCopyLink}
      >
        <p className="flex break-all justify-start itmes-center text-primary text-sm font-medium font-['Inconsolata'] leading-tight">
          {loading
            ? "링크 생성 중..."
            : inviteLink || "만료 기한을 선택해 주세요"}
        </p>
      </div>
      <div className="text-greyDark text-base font-medium">
        {t("manageGroup.members.invite.description")}
      </div>
    </div>
  );
};

export default InviteSection;
