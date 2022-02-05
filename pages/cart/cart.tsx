import Link from "next/link";
import React from "react";
import ListCart from "../../components/cart/ListCart";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/products/ProductItem";
import CartItem from "../../components/cart/CartItem";

function cart() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cart = useSelector((state) => state.cartItem);
  const getTotalPrice = () => {
    return cart.cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  return (
    <>
      <h2>cart is </h2>

      <ListCart products={cart.cartItems} totalPirce={getTotalPrice()} />

      <Link href="/">Go back</Link>
    </>
  );
}

export default cart;
