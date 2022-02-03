import React from "react";
import ProductList from "../../components/products/ProductsList";

function products({ products }) {
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}
export const getStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};

export default products;
