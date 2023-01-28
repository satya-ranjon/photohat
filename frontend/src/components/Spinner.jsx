import React from "react";
import {
  Audio,
  BallTriangle,
  Bars,
  Circles,
  Grid,
  Rings,
  Triangle,
} from "react-loader-spinner";

export function SpinnerAudio() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Audio height="120" width="150" color="#f87171" ariaLabel="loading" />
    </div>
  );
}

export function SpinnerBallTriangle() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <BallTriangle
        height="120"
        width="150"
        color="#f87171"
        ariaLabel="loading"
      />
    </div>
  );
}

export function SpinnerBars() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Bars height="120" width="150" color="#f87171" ariaLabel="loading" />
    </div>
  );
}

export function SpinnerCircles() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Circles height="120" width="150" color="#f87171" ariaLabel="loading" />
    </div>
  );
}

export function SpinnerGrid() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Grid height="120" width="150" color="#f87171" ariaLabel="loading" />
    </div>
  );
}

export function SpinnerRings() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Rings height="120" width="150" color="#f87171" ariaLabel="loading" />
    </div>
  );
}

export function SpinnerTriangle() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Triangle height="120" width="150" color="#f87171" ariaLabel="loading" />
    </div>
  );
}
