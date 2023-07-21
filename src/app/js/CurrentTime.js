import { useState, useEffect } from "react";

export default function CurrentTime() {
  const [date, setDate] = useState(new Date());
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nove",
    "Dec",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dayName = days[date.getDay()];
  const dayNumber = date.getDate();
  const monthName = months[date.getMonth()];
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return (
    <span>
      <div>
        <div className="inline-block m-[0.2rem]">{dayName}</div>
        <div className="inline-block m-[0.2rem]">{dayNumber}</div>
        <div className="inline-block m-[0.2rem]">{monthName}</div>
        <div className="inline-block w-9">
          {hours}:{minutes < 10 ? "0" : ""}
          {minutes}
        </div>
        <div className="inline-block w-6">{ampm}</div>
      </div>
    </span>
  );
}
