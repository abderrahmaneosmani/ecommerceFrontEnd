import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface search {
  query: string;
}
const initialState = { query: "" } as search;
const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    addQuery(state, action: PayloadAction<string>) {
      state.query += action.payload;
    },
    emptyQuery(state) {
      state.query = "";
    },
  },
});

export const { addQuery, emptyQuery } = search.actions;
export default search.reducer;
