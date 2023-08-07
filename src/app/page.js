"use client";
import React, { useState, useRef, useEffect } from "react";
import Icon from "./js/Icon";

export default function Home() {
  const mainRef = useRef();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const imageList = ["luffy.gif", "basic_logo.png", "poster_1.jpg", "poster_2.jpg"];

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
          image="basic_logo.png"
          name="BASIC_LOGO.svg"
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
          image="poster_1.jpg"
          name="VIRTUAL_LOVE.jpg"
          style="w-24"
          initialTop={300}
          initialLeft={1500}
          onSelect={handleImageSelect}
        />
        <Icon
          image="poster_2.jpg"
          name="HIGHER_NEON.jpg"
          style="w-20"
          initialTop={200}
          initialLeft={400}
          onSelect={handleImageSelect}
        />
        <Icon
          image="mail.jpg"
          name="contact_me.jpg"
          style="w-20"
          initialTop={600}
          initialLeft={400}
          link={"mailto:loic.ghijselings@usernamedlo.com"}
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
