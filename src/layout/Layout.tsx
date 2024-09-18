import Navbar from "@/components/navbar/Navbar";
import "@/globals.css";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
};

export default Layout;
