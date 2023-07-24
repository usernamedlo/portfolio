"use client"
import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

import NavBar from "./components/NavBar";

const Icon = ({ image, name, style, size, mainRef }) => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const sizeNumber = Number(size.replace("w-", "")) * 16;

  useEffect(() => {
    if (mainRef.current) {
      const top = Math.random() * (mainRef.current.offsetHeight - sizeNumber);
      const left = Math.random() * (mainRef.current.offsetWidth - sizeNumber);
      setTop(top);
      setLeft(left);
    }
  }, [mainRef, sizeNumber]);

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <Draggable bounds="parent" axis="both">
      <div
        className="icon cursor-move absolute flex flex-col items-center select-none bg-blue-800"
        style={{ top: `${top}px`, left: `${left}px` }}
      >
        <img
          src={image}
          alt={name}
          className={`${style} ${size}`}
          onMouseDown={handleMouseDown}
        />
        <p>{name}</p>
      </div>
    </Draggable>
  );
};

export default function Home() {
  const mainRef = useRef();

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
    }, 200);
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
    <div className="flex flex-col h-screen">
      <header className="h-1/20">
        <NavBar />
      </header>
      <main
        ref={mainRef}
        className="main-container h-19/20 overflow-hidden w-full border-red-600 border"
      >
        <Icon
          image="cv.png"
          name="mon_cv.png"
          style={"w-10"}
          size="10"
          mainRef={mainRef}
        />
        <Icon
          image="cv.png"
          name="mon_cv.png"
          style={"w-10"}
          size="10"
          mainRef={mainRef}
        />
        <Icon image="luffy.gif" style={"w-40"} size="40" mainRef={mainRef} />
      </main>
    </div>
  );
}
