import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Categories from "../components/categories/Categories";
import { useGetAllCategoriesQuery } from "../features/categories/categories-api";
import { useGetAllProductsQuery } from "../features/products/products-api";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  let products: any = [];
  let sections: any = [];

  const { data: Allproducts, isSuccess: success } =
    useGetAllProductsQuery("10");
  const { data: categories, isSuccess } = useGetAllCategoriesQuery("10");
  if (success) {
    products = Allproducts;
  }
  if (isSuccess) {
    sections = categories;
  }

  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Categories products={products} sections={sections} />
    </div>
  );
};

export default Home;
