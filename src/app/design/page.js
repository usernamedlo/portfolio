"use client";
import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";

const design = () => {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef();

  return (
    <div className={`flex flex-col h-screen ${!isLoading ? "fade-in" : ""}`}>
      <header>
        <NavBar />
      </header>
      <main
        ref={mainRef}
        className="main-container h-screen overflow-hidden w-full"
      >
        <div className="flex justify-center items-start mt-20 h-full">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-center">
              <p>WORK IN PROGRESS</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default design;
