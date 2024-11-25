import React, { useState, useEffect } from "react";
import classNames from "classnames";

const FadeInWrapper = ({ children }) => {
  const [isFadedIn, setIsFadedIn] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFadedIn(true), 100);
    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div
      className={classNames(
        "transition-opacity transform duration-1000 ease-in-out",
        isFadedIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      {children}
    </div>
  );
};

export default FadeInWrapper;
