import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";

import CreateGroupLayout from "./pages/createGroup/CreateGroupLayout";
import GroupDetailPageLayout from "./pages/detail/DetailPageLayout";
import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import Path from "./types/paths";
import ManageLayout from "./pages/manage/ManageLayout";
import ManageGroupInfoPage from "./pages/manage/pages/groupInfo/ManageGroupInfoPage";
import ManageNotionLinkPage from "./pages/manage/pages/notion/ManageNotionLinkPage";
import ManageMembersPage from "./pages/manage/pages/members/ManageMembersPage";

import CreateGroupName from "./pages/createGroup/pages/name/CreateGroupNamePage";
import CreateGroupDescriptionPage from "./pages/createGroup/pages/description/CreateGroupDescriptionPage";
import CreateGroupNotionPage from "./pages/createGroup/pages/notion/CreateGroupNotionPage";
import CreateGroupCompletePage from "./pages/createGroup/pages/complete/CreateGroupCompletePage";
import InvitePage from "./pages/invite/InvitePage";
import ErrorPage from "./pages/error/ErrorPage";
import GroupIntroTab from "./pages/detail/tabs/intro/GroupIntroTab";
import GroupNoticesTab from "./pages/detail/tabs/notices/GroupNoticesTab";
import GroupMembersTab from "./pages/detail/tabs/members/GroupMembersTab";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path={Path.Home} element={<MainPage />} />
        <Route path={Path.Group + ":uuid"} element={<GroupDetailPageLayout />}>
          <Route index element={<GroupIntroTab />} />
          <Route path={Path.GroupInfo} element={<GroupIntroTab />} />
          <Route path={Path.GroupNotices} element={<GroupNoticesTab />} />
          <Route path={Path.GroupMembers} element={<GroupMembersTab />} />
        </Route>
        <Route
          path={Path.Invite + ":code" + "/" + ":groupId"}
          element={<InvitePage />}
        />

        <Route element={<CreateGroupLayout />}>
          <Route
            path={Path.Create}
            element={<Navigate to={Path.CreateName} />}
          />
          <Route path={Path.CreateName} element={<CreateGroupName />} />
          <Route
            path={Path.CreateDescription}
            element={<CreateGroupDescriptionPage />}
          />
          <Route path={Path.CreateNotion} element={<CreateGroupNotionPage />} />
          <Route
            path={Path.CreateComplete}
            element={<CreateGroupCompletePage />}
          />
        </Route>

        <Route path={Path.Onboarding} element={<OnboardingPage />} />
      </Route>

      <Route path={"*"} element={<ErrorPage />} />
      <Route path={Path.Login} element={<LoginPage />} />

      <Route path={Path.Manage + ":uuid" + "/:role"} element={<ManageLayout />}>
        <Route index element={<ManageGroupInfoPage />} />
        <Route path={Path.ManageGroupInfo} element={<ManageGroupInfoPage />} />
        <Route
          path={Path.ManageNotionLink}
          element={<ManageNotionLinkPage />}
        />
        <Route path={Path.ManageMembers} element={<ManageMembersPage />} />
      </Route>
    </>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
