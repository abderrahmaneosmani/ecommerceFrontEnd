import React from "react";
import ProductDetails from "../../../components/products/ProductDetails";

function article({ product }: any) {
  return <ProductDetails product={product} />;
}

export const getServerSideProps = async (context: any) => {
  const res = await fetch(
    `https://fakestoreapi.com/products/${context.params.id}`
  );
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default article;
