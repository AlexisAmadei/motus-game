import { useCallback, useEffect, useState } from 'react';
import './GameGrid.css'
import TriesHistory from '../TriesHistory/TriesHistory';
import dicoJSON from '../../assets/dico.json';
import { useNavigate } from 'react-router-dom';

const TRIES = 6;

export default function GameGrid({ gameData }) {
  const [currentWord, setCurrentWord] = useState('');
  const [triesArray, setTriesArray] = useState([]);
  const [tries, setTries] = useState(0);
  const [submitError, setSubmitError] = useState('');
  const [isLost, setIsLost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData) {
      setCurrentWord(gameData.words[gameData.level - 1]);
    }
  }, [gameData]);

  const checkWord = useCallback((tryWord) => {
    return tryWord === currentWord;
  }, [currentWord]);

  function isWordValid(word) {
    console.log('verifying word', word);
    const lowerCaseWord = word.toLowerCase();
    return dicoJSON.includes(lowerCaseWord);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const letters = Array.from(formData.values()).join('');

    if (!isWordValid(gameData.words[gameData.level - 1][0] + letters)) {
      setSubmitError("Ce mot n'est pas dans la liste.");
      return;
    } else {
      setSubmitError(null);
    }
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
      e.target.value = e.target.value.toUpperCase();
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
      setSubmitError('Vous avez perdu.');
      setIsLost(true);
    }
  }, [tries]);

  useEffect(() => {
    if (submitError) {
      setTimeout(() => {
        setSubmitError('');
      }, 3000);
    }
  }, [submitError])

  return (
    <div className='game-grid'>
      <TriesHistory triesArray={triesArray} />
      {(!isLost && currentWord) && (
        <form onSubmit={handleSubmit}>
          <span id='first-letter'>
            {currentWord[0].toUpperCase()}
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
              autoComplete='off'
            />
          ))}
          <button id='submitWord' type='submit'>Submit</button>
        </form>
      )}
      <span id='submit-error'>{submitError}</span>
      {isLost && (
        <div>
          <button type='button' onClick={() => navigate('/')}>Retour au menu.</button>
        </div>
      )}
    </div>
  )
}