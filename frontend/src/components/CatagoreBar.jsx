import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { categories } from "../utils/data";
export default function CatagoreBar() {
  const isActiveStyle =
    "flex items-center px-2 md:px-5 gap-2 md:gap-3 font-semibold  text-red-400  transition-all duration-200 ease-in-out capitalize ";
  const isNotActiveStyle =
    "flex items-center px-2 md:px-5 gap-2 md:gap-3 text-gray-500 hover:text-red-400 transition-all duration-200 ease-in-out capitalize   ";

  const [isScroll, setIsScroll] = useState(false);

  const scrollRef = useRef();
  const scrollOnClick = (side) => {
    setIsScroll(true);
    side === "right"
      ? (scrollRef.current.scrollLeft += 200)
      : (scrollRef.current.scrollLeft -= 200);
    scrollRef.current.scrollLeft < 199 ? setIsScroll(false) : setIsScroll(true);
  };
  return (
    <div className="flex items-center w-full py-2">
      <NavLink
        className={({ isActive }) =>
          isActive ? isActiveStyle : isNotActiveStyle
        }
        to="/"
      >
        <HiHome fontSize={30} />
      </NavLink>
      <div className="h-6 w-[1px] bg-red-400"></div>

      <div
        className="flex items-center w-full h-10 overflow-y-scroll overFlowHiden hide_scrollbar relative"
        id="category"
      >
        <div
          className={` ${
            isScroll ? "flex" : "hidden"
          }  absolute left-0 w-20  justify-start items-center bg-gradient-to-r from-gray-50 cursor-pointer `}
          onClick={() => scrollOnClick("left")}
        >
          <BiChevronLeft className="text-red-400" fontSize={30} />
        </div>

        {/* /////* catagore  */}
        <div
          className="flex items-center w-full overflow-y-scroll hide_scrollbar scroll-smooth duration-150 ease-in-out"
          id="category"
          ref={scrollRef}
        >
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              key={Math.random()}
              to={`/catagorey/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              {category.name}
            </NavLink>
          ))}
        </div>

        <div
          className="absolute right-0 w-20 sm:flex hidden justify-end items-center bg-gradient-to-l from-gray-50 cursor-pointer"
          onClick={() => scrollOnClick("right")}
        >
          <BiChevronRight fontSize={30} />
        </div>
      </div>
    </div>
  );
}
