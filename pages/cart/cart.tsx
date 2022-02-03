import Link from "next/link";
import React from "react";
import ListCart from "../../components/cart/ListCart";

function cart() {
  return (
    <>
      <h2>cart is </h2>
      <ListCart />
      <Link href="/">Go back</Link>
    </>
  );
}

export default cart;
