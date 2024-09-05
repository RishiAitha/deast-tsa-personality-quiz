"use client";

import React, { useState } from 'react';
import styles from '../globals.css'
import stylesQP from './QuizPage.module.css';
import Question from '../components/Question.js';
import Graph from '../components/Graph.js';
import { josefin_sans, ubuntu_mono } from '@/app/ui/fonts';

const questions = [
  {
    id: 1,
    question: "How do you prefer to spend a rainy day?",
    options: [
      { label: "Sketching ideas for a new invention", modifiers: [0, 0, 0, 0, 2, 1, -1, 0, 0, 0] },
      { label: "Learning a new programming language", modifiers: [0, 0, 0, 3, 0, 0, 0, -1, 0, 0] },
      { label: "Experimenting with a science kit", modifiers: [0, 0, 0, -1, 1, 0, 0, 2, 0, 0] },
      { label: "Creating digital artwork", modifiers: [0, 0, 0, 0, 0, 3, 2, 0, 0, 0] },
      { label: "Building a model or robot", modifiers: [0, 0, 0, 0, 3, -1, 0, 0, 0, 0] },
    ]
  },
  {
    id: 2,
    question: "How much time are you willing to spend learning new content for your event?",
    options: [
      { label: "I am committed and ready to learn whatever I need!", modifiers: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I could see myself spending time learning new skills.", modifiers: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I'm not too sure if I'll have time to learn something very complex.", modifiers: [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I'd much rather stick to ideas that are easy to learn or skills I already know.", modifiers: [-2, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ]
  },
  {
    id: 3,
    question: "Which career would you find most fulfilling?",
    options: [
      { label: "Software developer working on innovative technologies", modifiers: [0, 0, 0, 3, 0, 0, -1, 1, 0, 0] },
      { label: "Mechanical engineer designing new machines", modifiers: [0, 0, 0, 0, 3, 0, -1, 0, 0, 0] },
      { label: "Digital artist creating visual content", modifiers: [0, 0, 0, 0, 0, 3, 2, -1, 0, 0] },
      { label: "Environmental scientist researching climate change", modifiers: [0, 0, 0, -1, 0, 0, 0, 3, 0, 0] },
      { label: "Video game designer blending art and code", modifiers: [0, 0, 0, 2, 0, 2, 1, 0, 0, 0] },
    ]
  },
  {
    id: 4,
    question: "Are you willing to spend money on your event?",
    options: [
      { label: "Yes, I am okay with a large budget.", modifiers: [0, 2, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I'm okay spending money, but I don't want anything too costly.", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "Spending money is something I really want to avoid.", modifiers: [0, -2, 0, 0, 0, 0, 0, 0, 0, 0] },
    ]
  },
  {
    id: 5,
    question: "What sounds like a fun weekend activity?",
    options: [
      { label: "Coding a new app with friends", modifiers: [0, 0, 0, 3, 0, 0, 1, -1, 0, 0] },
      { label: "Tinkering with electronics and circuits", modifiers: [0, 0, 0, 1, 3, -1, 0, 0, 0, 0] },
      { label: "Creating a mural or street art", modifiers: [0, 0, 0, -2, 0, 3, 2, 0, 0, 0] },
      { label: "Analyzing data from a personal research project", modifiers: [0, 0, 0, -1, 0, 0, 0, 3, 0, 0] },
    ]
  },
  {
    id: 6,
    question: "How comfortable are you with complex problems and solutions?",
    options: [
      { label: "I'm excited for a real challenge!", modifiers: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I'm pretty confident that I can handle something difficult.", modifiers: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I prefer something a little more familiar.", modifiers: [-2, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I definitely don't want to do anything too complicated.", modifiers: [-3, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ]
  },
  {
    id: 7,
    question: "What’s your favorite way to approach a new idea?",
    options: [
      { label: "Writing out a detailed plan", modifiers: [0, 0, 0, -1, 1, 0, 2, 0, 0, 0] },
      { label: "Prototyping with available materials", modifiers: [0, 0, 0, 0, 3, 0, -1, 0, 0, 0] },
      { label: "Developing a code-based solution", modifiers: [0, 0, 0, 3, 0, 0, 0, -1, 0, 0] },
      { label: "Sketching concepts or wireframes", modifiers: [0, 0, 0, 0, 0, 3, 0, -1, 0, 0] },
      { label: "Conducting initial research to validate the idea", modifiers: [0, 0, 0, -1, 0, 0, 0, 3, 0, 0] },
    ]
  },
  {
    id: 8,
    question: "How popular of an event would you prefer to participate in?",
    options: [
      { label: "I want to dive into something with lots of competition!", modifiers: [0, 0, 2, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I'm okay with relatively popular events, but nothing too competitive.", modifiers: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I'd like to focus on events that less people participate in.", modifiers: [0, 0, -1, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I want to attack the more niche events as much as possible.", modifiers: [0, 0, -2, 0, 0, 0, 0, 0, 0, 0] },
    ]
  },
  {
    id: 9,
    question: "Which type of project would you enjoy the most?",
    options: [
      { label: "Developing an AI tool", modifiers: [0, 0, 0, 3, 0, 0, -1, 2, 0, 0] },
      { label: "Designing a product prototype", modifiers: [0, 0, 0, 0, 2, 1, 0, -1, 0, 0] },
      { label: "Filming and editing a documentary", modifiers: [0, 0, 0, -1, 0, 0, 3, 2, 0, 0] },
      { label: "Conducting a chemistry experiment", modifiers: [0, 0, 0, 0, 0, 0, -1, 3, 0, 0] },
    ]
  },
  {
    id: 10,
    question: "If you are interested in engineering/robotics events (drone, dragster, etc.), how comfortable are you with a live race or contest?",
    options: [
      { label: "I'd love a high-stakes vehicle race or robot contest at the conference!", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, 2, 0] },
      { label: "I really want to avoid any kind of live race or competition for my engineering/robotics events.", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, -2, 0] },
      { label: "I could go either way with my engineering events, this doesn't matter much to me.", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I don't plan on doing events where I create a vehicle or moving robot.", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, -2, 0] },
    ]
  },
  {
    id: 11,
    question: "Are you comfortable participating in PA ONLY events, which only exist at the Pennsylvania conference?",
    options: [
      { label: "I am willing to do events that only exist at the Pennsylvania conference.", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
      { label: "I am not willing to do PA ONLY events.", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ]
  },
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userProfile, setUserProfile] = useState([3, 3, 3, 3, 3, 3, 3, 3, 3, 0]);

  const handleAnswer = (modifiers, element) => {
    const updatedProfile = userProfile.map((val, index) => val + modifiers[index]);
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
      letterEffect(element);
    }, 500)
  };

  const letterEffect = (element) => {
    let iterations = 0;
    const letters = "abcdefghijklmnopqrstuvwxyz?!@#$%^&*()_-+=";
    const interval = setInterval(() => {
      element.innerText = element.innerText.split("").map((letter, index) => {
        if (index < iterations || letter === " ") {
          return element.dataset.value[index];
        }
        
        return letters[Math.floor(Math.random() * 41)]
      }).join("");
      if (iterations > element.dataset.value.length) {
        clearInterval(interval);
      }

      iterations += 3;
    }, 50)
  };

  const handleExit = () => {
    setTimeout(() => {
      window.location.href = '/result';
    }, 500);
  };

  return (
    <div className={stylesQP.container}>
      {currentQuestion < questions.length ? (
        <Question 
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          onAnswer={handleAnswer}
          questionStyle={stylesQP.question}
          optionButtonStyle={stylesQP.optionButton}
          questionNum={questions[currentQuestion].id}
        />
      ) : (
        <div>
          <h2 className={`${ stylesQP.completionText } ${ubuntu_mono.className} antialiased`}>Quiz Complete!</h2>
          <button className={`${stylesQP.resultsButton} ${josefin_sans.className} antialiased`} onClick={handleExit}>
            See Results
          </button>
        </div>
      )}
      <Graph
        profile={userProfile}
      />
    </div>
  );
};

export default QuizPage;
