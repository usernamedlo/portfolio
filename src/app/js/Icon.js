import React, { useState } from "react";
import Draggable from "react-draggable";

const Icon = ({
  image,
  name,
  style = "w-20 md:w-24 lg:w-32",
  link,
  initialTop = "top-[6.25%]", // Utilise des classes Tailwind
  initialLeft = "left-[3%]", // Utilise des classes Tailwind
  textSize = "text-sm md:text-xl lg:text-xl",
  onSelect,
}) => {
  const [topClass, setTopClass] = useState(initialTop);
  const [leftClass, setLeftClass] = useState(initialLeft);
  const [mouseDownTime, setMouseDownTime] = useState(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setMouseDownTime(performance.now());
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    const elapsedTime = performance.now() - mouseDownTime;
    if (elapsedTime <= 200) {
      if (link) {
        window.open(link, "_blank");
      } else if (onSelect) {
        onSelect(image);
      }
    }
    setMouseDownTime(null);
  };

  return (
    <Draggable bounds="body" axis="both">
      <div
        className={`icon cursor-move absolute flex flex-col items-center select-none transition-opacity duration-200 hover:opacity-80 ${topClass} ${leftClass}`}
      >
        <img
          src={image}
          alt={name}
          className={`${style}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
        <p
          style={{ textShadow: "1px 2px 4px rgba(0, 0, 0, 0.5)" }}
          className={`mt-1 ${textSize}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {name}
        </p>
      </div>
    </Draggable>
  );
};

export default Icon;
