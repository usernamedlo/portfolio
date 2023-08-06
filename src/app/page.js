"use client"
import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const Icon = ({
  image,
  name,
  style,
  mainRef,
  link,
  initialTop,
  initialLeft,
  onSelect
}) => {
  const [top, setTop] = useState(initialTop);
  const [left, setLeft] = useState(initialLeft);
  const [mouseDownTime, setMouseDownTime] = useState(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setMouseDownTime(new Date().getTime());
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    const mouseUpTime = new Date().getTime();
    const elapsedTime = mouseUpTime - mouseDownTime;
    if (elapsedTime <= 200) {
      if (link) {
        window.open(link, "_blank");
      } else if (!link && onSelect) {
        onSelect(image);
      }
    }
    setMouseDownTime(null);
  };

  return (
    <Draggable bounds="parent" axis="both">
      <div
        className="icon cursor-move absolute flex flex-col items-center select-none border-blue-600 border"
        style={{ top: `${top}px`, left: `${left}px` }}
      >
        <img
          src={image}
          alt={name}
          className={`${style}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
        <p
          className="mt-4"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {name}
        </p>
      </div>
    </Draggable>
  );
};

export default function Home() {
  const mainRef = useRef();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const imageList = ["luffy.gif", "yt.png"];

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
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex]);

  return (
    <div className="flex flex-col h-screen">
      <main
        ref={mainRef}
        className="main-container h-screen overflow-hidden w-full border-red-600 border"
      >
        <Icon
          image="site1.png"
          name="cooking_api.web"
          style="w-20"
          mainRef={mainRef}
          link="https://cuisine-un-max.vercel.app"
          initialTop={100}
          initialLeft={200}
        />
        <Icon
          image="luffy.gif"
          style="w-40"
          mainRef={mainRef}
          initialTop={500}
          initialLeft={50}
          onSelect={handleImageSelect}
        />
        <Icon
          image="yt.png"
          style="w-20"
          mainRef={mainRef}
          initialTop={200}
          initialLeft={400}
          onSelect={handleImageSelect}
        />
      </main>
      {selectedImageIndex !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleModalClose}>
          <img src={imageList[selectedImageIndex]} alt="Selected" className="w-1/2 h-auto" />
        </div>
      )}
    </div>
  );
}
