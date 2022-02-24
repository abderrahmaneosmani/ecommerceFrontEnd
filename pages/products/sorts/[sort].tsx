import React from "react";
import ProductList from "../../../components/products/ProductsList";

function sortProducts({ products }: any) {
  return (
    <div>
      <div>
        <ProductList products={products} />
      </div>
    </div>
  );
}
export const getServerSideProps = async (context: any) => {
  const sort = context.query.sort;

  const response = await fetch(
    `http://localhost:3000/api/products/sorts?sort=${sort}`
  );
  const products = await response.json();

  return {
    props: {
      products,
    },
  };
};
export default sortProducts;
