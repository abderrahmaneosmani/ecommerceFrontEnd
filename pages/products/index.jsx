import React from "react";
import ProductList from "../../components/products/ProductsList";
import server from "../../utils/vars";
function products({ products }) {
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}
export const getStaticProps = async () => {
  const res = await fetch(`${server}/products`);
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};

export default products;
