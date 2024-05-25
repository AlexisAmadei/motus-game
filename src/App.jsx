import React, { useCallback, useEffect, useState } from 'react'
import secretWords from './utils/secretWords'
import GameGrid from './components/GameGrid'
import './styles/App.css'

export default function App() {
  const gameId = "id" + Math.random().toString(16).slice(2);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameData, setGameData] = useState({
    level: 1,
    words: [],
  })

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

  const handleGameStart = useCallback(() => {
    storeGameData();
    setGameStarted(true);
  }, [storeGameData]);

  return (
    <div className='app-wrapper'>
      {!gameStarted && (
        <div className='pre-game'>
          <button type='button' name='start-game' id='start-game' onClick={handleGameStart}>Start game</button>
        </div>
      )}
      {gameStarted && (
        <div className='game-started'>
          <GameGrid gameData={gameData} />
        </div>
      )}
    </div>
  )
}
