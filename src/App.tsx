import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";
import CreateCompletePage from "./pages/create/CreateCompletePage";
import CreateLayout from "./pages/create/CreateLayout";
import CreateMembersPage from "./pages/create/CreateMembersPage";
import CreateNamePage from "./pages/create/CreateNamePage";
import GroupDetailPage from "./pages/detail/DetailPage";
import MainPage from "./pages/main/MainPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import Path from "./types/Paths";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={"*"} element={<Navigate to={Path.Home} replace />} />
      <Route path={Path.Home} element={<MainPage />} />
      <Route path={Path.Group + ":uuid"} element={<GroupDetailPage />} />

      <Route element={<CreateLayout />}>
        <Route path={Path.Create} element={<Navigate to={Path.CreateName} />} />
        <Route path={Path.CreateName} element={<CreateNamePage />} />
        <Route path={Path.CreateMembers} element={<CreateMembersPage />} />
        <Route path={Path.CreateComplete} element={<CreateCompletePage />} />
      </Route>

      <Route path={Path.Onboarding} element={<OnboardingPage />} />
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
