import React, { useEffect, useState } from 'react'
import './TriesHistory.css';

export default function TriesHistory({ triesArray }) {
  const gameData = JSON.parse(localStorage.getItem('gameData'));
  const secretWords = gameData.words;
  const level = gameData.level;
  const [validationHistory, setValidationHistory] = useState([]);

  function wordValidation(word) {
    const newValidationArray = [];
    word.split('').forEach((letter, index) => {
      if (letter === secretWords[level - 1][index]) {
        newValidationArray.push('correct');
      } else if (secretWords[level - 1].includes(letter)) {
        newValidationArray.push('misplaced');
      } else {
        newValidationArray.push('incorrect');
      }
    });
    setValidationHistory(prevHistory => [...prevHistory, newValidationArray]);
  }

  useEffect(() => {
    if (triesArray.length > 0) {
      wordValidation(triesArray[triesArray.length - 1]);
    }
  }, [triesArray]);

  return (
    <div className='history'>
      {triesArray.map((word, index) => (
        <div className='try' key={index}>
          {word.split('').map((letter, letterIndex) => (
            validationHistory[index] && <span key={letterIndex} className={validationHistory[index][letterIndex]}>{letter.toUpperCase()}</span>
          ))}
        </div>
      ))}
    </div>
  );
}