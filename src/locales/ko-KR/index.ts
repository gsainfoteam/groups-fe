export const main = {
  lang: "ko",
  common: {
    optional: "선택",
    sortByDeadline: "마감시간 순으로 보기",
    error: "프론트엔드 에러 발생",
    loading: "로딩 중...",
    overdue: "기한 지남",
    backToMain: "돌아가기",
    backToHome: "홈으로 돌아가기",
    loadingError: "데이터를 불러오는 데 문제가 발생했습니다.",
    translationLoading: "번역 로딩 중",
    complete: "완료",
  },
  navbar: {
    login: "로그인",
    button: {
      goBackToZiggle: "지글로 돌아가기",
    },
  },
  onboarding: {
    description: "이젠 동아리 공지도 지글에서 간편하게",
    cta: "지스트 메일로 시작하기",
    error: {
      description: "인증 도중 오류가 발생하였습니다.",
      goBack: "돌아가기",
    },
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
    successfullyJoinedMessage:
      "<strong>{{groupName}}</strong> 그룹 참가가 완료되었습니다!",
    createGroup: "그룹 생성하기",
    manageGroup: "그룹 관리",
    leaveGroup: "그룹 나가기",
    favorite: "즐겨찾기",
    memberCount: "멤버 {{count}}명",
    noticeCount: "게시글 {{count}}개",
    manage: "그룹 관리",
    tabs: {
      intro: "소개",
      notices: "공지",
      members: "멤버",
    },
    intro: {
      notExist: "아직 소개 페이지가 없습니다.",
      loadError: "노션 페이지 로드에 실패했습니다.",
    },
    emptyNotices: "공지가 없습니다",
    notices: {
      error: "그룹 공지를 찾을 수 없습니다.",
      empty: "공지가 없습니다",
    },
    members: {
      loading: "멤버 로딩 중...",
      error: "멤버 로딩 실패",
    },
  },
  groupInvitation: {
    title: "그룹 멤버 초대 링크",
    description: "링크를 클릭하면 복사됩니다.",
    linkExpirationSelect: {
      aDay: "1일 후 만료",
      threeDays: "3일 후 만료",
      aWeek: "일주일 후 만료",
      aMonth: "한달 후 만료",
    },
    linkActions: {
      hover: "클릭하여 복사",
      complete: "복사가 완료되었습니다!",
    },
    error: {
      unknownError: "초대 링크 생성 도중 에러가 발생하였습니다.",
    },
  },
  invitationPage: {
    title: '"{{groupName}}" 그룹에 참여하시겠습니까?',
    groupAdmin: "그룹 관리자: ",
    actions: {
      deny: "거부",
      accept: "수락",
    },
    error: {
      alreadyInGroup: "이미 이 그룹에 속해있습니다!",
      expired: "해당 초대 링크는 만료되었습니다.",
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
      chooseGroupProfile: "그룹 프로필 사진 선택",
      exceptions: {
        groupNameAlreadyExist: "이미 존재하는 그룹명입니다.",
      },
    },
    description: {
      step: "2단계",
      stepName: "간단한 그룹 소개 작성",
      title: "간단한 그룹 소개 작성",
      description:
        "2줄 내외의 간단한 그룹 소개를 작성해주세요. <br />작성해주신 그룹 설명은 그룹 메인 페이지 최상단에 게재됩니다.",
      placeholder: "간단한 그룹 소개를 작성해주세요",
    },
    notion: {
      step: "3단계",
      stepName: "그룹 소개 노션 링크 첨부",
      title: "그룹 소개 노션 링크",
      description:
        "그룹 소개에 여러분의 예쁜 노션 링크를 붙여넣을 수 있습니다. <br /><strong>작성하신 그룹 소개 노션을 웹에 퍼블리싱</strong>하신 다음, 그 링크를 여기에 붙여넣어 주세요.",
      placeholder: "그룹 소개 노션 링크를 입력해주세요",
      exceptions: {
        invalidNotionLink: "유효하지 않은 노션 링크입니다.",
        customDomainNotSupported: "커스텀 도메인은 지원하지 않습니다.",
      },
    },
    complete: {
      step: "4단계",
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
  manageGroup: {
    goBack: "뒤로",
    invalidGroupId: "유효하지 않은 그룹 ID입니다.",
    invalidGroup: "유효하지 않은 그룹입니다.",
    tabs: {
      groupInfo: "기본 정보",
      intro: "소개 페이지",
      members: "멤버",
    },
    groupInfo: {
      name: "기본 정보",
      groupPic: {
        title: "그룹 프로필 사진 변경",
        selectNew: "새 이미지를 선택하세요",
        none: "이미지 없음",
        changing: "프로필 사진을 변경하는 중입니다...",
        success: "프로필 사진이 성공적으로 변경되었습니다!",
        error: "프로필 사진 변경 중 문제가 발생했습니다.",
        confirm: "변경 확정",
        cancel: "취소",
        newPreview: "새 프로필 미리보기",
        profile: "그룹 프로필",
      },
      groupName: {
        title: "그룹명",
        description: "그룹명 변경",
        button: "변경",
        success: "그룹명이 변경되었습니다.",
        error: "그룹명 변경에 실패했습니다: {{message}}",
      },
      groupIntro: {
        title: "그룹 간단 소개",
        description: "그룹 간단 소개 변경",
        button: "변경",
        success: "그룹 설명이 변경되었습니다.",
        error: "그룹 설명 변경에 실패했습니다: {{message}}",
        noDescription: "그룹 설명 없음",
      },
      groupDelete: {
        title: "그룹 삭제",
        description:
          "기존에 본 그룹 명의로 작성된 공지에는 영향을 끼치지 않습니다. 본 작업은 되돌릴 수 없습니다.",
        button: "삭제하기",
        success: "그룹이 성공적으로 삭제되었습니다.",
        error: "그룹 삭제 중 문제가 발생했습니다.",
        deleting: "삭제 중...",
        warning: "⚠️ 그룹 삭제 경고 ⚠️",
        confirm: "정말로 그룹을 삭제하시겠습니까?",
        console: {
          error: "그룹 삭제 중 오류 발생:",
        },
      },
      groupLeave: {
        title: "그룹 나가기",
        description:
          "기존에 본 그룹 명의로 작성된 공지에는 영향을 끼치지 않습니다. 그룹을 나간 뒤에도 초대된다면 다시 그룹에 참여할 수 있습니다.",
        button: "나가기",
        success: "그룹에서 성공적으로 나갔습니다.",
        error: "그룹 나가기에 실패했습니다. 다시 시도해주세요.",
        leaving: "나가는 중...",
        warning: "⚠️ 그룹 나가기 경고 ⚠️",
        confirm: "정말로 그룹에서 나가시겠습니까?",
        presidentCannot: "그룹장은 이 작업을 수행할 수 없습니다.",
      },
    },
    notionlink: {
      name: "소개 페이지",
      title: "그룹 소개 노션 링크",
      description: {
        first: "그룹 소개에 여러분의 예쁜 노션 링크를 붙여넣을 수 있습니다.",
        second: "작성하신 그룹 소개 노션을 웹에 퍼블리싱",
        third: "하신 다음, 그 링크를 여기에 붙여넣어 주세요.",
      },
      placeholder: "여기에 노션 링크 입력",
      button: "변경",
      loading: "노션 불러오는 중...",
      emptyLink: "새 노션 링크를 입력해주세요.",
      success: "노션 링크가 변경 되었습니다.",
      error: "노션 링크 변경에 실패했습니다. 다시 시도해주세요.",
      loadError: "노션 페이지를 불러오지 못했습니다.",
      console: {
        invalidFormat: "노션 링크의 형식이 잘못되었습니다.",
        changeFailed: "노션 링크 변경 실패:",
      },
    },
    members: {
      name: "멤버",
      createInviteLink: "초대 링크 생성",
      list: {
        title: "멤버 관리",
        table: {
          name: "이름",
          email: "이메일",
          role: "역할",
          banish: "추방",
          banishButton: "추방하기",
        },
      },
      banish: {
        banishing: "추방 중...",
        banish: "추방하기",
        banishWarning: "⚠️ 추방 경고 ⚠️",
        banishSuccess: "멤버 {{name}}의 추방이 성공적으로 이뤄졌습니다.",
        banishFailed: "추방에 실패했습니다. 다시 시도해주세요.",
        banishConfirm: "정말로 멤버 {{name}}을/를 추방하시겠습니까?",
        banishAriaLabel: "{{name}} 멤버 추방하기",
      },
      role: {
        title: "💡 멤버 역할",
        admin: {
          title: "관리자",
          description:
            "그룹 정보 수정, 멤버 역할 변경, 추방 등 모든 권한을 가집니다.",
        },
        manager: {
          title: "매니저",
          description: "그룹 멤버 초대와 그룹 명의로 공지 작성이 가능합니다.",
        },
        normal: {
          title: "일반",
          description:
            "그룹 나가기의 권한만 가집니다. 단, 그룹 소개 페이지에서 그룹의 일원으로 표시됩니다.",
        },
      },
    },
    noPermission: "{{requiredRoleName}} 이상만 이 작업을 수행할 수 있습니다.",
  },
  installApp: {
    title: "모바일 앱을 설치해보세요!",
    text: "더욱 편리한 서비스를 이용하실 수 있습니다.",
    open: "지글 앱을 열거나 설치하기",
    cancel: "괜찮아요",
  },
  role: {
    admin: "관리자",
    manager: "매니저",
    member: "일반",
    adminOnly: {
      view: "관리자만 볼 수 있습니다.",
      change: "관리자만 변경할 수 있습니다.",
      banish: "관리자만 추방할 수 있습니다.",
    },
  },
  pagination: {
    of: "of",
  },
};
