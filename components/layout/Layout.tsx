import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCartItems } from "../../features/shoppingCart/cart-slice";
import Login from "../auth/Login";
import LayoutProps from "./interfaceLayout";
import Navbar from "./navbar/Navbar";

function Layout({ children }: LayoutProps) {
  const userId = "61dab736adc857e17c58c1d5";

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
