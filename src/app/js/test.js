"use client";
import React, { useState, useRef, useEffect } from "react";
import Icon from "./js/Icon";
import NavBar from "./components/NavBar";

export default function Home() {
  const mainRef = useRef();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const imageList = ["luffy.gif", "yt.png", "poster.png", "basic_logo.png"];
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleImageSelect = (image) => {
    const index = imageList.indexOf(image);
    setSelectedImageIndex(index);
  };

  const handleModalClose = () => {
    setSelectedImageIndex(null);
  };

  const handleKeyDown = (e) => {
    if (selectedImageIndex !== null) {
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((selectedImageIndex + 1) % imageList.length);
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex(
          (selectedImageIndex - 1 + imageList.length) % imageList.length
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
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
    return () => clearInterval(timer), window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

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
      <header>
        <NavBar />
      </header>
      <main
        ref={mainRef}
        className="main-container h-screen overflow-hidden w-full border-red-600 border"
      >
        <Icon
          image="basic_logo.png"
          name="basic_logo.svg"
          style="w-40"
          initialTop={25}
          initialLeft={25}
          onSelect={handleImageSelect}
        />
        <Icon
          image="site1.png"
          name="cooking_api.web"
          style="w-20"
          link="https://cuisine-un-max.vercel.app"
          initialTop={200}
          initialLeft={1300}
        />
        <Icon
          image="luffy.gif"
          style="w-40"
          initialTop={500}
          initialLeft={50}
          onSelect={handleImageSelect}
        />
        <Icon
          image="yt.png"
          style="w-20"
          initialTop={200}
          initialLeft={400}
          onSelect={handleImageSelect}
        />
        <Icon
          image="poster.png"
          name="virtual_love.jpg"
          style="w-24"
          initialTop={300}
          initialLeft={1500}
          onSelect={handleImageSelect}
        />
      </main>
      {selectedImageIndex !== null && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleModalClose}
        >
          <img
            src={imageList[selectedImageIndex]}
            alt="Selected"
            className="w-1/2 h-auto"
          />
        </div>
      )}
    </div>
  );
}
