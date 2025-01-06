import React, { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import "./Home.css";

const Home = () => {
  const [text, setText] = useState(""); // The text being displayed
  const [isDeleting, setIsDeleting] = useState(false); // Whether we are deleting or typing
  const [wordIndex, setWordIndex] = useState(0); // Index of the current word
  const [typingSpeed, setTypingSpeed] = useState(100); // Typing speed

  const words = ["Gamer", "Performer", "Beast"]; // Words to cycle through

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex % words.length]; // Get the current word

      if (isDeleting) {
        // If deleting, remove one character at a time
        setText((prev) => prev.slice(0, -1));
        setTypingSpeed(50); // Speed up deleting
      } else {
        // If typing, add one character at a time
        setText((prev) => currentWord.slice(0, prev.length + 1));
        setTypingSpeed(100); // Normal typing speed
      }

      // Switch between typing and deleting
      if (!isDeleting && text === currentWord) {
        // Pause after typing the full word
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        // Move to the next word after deleting
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout); // Cleanup timeout
  }, [text, isDeleting, wordIndex, typingSpeed]);

  return (
    <div className="banner-outer-container" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <AspectRatio objectFit="cover">
        <video autoPlay muted loop style={{ width: "100%", height: "auto" }}>
          <source src="../../Media/Video/vid.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </AspectRatio>

      {/* Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity here
          zIndex: 1,
        }}
      />

      {/* Content on top of the video */}
      <div className="heading-container" style={{ position: "absolute", top: "30%", left: "12%", zIndex: 2 }}>
        <h1
          className="heading-banner"
          style={{ color: "white", fontFamily: "'Great Vibes', cursive" }}
        >
          Unleash the <br />
          <span className="animated-text">{text}</span>
          {/* <span className="blinking-cursor">|</span> */}
          {" in You"}
        </h1>
      </div>
    </div>
  );
};

export default Home;
