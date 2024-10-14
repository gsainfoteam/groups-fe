import Navigator from './components/Navigator';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const ManageLayout = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center">
            <div className="flex w-full px-[18px] md:w-[600px] md:px-0 pt-10 pb-10 flex-col items-center gap-[30px] md:gap-16">
                {/* 상단 바 */}
                <div className="flex flex-col items-start gap-5 self-stretch">
                    {/* 뒤로 가기 및 그룹 이름 */}
                    <div className="flex flex-col items-start gap-2.5 self-stretch">
                        <div className="flex items-center">
                            <ArrowRight className="h-5 w-5 md:h-6 md:w-6 stroke-primary scale-x-[-1]" />
                            <p className="text-primary text-base md:text-xl font-medium">{t("manageGroup.goBack")}</p>
                        </div>
                        <p className="text-dark text-[26px] md:text-4xl font-bold">그룹 이름</p>
                    </div>
                    {/* 네비게이터 */}
                    <Navigator />
                </div>

                {/* 개별 페이지의 콘텐츠 */}
                <Outlet />
            </div>
        </div>
    );
};

export default ManageLayout;
