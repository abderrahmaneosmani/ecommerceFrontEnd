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
  const hostname =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "jj";

  let host = context.req.headers.host;
  host === "localhost:3000"
    ? (host = `http://${host}`)
    : (host = `https://${host}`);

  const response = await fetch(`${host}/api/products/sorts?sort=${sort}`);
  const products = await response.json();

  return {
    props: {
      products,
    },
  };
};
export default sortProducts;
