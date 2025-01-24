export const main = {
  lang: "en",
  metadata: {
    title: "Ziggle",
    description: "All Notices in GIST at a glance",
  },
  common: {
    optional: "Optional",
    sortByDeadline: "Sort by deadline",
    error: "Frontend Error Occurred",
    loading: "Loading...",
    overdue: "OVERDUE",
    backToMain: "Back to Main",
  },
  navbar: {
    all: "All Notices",
    write: "Write Notice",
    query: "Search Notice",
    login: "Login",
    button: {
      goBackToZiggle: "Back to Ziggle",
    },
  },
  onboarding: {
    description: "Easily create Club announcements with Ziggle",
    cta: "Start with GIST Mail",
    error: {
      description: "An error occurred while authentication.",
      goBack: "Back to Main",
    },
  },
  alertResponse: {
    yes: "Yes",
    no: "No",
    cancel: "Cancel",
    confirm: "Confirm",
    submit: "Submit",
  },
  footer: {
    infoteam: "GIST Student Council - Information Department",
    copyright: "ⓒ 2024. INFOTEAM all rights reserved.",
    sections: [
      {
        title: "Introduction",
        links: [
          {
            name: "Introduce Infoteam",
            link: "https://introduce.gistory.me",
          },
          {
            name: "Bug Report",
            link: "https://cs.gistory.me/?service=Ziggle",
          },
        ],
      },
      {
        title: "Terms",
        links: [
          {
            name: "Terms of Service",
            link: "https://infoteam-rulrudino.notion.site/6177be6369e44280a23a65866c51b257",
          },
          {
            name: "Privacy Policy",
            link: "https://infoteam-rulrudino.notion.site/ceb9340c0b514497b6d916c4a67590a1",
          },
          {
            name: "FAQ",
            link: "mailto:ziggle@gistory.me",
          },
        ],
      },
      {
        title: "Shortcuts",
        links: [
          {
            name: "GIST House",
            link: "https://sites.google.com/view/gisthouse/home",
          },
          {
            name: "GIST Homepage",
            link: "https://www.gist.ac.kr/kr/main.html",
          },
          {
            name: "Gijol",
            link: "https://gijol.im",
          },
        ],
      },
    ],
  },
  zabo: {
    share: {
      action: "Share",
      content: "{{title}}\nCheck the notice in Ziggle!",
      unsupported: "Your browser doesn't support sharing.",
    },
    timeLeft: "{{timeLeft}} left",
  },
  group: {
    mainTitle: "My Groups",
    mainLogo: "You are not a member of any groups.",
    mainDescription:
      "If you want to join a specific group, please contact the group administrator.",
    successfullyJoinedMessage:
      "Successfully joined group <strong>{{groupName}}</strong>!",
    createGroup: "Create Group",
    manageGroup: "Manage Group",
    leaveGroup: "Leave Group",
    favorite: "Favorite",
    memberCount: "{{count}} members",
    noticeCount: "{{count}} notices",
    tabs: {
      intro: "Intro",
      notices: "Notices",
      members: "Members",
    },
    intro: {
      notExist: "The group introduction page does not exist yet.",
    },
    emptyNotices: "No notices found",
    members: {
      loading: "Loading members...",
      error: "Failed to load members.",
    },
  },
  groupInvitation: {
    title: "Group Member Invitation Link",
    description: "Click link to copy link.",
    linkExpirationSelect: {
      aDay: "Expires after a day",
      threeDays: "Expires after three days",
      aWeek: "Expires after a week",
      aMonth: "Expiresa after a month",
    },
    linkActions: {
      hover: "Click to Copy",
      complete: "Copied!",
    },
    error: {
      unknownError: "Unknown error occured while generating invitation link.",
    },
  },
  invitationPage: {
    title: 'Are you going to join group "{{groupName}}"',
    groupAdmin: "Group Administrator: ",
    actions: {
      deny: "Deny",
      accept: "Accept",
    },
    error: {
      alreadyInGroup: "You are already in this group!",
      expired: "This invitation link is expired.",
    },
  },
  createGroup: {
    createGroup: "Create Group",
    previous: "Prev",
    next: "Next",
    skip: "Skip",
    goBack: "Go back",
    enter: "Enter",
    name: {
      step: "Step 1",
      stepName: "Setup Group Profile",
      enterGroupName: "Enter Group Name",
      groupName: "Group Name",
      placeholder: "ex) 인포팀 (Infoteam)",
      chooseGroupProfile: "Choose Group Profile Image",
      exceptions: {
        groupNameAlreadyExist: "The group name already exists.",
      },
    },
    description: {
      step: "Step 2",
      stepName: "Write Brief Group Description",
      title: "Write a brief group description",
      description:
        "Please write a brief group description within 2 sentences. \nThe group description you write will be posted at the top of the group main page.",
      placeholder: "Write a brief group description",
    },
    notion: {
      step: "Step 3",
      stepName: "Attach Group Intro Notion Link",
      title: "Group Intro Notion Link",
      description:
        "You can attach your beautiful Notion link to the group introduction. \nAfter publishing your group introduction Notion on the web, please paste the link here.",
      placeholder: "Paste your Notion link here",
      exceptions: {
        invalidLink: "Invalid Notion link.",
        customDomain: "Custom domains are not supported.",
      },
    },
    complete: {
      step: "Step 4",
      stepName: "Creation Complete!",
      title: '"{{groupName}}" group has been created!',
      description: "You can now write a notice under the group name.",
    },
    cancelAlert: {
      title: "Are you sure you want to cancel the creation?",
      description: "The process will be lost.",
      no: "No",
      yes: "Yes",
    },
  },

  manageGroup: {
    goBack: "Go back",
    groupInfo: {
      name: "Group Info",
      groupPic: {
        title: "Change Group Profile Image",
      },
      groupName: {
        title: "Group Name",
        description: "Change Group Name",
        button: "Change",
      },
      groupIntro: {
        title: "Group Introduction",
        description: "Change Group Introduction",
        button: "Change",
      },
      groupDelete: {
        title: "Delete Group",
        description:
          "Notices posted under this group name will not be affected. This action cannot be undone.",
        button: "Delete",
      },
      groupLeave: {
        title: "Leave Group",
        description:
          "Notices posted under this group name will not be affected. You can rejoin if invited again after leaving the group.",
        button: "Leave",
      },
      complete: "Complete",
    },
    notionlink: {
      name: "Notion Link",
      title: "Group Introduction Notion Link",
      description: {
        first:
          "You can attach your beautiful Notion link to the group introduction.",
        second: "After publishing your group introduction Notion on the web,",
        third: "please paste the link here.",
      },
      button: "Change",
      loading: "Loading Notion...",
      complete: "Complete",
    },
    members: {
      name: "Member",
      invite: {
        title: "Group Member Invitation Link",
        expire: "Expires in 1 day",
        description: "Click the link to copy it.",
      },
      list: {
        title: "Manage Members",
        table: {
          name: "Name",
          email: "Email",
          role: "Role",
          expel: "Expel",
          expelButton: "Expel",
        },
      },
      role: {
        title: "💡 Member Roles",
        admin: {
          title: "Admin",
          description:
            "Has all permissions, including editing group info, changing roles, and expelling members.",
        },
        manager: {
          title: "Manager",
          description:
            "Can invite members and post notices on behalf of the group.",
        },
        normal: {
          title: "Normal",
          description:
            "Can only leave the group but is displayed as a group member on the group intro page.",
        },
      },
      complete: "Complete",
    },
  },

  installApp: {
    title: "Install the mobile app!",
    text: "You can use more convenient service.",
    open: "Open App or Install App",
    cancel: "Never mind",
  },
};
