import React from "react";
import { useDispatch } from "react-redux";
import { saveItem, addToCart } from "../../features/shoppingCart/cart-slice";
import { unwrapResult } from "@reduxjs/toolkit";
import getUserId from "../../utils/getUserId";
import Rating from "./Rating";

function ProductDetails({ product }: any) {
  const dispatch = useDispatch();
  const addProduct = async () => {
    const { id, price, image } = product;
    let userId = "null";

    const myUserId = getUserId();
    if (userId && userId !== null) {
      userId = myUserId;
    }
    const cartItem: any = {
      productId: id,
      totalPrice: price + "",
      image,
      userId,
    };

    const res: any = await dispatch(saveItem(cartItem));
    const result: any = await unwrapResult(res);
    dispatch(addToCart(result));
  };
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="rounded-t-lg p-8"
              src={product.image}
              alt={product.image}
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                {product.title}
              </h3>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
              <Rating count={product.rating} />

              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                {product.rating}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              <a
                onClick={addProduct}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
