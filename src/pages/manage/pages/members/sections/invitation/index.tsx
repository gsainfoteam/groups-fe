import GenerateInvitationLink from "@/pages/createGroup/pages/complete/GenerateInvitationLink";
import LockedSign from "@/pages/manage/components/lockedSign";
import { UserRole } from "@/pages/manage/ManageLayout";
import authorityChecker from "@/utils/authorityChecker";
import { useTranslation } from "react-i18next";

interface InvitationSectionProps {
  groupUuid: string;
  userRole: UserRole;
}

const InvitationSection = ({ groupUuid, userRole }: InvitationSectionProps) => {
  const { t } = useTranslation();
  const isAuthorizedForInvitation = authorityChecker(userRole.authorities, [
    "MEMBER_UPDATE",
  ]);

  return isAuthorizedForInvitation ? (
    <GenerateInvitationLink groupUuid={groupUuid} />
  ) : (
    <div className="flex flex-col gap-2 justify-center md:w-[400px] items-center p-6 bg-greyLight rounded-[10px]">
      <h3 className="text-grey font-semibold text-lg">
        {t("manage.members.createInviteLink")}
      </h3>
      <LockedSign requiredRoleName="manager" />
    </div>
  );
};

export default InvitationSection;
