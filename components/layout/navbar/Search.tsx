import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuery, emptyQuery } from "../../../features/products/search";

function Search() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  if (input.length > 0) {
    dispatch(emptyQuery());
    dispatch(addQuery(input));
  }

  return (
    <div className="w-full mx-auto mt-2 mb-4 sm:mx-0 sm:mb-0 sm:mt-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-1/2 sm:h-full justify-center items-center block sm:flex">
      <form className="relative w-full">
        <input
          value={input}
          onInput={(e: any) => setInput(e.target.value)}
          type="search"
          className="text-black w-30  sm:w-full max-w-full border border-gray-300 rounded-sm pr-4 pl-10 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
          placeholder="Search for something..."
        />
      </form>
    </div>
  );
}

export default Search;
