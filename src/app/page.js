"use client";
import React, { useState, useRef, useEffect } from "react";
import Icon from "./components/Icon";
import NavBar from "./components/NavBar";
import axios from "axios";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

export default function Home() {
  const selectedImageRef = useRef(null);

  const mainRef = useRef();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Images
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  const handleImageLoaded = () => {
    setLoadedImagesCount((prevCount) => prevCount + 1);
  };

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

  useEffect(() => {
    if (nftImageUrl) {
      setSelectedImageIndex(0);
    }
  }, [nftImageUrl]);

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

  useEffect(() => {
    if (selectedImageRef.current) {
      console.log("Selected Image Dimensions:", {
        width: selectedImageRef.current.naturalWidth,
        height: selectedImageRef.current.naturalHeight,
      });
    }
  }, [selectedImageIndex]);

  // Loading
  useEffect(() => {
    if (!nftImageUrl) return;

    const totalImages = imageList.length;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100 || loadedImagesCount === totalImages) {
          setIsLoading(false);
          clearInterval(timer);
          return 100;
        }
        const newProgress = oldProgress + 20;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [loadedImagesCount, nftImageUrl]);

  // if (isLoading) {
  //   return (
  //     <div className="h-screen w-full flex items-center justify-center flex-col">
  //       <img src="../../apple_logo.png" alt="Apple Logo" className="h-40" />
  //       <div className="w-3/4 bg-gray-500 mt-6 rounded">
  //         <div
  //           style={{ width: `${progress}%` }}
  //           className="h-2 bg-white transition-all duration-200 rounded"
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={`flex flex-col h-screen ${!isLoading ? "fade-in" : ""}`}>
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
          onLoad={handleImageLoaded}
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
          initialTop="top-[78%]"
          initialLeft="left-[38%]"
          onSelect={handleImageSelect}
        />
        <Icon
          image="mail.png"
          name="contact_me.mailto"
          initialTop="top-[45%] md:top-[60%]"
          initialLeft="left-[20%] md:left-[40%]"
          link={"mailto:loic.ghijselings@usernamedlo.com?subject=Mail du portfolio"}
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
          initialTop="top-[65%]"
          initialLeft="left-[65%]"
          link={"https://paycheck-0xdlo.vercel.app"}
        />
        <Icon
          image="pdf.png"
          name="CV.pdf"
          initialTop="top-[80%]"
          initialLeft="left-[80%]"
          link={"/CV.pdf"}
        />
        <Link href="/design">
          <Icon
            image="folder.png"
            name="WIP_PROJECT"
            initialTop="top-[60%]"
            initialLeft="left-[5%]"
          />
        </Link>
        <span className="hidden lg:flex">
          {nftImageUrl && (
            <Icon
              image={nftImageUrl}
              name="Pixel_Interfaces_#2500.nft"
              initialTop="top-[20%]"
              initialLeft="left-[75%]"
              link={
                "https://opensea.io/assets/0xdDbDDcfdec729eE7013C3038482538C03D7C62Cb/2500"
              }
              onLoad={handleImageLoaded}
            />
          )}
          <Icon
            image="poster_2.png"
            name="INSULAR.png"
            initialTop="top-[43%]"
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
          <Icon
            image="daft_funk.png"
            name="daft_funk.yt"
            initialTop="top-[15%]"
            initialLeft="left-[65%]"
            link={"https://www.youtube.com/watch?v=AUh9xVoyqvk"}
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
            initialLeft="left-[70%] md:left-[75%]"
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
            ref={selectedImageRef}
            src={imageList[selectedImageIndex]}
            alt="Selected"
            className={`${
              selectedImageIndex === 0 ? "w-[90%]" : "w-[3/4]"
            }  md:w-1/2 3xl:w-1/3`}
          />
        </div>
      )}
      <Analytics />
    </div>
  );
}
