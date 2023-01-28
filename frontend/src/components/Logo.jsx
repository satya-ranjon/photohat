import React from "react";
import { SiteLogo } from "../styles/search.styled";
// import Logo1 from "../assets/images/tourist.png";
import Logo2 from "../assets/images/Camera.webp";
// import { Link } from "react-router-dom";

export default function SitLogo() {
  return (
    <>
      {/* <Link to="/" className="flex flex-row-reverse mr-4 sm:hidden">
        <img
          src={Logo2}
          alt=""
          className="w-40 cursor-pointer"
          style={{ width: "60px" }}
        />
      </Link> */}
      <div className="hover:shadow hover:shadow-red-100 hidden sm:flex">
        <SiteLogo className="flex  items-center flex-row mr-24 " to="/">
          <img
            src={Logo2}
            alt=""
            className="w-40 cursor-pointer"
            style={{ width: "55px" }}
          />
          <h3 className="">PhototHat</h3>
        </SiteLogo>
      </div>
    </>
  );
}
