import React from "react";
import { Link } from "react-router-dom";
import { IoCamera } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";

export default function UserButton({ user }) {
  return (
    <>
      <div className=" justify-center items-center ml-9 hidden mr-8 sm:flex">
        <Link to={!user ? "login" : "create-pin"}>
          <button
            type="button"
            className="w-full p-2 text-base text-red-400 border border-red-400 
            rounded-md hover:shadow-xl hover:shadow-red-100 duration-150 ease-in-out md:flex hidden"
          >
            Upload
            <IoCamera fontSize={24} className="text-red-400 pl-1" />
          </button>

          <div className="bg-red-400 w-10 h-10 rounded-md md:hidden flex items-center justify-center">
            <IoCamera fontSize={24} className="text-white" />
          </div>
        </Link>

        <Link
          to={`/user-profile/${user?._id}`}
          className="flex items-center justify-center w-10 min-w-10 h-10 min-h-10 shadow-lg shadow-red-200 rounded-full bg-red-400 ml-4 border-2 border-red-400  "
        >
          <img src={user?.image} className="rounded-full" alt="" />
          <FaUserCircle fontSize={24} className="text-white" />
        </Link>
      </div>
      <Link to="/" className="flex flex-row-reverse ml-4 sm:hidden">
        {/* <img src={user?.image} className="rounded-full" width={50} alt="" /> */}
        <GoThreeBars className="text-3xl text-red-500" />
      </Link>
    </>
  );
}
