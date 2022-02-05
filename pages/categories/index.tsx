import React from "react";
import Categories from "../../components/categories/Categories";

function categories({ products, sections }) {
  return <Categories products={products} sections={sections} />;
}

export const getServerSideProps = async (context: any) => {
  const res = await fetch(`http://localhost:9000/products`);
  const products = await res.json();

  const response = await fetch(`http://localhost:9000/categories`);
  const sections = await response.json();

  return {
    props: {
      products,
      sections,
    },
  };
};

export default categories;
