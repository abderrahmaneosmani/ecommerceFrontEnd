import React from "react";
import ProductDetails from "../../components/products/ProductDetails";
import server, { NEXT_URL } from "../../utils/vars";

function getProductById({ product }: any) {
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
export const getServerSideProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(`${server}/products/${id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default getProductById;
