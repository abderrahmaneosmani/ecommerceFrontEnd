import React from "react";
import Categories from "../../components/categories/Categories";

function categories({ products }) {
  return <Categories products={products} />;
}
export const getServerSideProps = async (context: any) => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};

export default categories;
