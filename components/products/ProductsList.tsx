import React from "react";
import ProductItem from "./ProductItem";

import Link from "next/link";
function ProductList({ products }: any) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product: any) => (
            // eslint-disable-next-line react/jsx-key
            // eslint-disable-next-line @next/next/no-html-link-for-pages

            <Link href="products/id" as={`/products/${product.id}`}>
              <a>
                <ProductItem product={product} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
