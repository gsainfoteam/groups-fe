import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";

import CreateGroupLayout from "./pages/create/CreateGroupLayout";
import GroupDetailPage from "./pages/detail/DetailPage";
import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import Path from "./types/paths";
import CreateGroupName from "./pages/create/pages/name/CreateGroupNamePage";
import CreateGroupDescriptionPage from "./pages/create/pages/description/CreateGroupDescriptionPage";
import CreateGroupNotionPage from "./pages/create/pages/notion/CreateGroupNotionPage";
import CreateGroupCompletePage from "./pages/create/pages/complete/CreateGroupCompletePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path={"*"} element={<Navigate to={Path.Home} replace />} />
        <Route path={Path.Home} element={<MainPage />} />
        <Route path={Path.Group + ":uuid"} element={<GroupDetailPage />} />

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

      <Route path={Path.Login} element={<LoginPage />} />
    </>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
