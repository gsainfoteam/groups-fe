import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";
import CreateCompletePage from "./pages/create/CreateCompletePage";
import CreateDescriptionPage from "./pages/create/CreateDescriptionPage";
import CreateLayout from "./pages/create/CreateLayout";
import CreateMembersPage from "./pages/create/CreateMembersPage";
import CreateNamePage from "./pages/create/CreateNamePage";
import CreateNotionPage from "./pages/create/CreateNotionPage";
import GroupDetailPage from "./pages/detail/DetailPage";
import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import Path from "./types/paths";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={"*"} element={<Navigate to={Path.Home} replace />} />
      <Route path={Path.Home} element={<MainPage />} />
      <Route path={Path.Group + ":uuid"} element={<GroupDetailPage />} />

      <Route element={<CreateLayout />}>
        <Route path={Path.Create} element={<Navigate to={Path.CreateName} />} />
        <Route path={Path.CreateName} element={<CreateNamePage />} />
        <Route
          path={Path.CreateDescription}
          element={<CreateDescriptionPage />}
        />
        <Route path={Path.CreateNotion} element={<CreateNotionPage />} />
        <Route path={Path.CreateComplete} element={<CreateCompletePage />} />
        <Route path={Path.CreateMembers} element={<CreateMembersPage />} />
      </Route>

      <Route path={Path.Onboarding} element={<OnboardingPage />} />
      <Route path={Path.Login} element={<LoginPage />} />
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
