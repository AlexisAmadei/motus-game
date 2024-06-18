import { useEffect, useState } from 'react'
import './TriesHistory.css';

export default function TriesHistory({ triesArray }) {
  const gameData = JSON.parse(localStorage.getItem('gameData'));
  const secretWords = gameData.words;
  const level = gameData.level;
  const [validationHistory, setValidationHistory] = useState([]);
  const [keyboardValidation, setKeyboardValidation] = useState({});

  function wordValidation(word) {
    const newValidationArray = [];
    word.split('').forEach((letter, index) => {
      if (letter === secretWords[level - 1][index]) {
        newValidationArray.push('correct');
        setKeyboardValidation(prevState => ({ ...prevState, [letter]: 'correct' }));
      } else if (secretWords[level - 1].includes(letter)) {
        newValidationArray.push('misplaced');
        setKeyboardValidation(prevState => ({ ...prevState, [letter]: 'misplaced' }));
      } else {
        newValidationArray.push('incorrect');
        setKeyboardValidation(prevState => ({ ...prevState, [letter]: 'incorrect' }));
      }
    });
    localStorage.setItem('keyboardValidation', JSON.stringify(keyboardValidation));
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