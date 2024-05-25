import { useCallback, useEffect, useState } from 'react';
import './GameGrid.css'

const TRIES = 6;

export default function GameGrid({ gameData }) {
  const [currentWord, setCurrentWord] = useState('');
  const [triesArray, setTriesArray] = useState([]);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    if (gameData) {
      setCurrentWord(gameData.words[gameData.level - 1]);
    }
  }, [gameData]);

  const checkWord = useCallback((tryWord) => {
    return tryWord === currentWord;
  }, [currentWord]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const letters = Array.from(formData.values()).join('');
    setTries(tries + 1);
    setTriesArray([...triesArray, gameData.words[gameData.level - 1][0] + letters]);
    e.target.reset();
    e.target[0].focus();
    if (checkWord(letters)) {
      alert('You won');
    }
  }

  const checkLetter = (letter) => {
    const regex = /^[A-Za-z]$/;
    return regex.test(letter);
  }

  function handleInputChange(e, index) {
    if (e.target.value) {
      if (!checkLetter(e.target.value)) {
        e.target.value = '';
        return;
      }
      const nextInput = document.getElementById(`letter-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  function detectErasedLetter(e) {
    if (e.key === 'Backspace' && e.target.value === '') {
      const previousInput = document.getElementById(e.target.id.replace(/\d/, (match) => parseInt(match) - 1));
      if (previousInput) {
        previousInput.focus();
      }
    }
  }

  useEffect(() => {
    if (tries === TRIES) {
      alert('You lost');
    }
  }, [tries]);

  return (
    <div className='game-grid'>
      <div className='tries'>
        {triesArray.map((tryWord) => (
          <div key={tryWord} className='try'>
            {tryWord.split('').map((letter, index) => (
              <span key={index} className='letter'>
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <span id='first-letter'>
          {currentWord[0]}
        </span>
        {currentWord.slice(1).split('').map((letter, index) => (
          <input
            key={index}
            type='text'
            id={`letter-${index}`}
            name={`letter-${index}`}
            maxLength='1'
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={detectErasedLetter}
            autoFocus={index === 0}
          />
        ))}
        <button id='submitWord' type='submit'>Submit</button>
      </form>
    </div>
  )

}