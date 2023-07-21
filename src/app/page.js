"use client";
import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

import NavBar from "./components/NavBar";

const Icon = ({ image, name, style }) => {
  const top = Math.random() * (window.innerHeight - 50);
  const left = Math.random() * (window.innerWidth - 50);

  return (
    <Draggable bounds="parent" axis="both">
      <div
        className="icon cursor-move absolute flex flex-col items-center select-none"
        style={{ top: `${top}px`, left: `${left}px` }}
      >
        {" "}
        <img src={image} alt={name} className={style} />
        <p>{name}</p>
      </div>
    </Draggable>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setIsLoading(false);
          clearInterval(timer);
          return 100;
        }
        const newProgress = oldProgress + 20;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center flex-col">
        <img src="../../apple_logo.png" alt="Apple Logo" className="h-40" />
        <div className="w-3/4 bg-gray-500 mt-6 rounded">
          <div
            style={{ width: `${progress}%` }}
            className="h-2 bg-white transition-all duration-200 rounded"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="main-container h-screen w-screen">
        <Icon image="cv.png" name="mon_cv.png" style={"w-10"} />
        <Icon image="cv.png" name="mon_cv.png" style={"w-10"}/>
        <Icon image="luffy.gif" style={"w-20"}/>
      </main>
    </>
  );
}
