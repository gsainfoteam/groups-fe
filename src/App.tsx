import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";
import GroupDetailPage from "./pages/detail/DetailPage";
import MainPage from "./pages/main/MainPage";
import Path from "./types/Paths";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={Path.Home} element={<MainPage />} />
      <Route path={Path.Group + ":uuid"} element={<GroupDetailPage />} />
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
