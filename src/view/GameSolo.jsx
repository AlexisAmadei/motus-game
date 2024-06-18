import React, { useState, useEffect, useCallback} from 'react'
import Logo from '../components/Logo/Logo'
import './styles/GameSolo.css';
import GameGrid from '../components/GameGrid/GameGrid';
import secretWords from '../utils/secretWords';
import Keyboard from '../components/Keyboard/Keyboard';

export default function GameSolo() {
  const gameId = "id" + Math.random().toString(16).slice(2);
  const [gameData, setGameData] = useState({
    level: 1,
    words: []
  });

  const fetchWords = useCallback(async () => {
    const words = await secretWords();
    console.debug('words fetched');
    setGameData(prevGameData => ({
      ...prevGameData,
      words,
    }));
  }, []);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  const storeGameData = useCallback(() => {
    const data = {
      gameId: gameId,
      level: gameData.level,
      words: gameData.words,
    }
    localStorage.setItem('gameData', JSON.stringify(data));
  }, [gameId, gameData]);

  useEffect(() => {
    storeGameData();
  }, [storeGameData]);

  return (
    <div className='game-solo'>
      <Logo />
      <GameGrid gameData={gameData} />
      <Keyboard />
    </div>
  )
}
