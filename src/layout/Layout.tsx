import Navbar from "@/components/navbar/Navbar";
import Path from "@/types/paths";

import { Outlet } from "react-router-dom";

interface LayoutProps {
  to?: string;
}

const Layout = ({ to = Path.Home }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
