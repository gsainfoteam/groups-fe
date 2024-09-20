export const main = {
  lang: "ko",
  metadata: {
    title: "지글",
    description: "지스트의 모든 공지를 한눈에",
  },
  common: {
    optional: "선택",
    sortByDeadline: "마감시간 순으로 보기",
    error: "프론트엔드 에러 발생",
    loading: "로딩 중...",
    overdue: "기한 지남",
  },
  navbar: {
    all: "전체 공지",
    write: "공지 작성",
    query: "공지 검색",
    login: "로그인",
    button: {
      goBackToZiggle: "메인으로",
    },
  },
  onboarding: {
    description: "이젠 동아리 공지도 지글에서 간편하게",
    cta: "지스트 메일로 시작하기",
  },
  alertResponse: {
    yes: "네",
    no: "아니오",
    cancel: "취소",
    confirm: "확인",
    submit: "제출",
  },
  footer: {
    infoteam: "지스트대학 총학생회 산하 정보국",
    copyright: "ⓒ 2024. INFOTEAM all rights reserved.",
    sections: [
      {
        title: "소개",
        links: [
          { name: "인포팀 소개", link: "https://introduce.gistory.me" },
          {
            name: "버그 제보",
            link: "https://cs.gistory.me/?service=Ziggle",
          },
        ],
      },
      {
        title: "약관",
        links: [
          {
            name: "서비스이용약관",
            link: "https://infoteam-rulrudino.notion.site/6177be6369e44280a23a65866c51b257",
          },
          {
            name: "개인정보처리방침",
            link: "https://infoteam-rulrudino.notion.site/ceb9340c0b514497b6d916c4a67590a1",
          },
          { name: "문의", link: "mailto:ziggle@gistory.me" },
        ],
      },
      {
        title: "바로가기",
        links: [
          {
            name: "지스트 하우스",
            link: "https://sites.google.com/view/gisthouse/home",
          },
          {
            name: "GIST 홈페이지",
            link: "https://www.gist.ac.kr/kr/main.html",
          },
          { name: "지졸", link: "https://gijol.im" },
        ],
      },
    ],
  },
  zabo: {
    share: {
      action: "공유하기",
      content: "{{title}}\nZiggle에서 공지를 확인해보세요",
      unsupported: "공유하기를 지원하지 않는 브라우저입니다",
    },
    timeLeft: "{{timeLeft}}일 남음",
  },
  group: {
    mainTitle: "내가 속한 그룹들",
    mainLogo: "속한 그룹이 없습니다.",
    mainDescription:
      "특정 그룹에 속하길 바라신다면, 해당 그룹의 관리자에게 문의해주세요.",
    createGroup: "그룹 생성하기",
    manageGroup: "그룹 관리",
    leaveGroup: "그룹 나가기",
    favorite: "즐겨찾기",
    memberCount: "구독자 {{count}}명",
    noticeCount: "게시글 {{count}}개",
    tabs: {
      intro: "소개",
      notices: "공지",
      members: "멤버",
    },
  },
  createGroup: {
    createGroup: "그룹 생성",
    previous: "이전",
    next: "다음",
    skip: "건너뛰기",
    goBack: "돌아가기",
    enter: "입력",
    name: {
      step: "1단계",
      stepName: "그룹 프로필 설정",
      enterGroupName: "그룹명 입력",
      groupName: "그룹명",
      placeholder: "예시) 인포팀 (Infoteam)",
      exceptions: {
        groupNameAlreadyExist: "이미 존재하는 그룹명입니다.",
      },
    },
    complete: {
      step: "2단계",
      stepName: "생성 완료",
      title: '"{{groupName}}" 그룹 생성이 완료되었습니다!',
      description: "이제 그룹 명의로 공지를 작성하실 수 있습니다.",
    },
    cancelAlert: {
      title: "정말 그룹 생성을 취소하시겠습니까?",
      description: "그룹 생성 진행 상황이 폐기됩니다.",
      no: "아니오",
      yes: "네",
    },
  },
  installApp: {
    title: "모바일 앱을 설치해보세요!",
    text: "더욱 편리한 서비스를 이용하실 수 있습니다.",
    open: "지글 앱을 열거나 설치하기",
    cancel: "괜찮아요",
  },
};
