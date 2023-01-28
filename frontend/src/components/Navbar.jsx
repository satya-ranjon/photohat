import React from "react";
// import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SitLogo from "./Logo";
import UserButton from "./UserButton";
import CatagoreBar from "./CatagoreBar";

export default function Navbar({ user, setsearchTerm, searchTerm }) {
  return (
    <>
      <div className="w-screen flex  flex-row items-center p-1 justify-between bg-white shadow-xs   pl-4 pr-4 pt-2 pb-2  ">
        <SitLogo />
        <SearchBar searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        <UserButton user={user} />
      </div>
      <CatagoreBar />
    </>
  );
}
