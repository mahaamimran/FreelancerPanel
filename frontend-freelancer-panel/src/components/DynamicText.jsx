import React, { useState, useEffect } from "react";

const DynamicText = ({ phrases, typingSpeed = 100, pauseTime = 2000 }) => {
  const [currentText, setCurrentText] = useState(""); // Current text being typed
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0); // Current phrase index
  const [isDeleting, setIsDeleting] = useState(false); // Whether the text is being deleted
  const [cursorVisible, setCursorVisible] = useState(true); // Blinking cursor state

  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500); // Cursor blinks every 500ms

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return; // Safeguard for empty phrases

    const currentPhrase = phrases[currentPhraseIndex];
    let typingTimeout;

    if (isDeleting) {
      // Deleting phase
      typingTimeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1)); // Remove one character
        if (currentText === "") {
          setIsDeleting(false); // Switch to typing phase
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length); // Move to the next phrase
        }
      }, typingSpeed / 2); // Faster deletion
    } else {
      // Typing phase
      typingTimeout = setTimeout(() => {
        setCurrentText((prev) => currentPhrase.slice(0, prev.length + 1)); // Add one character
        if (currentText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), pauseTime); // Pause before deleting
        }
      }, typingSpeed);
    }

    return () => clearTimeout(typingTimeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, pauseTime]);

  return (
    <div className="text-center text-white">
      <h2 className="text-5xl font-extrabold leading-relaxed">
        {currentText}
        <span className={`blinking-cursor ${cursorVisible ? "visible" : "invisible"}`}>
          |
        </span>
      </h2>
    </div>
  );
};

export default DynamicText;
