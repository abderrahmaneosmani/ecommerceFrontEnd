import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import server from "../../utils/vars";
import authHeader from "../auth/auth-header";
const token = authHeader();

interface cart {
  cartItems: [];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}
let data: any = [];

if (typeof window !== "undefined") {
  data = JSON.parse(localStorage.getItem("cartItems") || "[]") || [];
}

const initialState: cart = {
  cartItems: data,
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const getIndexItem = (state: cart, id: string): number => {
  const ids = state.cartItems.map((item: any) => item.productId);
  return ids.indexOf(id);
};

export const getAllCartItems = createAsyncThunk(
  "getAllCartItem",
  async (req: any, thunkAPI) => {
    const userId = req;

    const response = await fetch(
      `http://localhost:9000/cartitems?userId=${userId}`
    );
    const cartitems = await response.json();
    if (!cartitems) {
      throw "error";
    }
    return cartitems;
  }
);
export const saveItem = createAsyncThunk(
  "saveCarte",
  async (req: any, thunkAPI) => {
    var data: any = JSON.stringify(req);

    var config: any = {
      method: "post",
      url: `${server}/cartitems`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    const myData = response.data;
    return myData;
  }
);

export const deleteItem = createAsyncThunk(
  "deleteItem",
  async (req: any, thunkAPI) => {
    const cartItemId = req;
    const response = await fetch(
      `http://localhost:9000/cartitems/${cartItemId}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: any, action: any) {
      const itemIndex = getIndexItem(state, action.payload.productId);
      if (itemIndex && itemIndex < 0) {
        state.cartItems.push(action.payload);
      } else {
        state.cartItems[itemIndex].quantity += 1;
      }
      state.cartQuantity += 1;
      state.cartAmount = 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQuantity: (state: any, action: any) => {
      const itemIndex = getIndexItem(state, action.payload);
      const oldItems = state.cartItems[itemIndex];
      console.log("olditens", oldItems);

      oldItems.quantity += 1;
      state.cartItems[itemIndex] = oldItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    desIncreaseQuantity: (state: any, action: PayloadAction<any>) => {
      const itemIndex = getIndexItem(state, action.payload);
      const oldItems = state.cartItems[itemIndex];
      if (oldItems.quantity > 1) oldItems.quantity -= 1;
      state.cartItems[itemIndex] = oldItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotalsPrice: (state, action: PayloadAction) => {
      const reducer = (previousValue: any, currentValue: any) =>
        previousValue + currentValue;
      const calcTotal = state.cartItems.map((item: any) => {
        let total = 0;
        total = Number(item.totalPrice);
        return total;
      });

      if (calcTotal.length !== 0) {
        const amount = calcTotal.reduce(reducer);
        state.cartTotalAmount = amount;
      }
    },

    removeItem(state: any, action: PayloadAction<any>) {
      console.log(action.payload);

      const mycart: any = state.cartItems.filter(
        (cart: any) => cart.id !== action.payload
      );

      state.cartItems = mycart;
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveItem.fulfilled, (state, action: any) => {
      //state.cartItems.push(action.payload);
    });
    builder.addCase(getAllCartItems.fulfilled, (state, action: any) => {
      state.cartItems = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    });
    builder.addCase(deleteItem.fulfilled, (state: any, action) => {
      const mycart = state.cartItems.filter(
        (item: any) => item.id !== action.payload
      );
      state.cartItems = mycart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    });
  },
});

export const {
  addToCart,
  removeItem,
  increaseQuantity,
  getTotalsPrice,
  desIncreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
