import React, { useEffect, useState } from 'react'
import secretWords from './utils/secretWords'
import GameGrid from './components/GameGrid'

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [words, setWords] = useState([]);
  const [gameData, setGameData] = useState({
    level: 1,
    word: '',
  })

  async function fetcWords() {
    setWords(await secretWords());
  }

  useEffect(() => {
    fetcWords();
  }, []);

  function handleGameStart() {
    setGameData({
      ...gameData,
      word: words[gameData.level - 1],
    })
    setGameStarted(true);
  }

  return (
    <div className='app-wrapper'>
      {!gameStarted && (
        <div className='pre-game'>
          <h1>debug</h1>
          <pre>{JSON.stringify(words, null, 2)}</pre>
          <p>Is game started: {`${gameStarted}`}</p>
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
