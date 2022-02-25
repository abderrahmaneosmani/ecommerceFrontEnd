import React from "react";
import ProductDetails from "../../components/products/ProductDetails";

function getProductById({ product }: any) {
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
export const getServerSideProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(
    `https://ecommerce-front-end-ebon.vercel.app/api/products/${id}`
  );
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default getProductById;
