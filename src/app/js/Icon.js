import React, { useState } from "react";
import Draggable from "react-draggable";

const Icon = ({
  image,
  name,
  style,
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
        className="icon cursor-move absolute flex flex-col items-center select-none"
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
          className="mt-2"
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
