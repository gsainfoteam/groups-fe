import Navbar from "@/components/navbar/Navbar";
import "@/globals.css";
import Path from "@/types/Paths";

import { Outlet } from "react-router-dom";

interface LayoutProps {
  to?: string;
}

const Layout = ({ to = Path.Home }: LayoutProps) => {
  return (
    <>
      <Navbar to={to} />

      <Outlet />
    </>
  );
};

export default Layout;
