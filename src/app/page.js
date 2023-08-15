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
    "basic_logo.png",
    "poster_1.png",
    "poster_2.png",
    nftImageUrl,
    "about_me.png",
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
          name="README_FIRST.md"
          style="w-28"
          initialTop={70}
          initialLeft={25}
          onSelect={handleImageSelect}
        />
        <Icon
          image="basic_logo.png"
          name="BASIC_LOGO.png"
          style="w-40"
          initialTop={300}
          initialLeft={150}
          onSelect={handleImageSelect}
        />
        <Icon
          image="site_1.png"
          name="cooking_api.web"
          style="w-20"
          link="https://cuisine-un-max.vercel.app"
          initialTop={200}
          initialLeft={1300}
        />
        <Icon
          image="poster_1.png"
          name="VIRTUAL_LOVE.png"
          style="w-24"
          initialTop={300}
          initialLeft={1500}
          onSelect={handleImageSelect}
        />
        <Icon
          image="poster_2.png"
          name="INSULAR.png"
          style="w-28"
          initialTop={200}
          initialLeft={400}
          onSelect={handleImageSelect}
        />
        <Icon
          image="mail.png"
          name="contact_me.png"
          style="w-20"
          initialTop={600}
          initialLeft={400}
          link={"mailto:loic.ghijselings@usernamedlo.com"}
        />
        <Icon
          image={nftImageUrl}
          link={
            "https://opensea.io/assets/ethereum/0xddbddcfdec729ee7013c3038482538c03d7c62cb/2500"
          }
          style="w-40"
          name="Pixel_Interfaces_#2500.nft"
          initialTop={650}
          initialLeft={1550}
        />
        <Icon
          image="random.png"
          link={"https://theuselessweb.com"}
          style="w-20"
          name="?"
          initialTop={600}
          initialLeft={1400}
        />
        <Icon
          image="site_2.png"
          link={"https://paycheck-lfnsgxbr6-0xdlo.vercel.app"}
          style="w-20"
          name="paycheck.web"
          initialTop={75}
          initialLeft={1100}
        />
        <Icon
          image="murakami.png"
          style={"w-20"}
          name="murakami.png"
          initialTop={400}
          initialLeft={1330}
          onSelect={handleImageSelect}
        />
        <Icon
          image="daft_funk.png"
          style={"w-20"}
          name="daft_funk.yt"
          link={"https://www.youtube.com/watch?v=AUh9xVoyqvk"}
          initialTop={600}
          initialLeft={250}
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
