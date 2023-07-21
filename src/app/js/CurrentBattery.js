import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryBolt,
  faBatteryEmpty,
  faBatteryQuarter,
  faBatteryHalf,
  faBatteryThreeQuarters,
  faBatteryFull,
} from "@fortawesome/free-solid-svg-icons";

export default function BatteryStatus() {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [batteryCharging] = useState(false);

  useEffect(() => {
    function handleBatteryChange(event) {
      const { level } = event.target;
      setBatteryLevel(level * 100);
    }

    navigator.getBattery().then((battery) => {
      handleBatteryChange({ target: battery });
      battery.addEventListener("levelchange", handleBatteryChange);
    });

    return () => {
      navigator.getBattery().then((battery) => {
        battery.removeEventListener("levelchange", handleBatteryChange);
      });
    };
  }, []);

  let batteryIcon;
  if (batteryCharging) {
    batteryIcon = <FontAwesomeIcon icon={faBatteryBolt} />;
  } else if (batteryLevel < 25) {
    batteryIcon = <FontAwesomeIcon icon={faBatteryEmpty} />;
  } else if (batteryLevel < 50) {
    batteryIcon = <FontAwesomeIcon icon={faBatteryQuarter} />;
  } else if (batteryLevel < 75) {
    batteryIcon = <FontAwesomeIcon icon={faBatteryHalf} />;
  } else if (batteryLevel < 100) {
    batteryIcon = <FontAwesomeIcon icon={faBatteryThreeQuarters} />;
  } else {
    batteryIcon = <FontAwesomeIcon icon={faBatteryFull} />;
  }

  return <span>{batteryIcon}</span>;
}
