import React, { Fragment, useState } from "react";
import LayoutProps from "./interfaceLayout";
import Navbar from "./navbar/Navbar";

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
