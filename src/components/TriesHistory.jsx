import React, { useEffect, useState } from 'react'
import './TriesHistory.css';

export default function TriesHistory({ triesArray }) {
  const gameData = JSON.parse(localStorage.getItem('gameData'));
  const secretWords = gameData.words;
  const level = gameData.level;
  const [validationArray, setValidationArray] = useState([]);

  function validateLetter(letter) {
    if (secretWords[level - 1].includes(letter)) {
      return true;
    }
    return false;
  }

  function wordValidation(word) {
    const newValidationArray = [];
    word.split('').forEach(letter => {
      if (letter === word[0]) {
        newValidationArray.push('correct');
      } else if (validateLetter(letter)) {
        newValidationArray.push('misplaced');
      } else {
        newValidationArray.push('incorrect');
      }
    });
    setValidationArray(newValidationArray);
  }

  useEffect(() => {
    if (triesArray.length > 0) {
      wordValidation(triesArray[triesArray.length - 1]);
    }
  }, [triesArray]);

  return (
    <div className='history'>
      {triesArray.map((word, index) => (
        <div className='try'>
          {word.split('').map((letter, index) => (
            <span key={index} className={validationArray[index]}>{letter.toUpperCase()}</span>
          ))}
        </div>
      ))}
    </div>
  );
}