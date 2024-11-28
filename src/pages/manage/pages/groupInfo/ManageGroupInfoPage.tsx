import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { useOutletContext } from "react-router-dom";
import { GroupInfo } from "@/types/interfaces";

const ManageGroupInfoPage = () => {
  const group = useOutletContext<GroupInfo | null>();

  if (!group) {
    return <p>데이터를 불러오는 중...</p>;
  }

  return (
    <div className="flex w-full flex-col items-center gap-[30px] md:gap-16">
      <div className="flex flex-col items-center gap-[27px] self-stretch">
        <div className="flex w-[140px] h-[140px] md:w-[200px] md:h-[200px] justify-center items-center rounded-[100px] border border-light-primary">
          {group.profileImageUrl ? (
            <img
              src={group.profileImageUrl}
              alt="그룹 프로필"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-greyDark">이미지 없음</span>
          )}
        </div>

        <Button size="cta" variant="outlined">
          그룹 프로필 사진 변경
        </Button>
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        <p className="text-2xl font-bold text-dark">그룹명</p>
        <p className="text-base font-medium text-dark">그룹명 변경</p>

        <Input width="100%" placeholder={group.name} buttonValue="변경" />
      </div>

      <div className="flex w-full flex-col justify-center items-start gap-4">
        <p className="text-2xl font-bold text-dark">그룹 간단 소개</p>
        <p className="text-base font-medium text-dark">그룹 간단 소개 변경</p>

        <div className="w-full flex flex-col items-end gap-2.5">
          <div className="flex flex-col w-full gap-1.5">
            <textarea
              className="h-[100px] w-full px-4 py-2.5 rounded-xl border border-primary"
              placeholder={group.description || "그룹 설명 없음"}
            ></textarea>
            <p className="flex w-full justify-end text-greyDark text-xs">
              {(group.description?.length || 0)}/500
            </p>
          </div>

          <Button size="big" variant="emphasized" className="rounded-[10px]">
            변경
          </Button>
        </div>
      </div>

      <div className="w-full p-5 flex flex-col justify-center items-start gap-5 rounded-xl border-2 border-greyBorder">
        <div className="flex items-center gap-5 self-stretch">
          <div className="flex flex-col items-start gap-2.5 flex-1">
            <p className="self-stretch text-primary font-bold text-xl">
              그룹 삭제
            </p>
            <p className="self-stretch text-greyDark font-medium text-base">
              기존에 본 그룹 명의로 작성된 공지에는 영향을 끼치지 않습니다. 본
              작업은 되돌릴 수 없습니다.
            </p>
          </div>

          <Button size="small" variant="outlined">
            삭제하기
          </Button>
        </div>

        <div className="w-full h-[1.5px] bg-greyBorder" />

        <div className="flex items-center gap-5 self-stretch">
          <div className="flex flex-col items-start gap-2.5 flex-1">
            <p className="self-stretch text-primary font-bold text-xl">
              그룹 나가기
            </p>
            <p className="self-stretch text-greyDark font-medium text-base">
              기존에 본 그룹 명의로 작성된 공지에는 영향을 끼치지 않습니다.
              그룹을 나간 뒤에도 초대된다면 다시 그룹에 참여할 수 있습니다.
            </p>
          </div>

          <Button size="small" variant="outlined">
            나가기
          </Button>
        </div>
      </div>

      <div className="flex justify-center self-stretch">
        <Button size="cta" variant="emphasized" className="w-full md:w-60">
          완료
        </Button>
      </div>
    </div>
  );
};

export default ManageGroupInfoPage;
