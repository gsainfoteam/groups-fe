export const main = {
  lang: "en",
  common: {
    optional: "Optional",
    sortByDeadline: "Sort by deadline",
    error: "Frontend error occurred",
    loading: "Loading...",
    overdue: "Overdue",
    backToMain: "Go back",
    backToHome: "Back to Home",
    loadingError: "There was a problem loading data.",
    translationLoading: "Translation loading",
    complete: "Complete",
    warning: "Warning",
    cancel: "Cancel",
  },
  navbar: {
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
    manage: "Manage",
    tabs: {
      intro: "Intro",
      notices: "Notices",
      members: "Members",
    },
    intro: {
      notExist: "No introduction page yet.",
      loadError: "Failed to load Notion page.",
    },
    emptyNotices: "No notices",
    notices: {
      error: "Failed to find group notices",
      empty: "There are no notices",
    },
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
    previous: "Previous",
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
        invalidNotionLink: "Invalid Notion link.",
        customDomainNotSupported: "Custom domains are not supported.",
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
    goBack: "Back",
    invalidGroupId: "Invalid group ID.",
    invalidGroup: "Invalid group.",
    tabs: {
      groupInfo: "Basic Info",
      intro: "Introduction",
      members: "Members",
    },
    groupInfo: {
      name: "Basic Info",
      groupPic: {
        title: "Change Group Profile Picture",
        selectNew: "Select a new image",
        none: "No image",
        changing: "Changing profile picture...",
        success: "Profile picture has been successfully changed!",
        error: "An error occurred while changing the profile picture.",
        confirm: "Confirm Change",
        cancel: "Cancel",
        newPreview: "New profile preview",
        profile: "Group profile",
      },
      groupName: {
        title: "Group Name",
        description: "Change Group Name",
        button: "Change",
        success: "Group name has been changed.",
        error: "Failed to change group name: {{message}}",
      },
      groupIntro: {
        title: "Group Introduction",
        description: "Change Group Introduction",
        button: "Change",
        success: "Group description has been changed.",
        error: "Failed to change group description: {{message}}",
        noDescription: "No group description",
      },
      groupDelete: {
        title: "Delete Group",
        description:
          "Notices posted under this group name will not be affected. This action cannot be undone.",
        button: "Delete",
        success: "Group has been successfully deleted.",
        error: "An error occurred while deleting the group.",
        deleting: "Deleting...",
        warning: "⚠️ Group Deletion Warning ⚠️",
        confirm: "Are you sure you want to delete this group?",
        console: {
          error: "Error while deleting group:",
        },
      },
      groupLeave: {
        title: "Leave Group",
        description:
          "Notices posted under this group name will not be affected. You can rejoin if invited again after leaving the group.",
        button: "Leave",
        success: "You have successfully left the group.",
        error: "Failed to leave the group. Please try again.",
        leaving: "Leaving...",
        warning: "⚠️ Leave Group Warning ⚠️",
        confirm: "Are you sure you want to leave this group?",
        presidentCannot: "Group president cannot perform this action.",
      },
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
      placeholder: "paste notion link here",
      button: "Change",
      loading: "Loading Notion...",
      emptyLink: "Please enter a new Notion link.",
      success: "Notion link has been changed.",
      error: "Failed to change Notion link. Please try again.",
      loadError: "Failed to load Notion page.",
      console: {
        invalidFormat: "Invalid Notion link format.",
        changeFailed: "Failed to change Notion link:",
      },
    },
    members: {
      name: "Member",
      createInviteLink: "Create Invitation Link",
      list: {
        title: "Manage Members",
        changeRoleModal: {
          title: "Change Member Role",
          warningDescription: "Your role will be changed to admin.",
        },
        table: {
          name: "Name",
          email: "Email",
          role: "Role",
          banish: "Banish",
          banishButton: "Banish",
        },
      },
      banish: {
        banishing: "Banishing...",
        banish: "Banish",
        banishWarning: "⚠️ Banish Warning ⚠️",
        banishSuccess: "Member {{name}} has been successfully banished.",
        banishFailed: "Failed to banish member. Please try again.",
        banishConfirm: "Are you sure you want to banish member {{name}}?",
        banishAriaLabel: "Banish member {{name}}",
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
    },
    noPermission: "{{requiredRoleName}} or higher can perform this operation.",
  },

  installApp: {
    title: "Install the mobile app!",
    text: "You can use more convenient service.",
    open: "Open App or Install App",
    cancel: "Never mind",
  },

  role: {
    president: "Group President",
    admin: "Admin",
    manager: "Manager",
    member: "Member",
    adminOnly: {
      view: "Only admins can view this.",
      change: "Only admins can change this.",
      banish: "Only admins can banish members.",
    },
  },

  pagination: {
    of: "of",
  },
};
