import Link from "next/link";
import React from "react";
import ListCart from "../../components/cart/ListCart";
import { useSelector } from "react-redux";

function cart() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cart = useSelector((state) => state.cartItem);
  const getTotalPrice = () => {
    return cart.cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity * item.totalPrice,
      0
    );
  };

  return (
    <>
      <h2>cart is </h2>

      <ListCart products={cart.cartItems} totalPrice={getTotalPrice()} />

      <Link href="/">Go back</Link>
    </>
  );
}

export default cart;
