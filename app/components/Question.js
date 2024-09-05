import React, { useRef, useEffect } from 'react';
import { josefin_sans, ubuntu_mono } from '@/app/ui/fonts';
import styles from './Question.module.css';

const Question = ({ question, options, onAnswer, questionStyle, optionButtonStyle, questionNum }) => {
    const questionRef = useRef(null);
    
    const handleAnswer = (modifiers, element) => {
        onAnswer(modifiers, element);
    };

    const letterEffect = (element) => { // this is stolen from Hyperplexed
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

    useEffect(() => {
        if (questionRef.current) {
            letterEffect(questionRef.current);
        }
    }, []);

    return (
        <div className={questionStyle}>
            <h3 ref={questionRef} data-value={question} className={`${styles.questionText} ${ubuntu_mono.className} antialiased`}>{question}</h3>
            <div className={styles.barContainer}>
                <div className={styles.barBase}></div>
                <div className={styles.barProgress} style={{ width: `${((questionNum - 1) / 11) * 100}%`}}></div>
            </div>
            {options.map((option, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <button onClick={() => handleAnswer(option.modifiers, questionRef.current)} className={`${styles.questionOption} ${optionButtonStyle} ${josefin_sans.className} antialiased`}>
                        {option.label}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Question;