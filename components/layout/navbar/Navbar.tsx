import React, { useEffect, useState } from "react";

import { ShoppingBagIcon } from "@heroicons/react/outline";

import {
  faQuestionCircle,
  faBell,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Settings from "./Setting";
import { isUserAuthenticatedSelector } from "../../../features/auth/auth";
import { useSelector } from "../../../app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "./Search";
import getUserId from "../../../utils/getUserId";
import { useDispatch } from "react-redux";
import { getAllCartItems } from "../../../features/shoppingCart/cart-slice";
import ListCart from "../../cart/ListCart";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const authenticated = useSelector(isUserAuthenticatedSelector);
  const shoppingCart = useSelector((state) => state.cartItem);
  const count = shoppingCart.cartItems.length;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  ///shopping cart
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
    <div className="z-0 flex items-center h-20 px-6 justify-between border-b border-gray-300 bg-cyan-600 text-white relative z-50">
      <Search />

      <div className=" flex-1 ml-10 items-center hidden lg:flex">
        <div className="h-8 mx-4">
          <img
            className="h-8 w-auto sm:h-10"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          />
        </div>
      </div>

      <div className="items-center hidden lg:flex">
        {!authenticated && (
          <>
            <Link href="/auth/login">
              <a className="px-4">Sign In</a>
            </Link>
            <Link href="/auth/register">
              <a className="px-4">Register</a>
            </Link>
          </>
        )}
        <div className="ml-4 flow-root lg:ml-6">
          <a className="group -m-2 p-2 flex items-center ">
            <ShoppingBagIcon
              className="flex-shrink-0 h-6 w-6 text-white-400 group-hover:text-gray-500"
              aria-hidden="true"
              onClick={handleOpen}
            />
            <span className="ml-1 text-sm font-medium text-white-700 group-hover:text-gray-800">
              {count}
            </span>
            <ListCart
              products={cart.cartItems}
              totalPrice={getTotalPrice()}
              open={open}
              handleOpen={handleOpen}
            />
          </a>
        </div>
        {authenticated && <Settings />}
      </div>
      <FontAwesomeIcon
        icon={mobileOpen ? faTimes : faBars}
        onClick={() => setMobileOpen(!mobileOpen)}
        className="text-white text-3xl cursor-pointer lg:hidden"
      />
      {mobileOpen && (
        <div className="bg-blue-800 absolute top-full left-0 flex flex-col w-full pb-8 lg:hidden">
          <div className="flex-1 flex flex-col items-center text-xl">
            {!authenticated && (
              <>
                <Link href="/auth/login">
                  <a className="px-4">Sign In</a>
                </Link>
                <Link href="/auth/register">
                  <a className="px-4">Register</a>
                </Link>
              </>
            )}

            <a>
              <Link href="/cart/cart">
                <div className="ml-4 flow-root lg:ml-6">
                  <a className="group -m-2 p-2 flex items-center ">
                    <ShoppingBagIcon
                      className="flex-shrink-0 h-6 w-6 text-white-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-1 text-sm font-medium text-white-700 group-hover:text-gray-800">
                      {count}
                    </span>
                  </a>
                </div>
              </Link>
              {authenticated && <Settings />}
            </a>

            <div className="my-2 flex justify-center">
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="text-2xl mx-2 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faBell}
                className="text-2xl mx-2 cursor-pointer"
              />
              {authenticated && <Settings />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
