import React, { useCallback, useEffect, useState } from 'react'
import secretWords from './utils/secretWords'
import GameGrid from './components/GameGrid'

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

  // async function fetchWords() {
  //   setGameData({
  //     ...gameData,
  //     words: await secretWords().then(console.debug('words fetched')),
  //   });
  // }

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

  // function storeGameData() {
  //   const data = {
  //     gameId: gameId,
  //     level: gameData.level,
  //     words: gameData.words,
  //   }
  //   localStorage.setItem('gameData', JSON.stringify(data));
  // }

  const handleGameStart = useCallback(() => {
    storeGameData();
    setGameStarted(true);
  }, [storeGameData]);

  // function handleGameStart() {
  //   storeGameData();
  //   setGameStarted(true);
  // }

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
