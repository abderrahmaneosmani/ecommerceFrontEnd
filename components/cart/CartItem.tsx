import React from "react";
import {
  removeItem,
  increaseQuantity,
  desIncreaseQuantity,
  deleteItem,
} from "../../features/shoppingCart/cart-slice";
import { useDispatch } from "react-redux";
function CartItem({ product }) {
  //remove cartitem
  const dispatch = useDispatch();

  const remove = () => {
    dispatch(deleteItem);
    dispatch(removeItem(product.cartItemId));
  };

  //increase quantity of product inside cartitem
  const incrementQuantity = () => {
    dispatch(increaseQuantity(product.id));
  };
  const decrementQuantity = () => {
    dispatch(desIncreaseQuantity(product.id));
  };

  return (
    <div>
      <li key={product.id} className="py-6 flex">
        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
          <img
            src={product.url}
            alt={product.url}
            className="w-full h-full object-center object-cover"
          />
        </div>

        <div className="ml-4 flex-1 flex flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href={product.href}>{product.name}</a>
              </h3>
              <p className="ml-4">
                {Number(product.price) * Number(product.quantity)}
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-500">{product.name}</p>
          </div>
          <div className="flex-1 flex items-end justify-between text-sm">
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={incrementQuantity}
            >
              +
            </button>
            <p className="text-gray-500">Qty {product.quantity}</p>
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={decrementQuantity}
            >
              -
            </button>
            <div className="flex">
              <button
                onClick={remove}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

export default CartItem;
