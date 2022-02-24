import React from "react";
import ProductList from "../../../components/products/ProductsList";

function getProductByCategoryId({ products }: any) {
  return (
    <div>
      <div>
        <ProductList products={products} />
      </div>
    </div>
  );
}
export const getServerSideProps = async (context: any) => {
  const categoryId = context.params.id;
  const response = await fetch(
    `http://localhost:9000/products?categoryId=${categoryId}`
  );
  const products = await response.json();
  return {
    props: {
      products,
    },
  };
};

export default getProductByCategoryId;
