"use client";
import React, { useState, useRef, useEffect } from "react";
import Icon from "./js/Icon";
import NavBar from "./components/NavBar";
import axios from "axios";

export default function Home() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [nftImageUrl, setNftImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //
  const handleImageSelect = (index) => setSelectedImageIndex(index);
  const handleModalClose = () => setSelectedImageIndex(null);

  const handleKeyDown = (e) => {
    if (selectedImageIndex !== null) {
      if (e.key === "ArrowRight") {
        setSelectedImageIndex(
          (selectedImageIndex + 1) % displayableIcons.length
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex(
          (selectedImageIndex - 1 + displayableIcons.length) %
            displayableIcons.length
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  const iconsConfig = [
    {
      image: "about_me.png",
      name: "README_FIRST.md",
      style: "w-28",
      initialTop: 70,
      initialLeft: 25,
    },
    {
      image: "basic_logo.png",
      name: "BASIC_LOGO.png",
      style: "w-40",
      initialTop: 300,
      initialLeft: 150,
    },
    {
      image: "site_1.png",
      name: "cooking_api.web",
      style: "w-20",
      link: "https://cuisine-un-max.vercel.app",
      initialTop: 200,
      initialLeft: 1300,
    },
    {
      image: "site_2.png",
      name: "paycheck.web",
      style: "w-20",
      link: "https://paycheck-lfnsgxbr6-0xdlo.vercel.app",
      initialTop: 600,
      initialLeft: 100,
    },
    {
      image: "poster_1.png",
      name: "VIRTUAL_LOVE.png",
      style: "w-24",
      initialTop: 300,
      initialLeft: 1500,
    },
    {
      image: "poster_2.png",
      name: "INSULAR.png",
      style: "w-28",
      initialTop: 200,
      initialLeft: 400,
    },
    {
      image: "mail.png",
      name: "contact_me.png",
      style: "w-20",
      link: "mailto:loic.ghijselings@usernamedlo.com",
      initialTop: 600,
      initialLeft: 400,
    },
    {
      image: "random.png",
      name: "?",
      style: "w-28",
      link: "https://theuselessweb.com",
      initialTop: 600,
      initialLeft: 1400,
    },
    {
      image: "murakami.png",
      name: "murakami.png",
      style: "w-28",
      initialTop: 710,
      initialLeft: 1250,
    },
    {
      image: nftImageUrl,
      link: "https://opensea.io/assets/ethereum/0xddbddcfdec729ee7013c3038482538c03d7c62cb/2500",
      style: "w-40",
      name: "Pixel_Interfaces_#2500.nft",
      initialTop: 650,
      initialLeft: 1550,
    },
    {
      image: "daft_funk.png",
      link: "https://www.youtube.com/watch?v=AUh9xVoyqvk",
      style: "w-24",
      name: "Daft_Funk.yt",
      initialTop: 700,
      initialLeft: 250,
    }
  ];

  const displayableIcons = iconsConfig.filter((icon) => !icon.link);

  return (
    <div className="flex flex-col h-screen">
      <header>
        <NavBar />
      </header>
      <main className="main-container h-screen overflow-hidden w-full">
        {iconsConfig.map((icon, index) => (
          <Icon
            key={index}
            {...icon}
            onSelect={() => handleImageSelect(index)}
          />
        ))}
      </main>
      {selectedImageIndex !== null && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleModalClose}
        >
          <img
            src={displayableIcons[selectedImageIndex].image}
            alt="Selected"
            className="w-1/2 h-auto"
          />
        </div>
      )}
    </div>
  );
}
