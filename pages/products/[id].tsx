import React from "react";
import ProductDetails from "../../components/products/ProductDetails";

function getProductById({ product }) {
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default getProductById;
