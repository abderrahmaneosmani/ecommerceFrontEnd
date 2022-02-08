import React, { Fragment, useState, useEffect } from "react";
import { useGetAllCategoriesQuery } from "../../features/categories/categories-api";
import { useGetAllProductsQuery } from "../../features/products/products-api";
import Login from "../auth/Login";
import Categories from "../categories/Categories";
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
