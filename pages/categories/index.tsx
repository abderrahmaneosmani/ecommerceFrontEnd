import React from "react";
import Categories from "../../components/categories/Categories";
import server from "../../utils/vars";

function categories({ products, sections }: any) {
  return <Categories products={products} sections={sections} />;
}

export const getServerSideProps = async (context: any) => {
  const res = await fetch(`${server}/products`);
  const products = await res.json();

  const response = await fetch(`${server}/categories`);
  const sections = await response.json();

  return {
    props: {
      products,
      sections,
    },
  };
};

export default categories;
