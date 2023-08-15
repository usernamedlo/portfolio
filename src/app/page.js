"use client";
import React, { useState, useRef, useEffect } from "react";
import Icon from "./js/Icon";
import NavBar from "./components/NavBar";
import axios from "axios";

export default function Home() {
  const mainRef = useRef();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // NFT + API
  const [nftImageUrl, setNftImageUrl] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.opensea.io/v2/chain/ethereum/contract/0xdDbDDcfdec729eE7013C3038482538C03D7C62Cb/nfts/2500",
        {
          headers: {
            accept: "application/json",
            "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
          },
        }
      );
      setNftImageUrl(response.data.nft.image_url);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération de l'image_url du NFT:",
        err
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Images
  const imageList = [
    "about_me.png",
    "basic_logo.png",
    "poster_1.png",
    "poster_2.png",
    nftImageUrl,
    "murakami.png",
  ];

  // Event handlers
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

  // Keyboard
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex]);

  // Loading
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
      <header>
        <NavBar />
      </header>
      <main
        ref={mainRef}
        className="main-container h-screen overflow-hidden w-full"
      >
        <Icon
          image="about_me.png"
          name="README_FIRST.txt"
          onSelect={handleImageSelect}
        />
        <Icon
          image="poster_1.png"
          name="VIRTUAL_LOVE.png"
          initialTop="top-[20%]"
          initialLeft="left-[15%]"
          onSelect={handleImageSelect}
        />
        <Icon
          image="basic_logo.png"
          name="basic_logo.png"
          initialTop="top-[90%]"
          initialLeft="left-[35%]"
          onSelect={handleImageSelect}
        />
        <Icon
          image="mail.png"
          name="contact_me.mailto"
          initialTop="top-[72%] md:top-[60%]"
          initialLeft="left-[35%] md:left-[40%]"
          link={"mailto:loic.ghijselings@usernamedlo.com"}
        />
        <Icon
          image="site_1.png"
          name="cooking_api.web"
          initialTop="top-[75%]"
          initialLeft="left-[5%]"
          link={"https://cuisine-un-max.vercel.app"}
        />
        <Icon
          image="site_2.png"
          name="paycheck.web"
          initialTop="top-[80%]"
          initialLeft="left-[70%]"
          link={"https://paycheck-0xdlo.vercel.app"}
        />
        <span className="hidden lg:flex">
          <Icon
            image={nftImageUrl}
            name="Pixel_Interfaces_#2500.nft"
            initialTop="top-[20%]"
            initialLeft="left-[75%]"
            link={
              "https://opensea.io/assets/0xdDbDDcfdec729eE7013C3038482538C03D7C62Cb/2500"
            }
          />
          <Icon
            image="poster_2.png"
            name="INSULAR.png"
            initialTop="top-[80%]"
            initialLeft="left-[10%]"
            onSelect={handleImageSelect}
          />
          <Icon
            image="murakami.png"
            name="murakami.png"
            initialTop="top-[50%]"
            initialLeft="left-[80%]"
            onSelect={handleImageSelect}
          />
        </span>
        <span className="lg:hidden">
        <Icon
            image="linkedin.png"
            name="loïc_ghijselings.lkdn"
            initialTop="top-[7.25%]"
            initialLeft="left-[60%]"
            link={"https://www.linkedin.com/in/loic-ghijselings/"}
          />
          <Icon
            image="github.png"
            name="usernamedlo.git"
            initialTop="top-[23%] md:top-[40%]"
            initialLeft="left-[70%] md:left-[80%]"
            link={"https://github.com/usernamedlo"}
          />
        </span>
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
