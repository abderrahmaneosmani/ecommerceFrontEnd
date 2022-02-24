import Link from "next/link";
import React, { useEffect } from "react";
import ListCart from "../../components/cart/ListCart";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems } from "../../features/shoppingCart/cart-slice";
import getUserId from "../../utils/getUserId";

function cart() {
  const userId = getUserId();
  const dipatch = useDispatch();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (userId && userId !== null) {
      dipatch(getAllCartItems(userId));
    }
  }, []);
  const cart = useSelector((state) => state.cartItem);

  const getTotalPrice = () => {
    return cart.cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity * item.totalPrice,
      0
    );
  };

  return (
    <>
      <ListCart
        products={cart.cartItems}
        totalPrice={getTotalPrice()}
        handleOpen={true}
      />

      <Link href="/">Go back</Link>
    </>
  );
}

export default cart;
