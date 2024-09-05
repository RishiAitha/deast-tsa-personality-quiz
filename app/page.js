"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './globals.css';
import stylesHP from './HomePage.module.css';
import { josefin_sans, ubuntu_mono } from '@/app/ui/fonts';

const HomePage = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const router = useRouter();
  const titleRef = useRef(null);

  const handleStartQuiz = () => {
    setTimeout(() => {
      setIsQuizStarted(true);
      router.push('/quiz');
    }, 500)
  };

  const letterEffect = (element) => { // this is stolen from Hyperplexed
    let iterations = 0;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const interval = setInterval(() => {
      element.innerText = element.innerText.split("").map((letter, index) => {
        if (index < iterations || letter === " ") {
          return element.dataset.value[index];
        }
        
        return letters[Math.floor(Math.random() * 26)]
      }).join("");
      if (iterations > element.dataset.value.length) {
        clearInterval(interval);
      }

      iterations += 1;
    }, 50)
  };

  useEffect(() => {
    if (titleRef.current) {
      letterEffect(titleRef.current);
    }
  }, []);

  return (
    <div>
      {!isQuizStarted ? (
        <div className={stylesHP.container}>
          <h1 ref={titleRef} className={`${stylesHP.title} ${ubuntu_mono.className} antialiased`} data-value="TSA EVENT SELECTION PERSONALITY QUIZ">TSA EVENT SELECTION PERSONALITY QUIZ</h1>
          <button className={`${stylesHP.startButton} ${josefin_sans.className} antialiased`} onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      ) : (
        <div>
          <p>Redirecting to the quiz...</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
