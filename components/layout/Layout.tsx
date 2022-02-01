import React from "react";
import LayoutProps from "./interfaceLayout";
import Navbar from "./navbar/Navbar";
import Login from "./auth/Login";
function Layout({ children }: LayoutProps) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export default Layout;
