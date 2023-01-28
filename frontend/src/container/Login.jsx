import React from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import Logo from "../assets/images/watchme_white.png";
import Googlelogin from "../components/GoogleLogin";

export default function Login() {
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <BackgroundVideo />
      </div>
      {/* overlay effect for the video  */}
      <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
        {/* login content  */}
        <div className="p-5">
          <img src={Logo} alt="logo" width="200px" />
        </div>
        <div className="shadow-2xl">
          <Googlelogin />
        </div>
      </div>
    </div>
  );
}
