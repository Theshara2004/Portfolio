import React, { useState, useEffect } from 'react';

export default function Typewriter({ text, delay = 100 }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // If we haven't reached the end of the text, keep typing
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      
      // Cleanup the timeout to prevent memory leaks
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className="typewriter-text">
      {currentText}
      {/* The blinking cursor at the end */}
      <span className="cursor-blink">_</span>
    </span>
  );
}