import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ searchTerm, setsearchTerm }) {
  const navigate = useNavigate();

  return (
    <div className="w-screen lg:w-2/2 h-10 hover:shadow-xl hover:shadow-red-100  bg-red-400 cursor-pointer border border-red-400 text-sm rounded-full flex">
      <input
        type="search"
        name="serch"
        placeholder="Search"
        className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"
        value={searchTerm}
        onFocus={() => navigate("/search-result")}
        onChange={(e) => setsearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="fas fa-search m-3 mr-5 text-lg text-white w-4 h-4"
      >
        <BiSearchAlt />
      </button>
    </div>
  );
}
