import Member from './components/Member';
import MembersHeader from './components/MembersHeader';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import { MemberProps } from './components/Member';
import { useTranslation } from "react-i18next";

const ManageMembersPage = () => {
    const { t } = useTranslation();

    const members: MemberProps[] = [
        { name: "고도현", email: "doridori@gm.gist.ac.kr", role: "admin" },
        { name: "이보성", email: "paperstar@gm.gist.ac.kr", role: "manager" },
        { name: "서강현", email: "ganghyeonseo@gm.gist.ac.kr", role: "normal" },
        { name: "최익준", email: "ikjunchoi@gm.gist.ac.kr", role: "normal" },
    ];
    
    return(
        <div className='flex w-full flex-col items-center gap-[30px] md:gap-16'>
            {/* 초대 */}
            <div className="flex flex-col md:w-[400px] justify-start items-center gap-2.5">
                <p className="text-dark text-xl font-bold">{t("manageGroup.members.invite.title")}</p>
                <div className="flex w-full pl-4 pr-2.5 py-2.5 bg-greyLight rounded-[10px] justify-start items-center gap-2.5">
                    <div className="grow text-greyDark text-base font-medium">{t("manageGroup.members.invite.expire")}</div>
                    <ArrowRight className="stroke-dark w-6 h-6 rotate-90" />
                </div>
                <div className="w-full min-h px-[15px] py-2.5 bg-greyLight rounded-[10px] justify-center items-center">
                    <a href="https://inviteGroup.ziggle.gistory.me/3jlejkfheof90eh#wjkenbfkuweb" className="flex break-all justify-start itmes-center text-primary text-sm font-medium font-['Inconsolata'] leading-tight" target="_blank" rel="noopener noreferrer">
                        https://inviteGroup.ziggle.gistory.me/3jlejkfheof90eh#wjkenbfkuweb
                    </a>
                </div>
                <div className="text-greyDark text-base font-medium">{t("manageGroup.members.invite.description")}</div>
            </div>
            {/* 멤버 관리 */}
            <div className="flex flex-col w-full justify-start items-start gap-[15px] overflow-x-hidden">
                <div className="text-dark text-[28px] font-bold">{t("manageGroup.members.list.title")}</div>
                {/* 멤버 목록 */}
                <div className="w-full overflow-x-scroll md:overflow-x-hidden">
                <div className="w-fit justify-start items-center flex-col">
                    <MembersHeader />
                    {members.map((member, index) => (
                        <Member
                            key={index}
                            name={member.name}
                            email={member.email}
                            role={member.role}
                        />
                        ))}
                </div>
                </div>
                {/* 멤버 역할 */}
                <div className="w-full self-stretch px-6 py-[22px] bg-greyLight rounded-[10px] flex-col justify-start items-start gap-3.5 flex">
                    <div className="self-stretch justify-start items-start flex text-dark text-xl font-bold">{t("manageGroup.members.role.title")}</div>
                    <div className="self-stretch justify-start items-start flex flex-col gap-2.5">
                        <div className="self-stretch justify-start items-start inline-flex">
                            <p className="text-dark text-base font-bold">{t("manageGroup.members.role.admin.title")}<span className="text-dark text-base font-medium"> - {t("manageGroup.members.role.admin.description")}</span></p>
                        </div>
                        <div className="self-stretch justify-start items-start inline-flex">
                            <p className="text-dark text-base font-bold">{t("manageGroup.members.role.manager.title")}<span className="text-dark text-base font-medium"> - {t("manageGroup.members.role.manager.description")}</span></p>
                        </div>
                        <div className="self-stretch justify-start items-start inline-flex">
                            <p className="text-dark text-base font-bold">{t("manageGroup.members.role.normal.title")}<span className="text-dark text-base font-medium"> - {t("manageGroup.members.role.normal.description")}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            {/* 완료 버튼 */}
            <div className="flex justify-center self-stretch">
                <button className="w-full md:w-60 py-4 flex justify-center items-center rounded-xl bg-primary text-secondary text-lg font-bold">{t("manageGroup.members.complete")}</button>
            </div>
        </div>
    )
};

export default ManageMembersPage;
