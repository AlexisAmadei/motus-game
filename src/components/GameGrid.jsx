import { useEffect, useState } from 'react';
import './GameGrid.css'

const TRIES = 6;

export default function GameGrid({ gameData }) {
  const word = gameData.word;
  const level = gameData.level;
  const triesArray = new Array(TRIES);
  const [tries, setTries] = useState(0);

  function updateTriesArray(tryWord, index) {
    triesArray.splice(index, 1, tryWord);
    console.log(triesArray);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const letters = Array.from(formData.values()).join('');
    setTries(tries + 1);
    updateTriesArray(letters);
    e.target.reset();
    e.target[0].focus();
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
      <form onSubmit={handleSubmit}>
        {word.split('').map((letter, index) => (
          <div key={index} className='letter-box'>
            <input
              autoFocus={index === 0}
              type='text'
              className='letter-input'
              maxLength='1'
              name={`letter-${index}`}
              id={`letter-${index}`}
              placeholder='.'
              required
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={detectErasedLetter}
            />
          </div>
        ))}
        <button id='submitWord' type='submit'>Submit</button>
      </form>
    </div>
  )

}