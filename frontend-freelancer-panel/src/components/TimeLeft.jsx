import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const TimeLeft = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = dayjs();
      const deadlineDate = dayjs(deadline);

      if (deadlineDate.isBefore(now)) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const diffInSeconds = deadlineDate.diff(now, "second");
      const days = Math.floor(diffInSeconds / (24 * 3600));
      const hours = Math.floor((diffInSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className="flex justify-center items-center gap-6 mt-8">
      {["days", "hours", "minutes", "seconds"].map((unit, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center bg-white/20 backdrop-blur-md rounded-lg px-4 py-6 shadow-lg text-black"
          style={{
            width: "80px",
            height: "120px",
            textAlign: "center",
            fontFamily: "'Roboto Mono', monospace", // Add robotic-looking font
          }}
        >
          <p
            className="text-4xl font-bold"
            style={{ textShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            {timeLeft[unit]}
          </p>
          <span className="text-sm uppercase font-medium tracking-wide">{unit}</span>
        </div>
      ))}
    </div>
  );
};

export default TimeLeft;
