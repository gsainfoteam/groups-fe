enum Path {
  Home = "/",

  Group = "/group/",
  GroupInfo = "info",
  GroupNotices = "notices",
  GroupMembers = "members",

  Onboarding = "/onboarding",

  Login = "/login",

  Create = "/create",
  CreateName = "/create/name",
  CreateDescription = "/create/description",
  CreateNotion = "/create/notion",
  CreateComplete = "/create/complete",

  Invite = "/invite/",

  Manage = "/manage/",
  ManageGroupInfo = "groupinfo",
  ManageNotionLink = "notionlink",
  ManageMembers = "members",
  ManageOnlyInvite = "onlyInvite",
  ManageOnlyLeave = "onlyLeave",
  ThirdParty = "thirdParty"
}

export default Path;
