import { message } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { useSelector } from "../app/store";
import Categories from "../components/categories/Categories";
import { useGetAllCategoriesQuery } from "../features/categories/categories-api";
import {
  useGetAllProductsQuery,
  useSearchProductQuery,
} from "../features/products/products-api";
import { emptyQuery } from "../features/products/search";
import styles from "../styles/Home.module.css";
const Home: NextPage = () => {
  //init products and categories
  const dispatch = useDispatch();
  let products: any = [];
  let sections: any = [];
  //get search from redux
  const search = useSelector((state) => state.search);
  let query = "";
  let s = search.query;
  if (s && s.length > 0) {
    query = s;
  }

  //get all products and categories
  const { data: AllProducts, isSuccess: success } =
    useGetAllProductsQuery(query);

  const { data: categories, isSuccess } = useGetAllCategoriesQuery("");
  if (success) {
    products = AllProducts;
  }

  if (isSuccess) {
    sections = categories;
  }

  if (s.length === 1) {
    dispatch(emptyQuery());
  }
  return (
    <div className={styles.container}>
      <Categories products={products} sections={sections} />
    </div>
  );
};

export default Home;
