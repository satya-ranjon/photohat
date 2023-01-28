import React from "react";
import backgroundVideo from "../assets/videos/loginvideo.mp4";

export default function BackgroundVideo() {
  return (
    <video
      src={backgroundVideo}
      type="video/mp4"
      loop
      controls={false}
      muted
      autoPlay
      className=" w-full h-full object-cover"
    />
  );
}
