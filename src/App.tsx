import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";
import GroupDetailPage from "./pages/detail/DetailPage";
import MainPage from "./pages/main/MainPage";
import Path from "./types/paths";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import LoginPage from "./pages/login/LoginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path={Path.Home} element={<MainPage />} />
        <Route path={Path.Group + ":uuid"} element={<GroupDetailPage />} />
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
