import { useCallback, useEffect, useState } from 'react'
import './styles/Landing.css'
import '../components/TriesHistory/TriesHistory.css'
import secretWords from '../utils/secretWords'
import UserDisplay from '../components/UserDisplay/UserDisplay';

export default function Landing() {
  const gameId = "id" + Math.random().toString(16).slice(2);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameData, setGameData] = useState({
    level: 1,
    words: [],
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

  const handleCreateGame = useCallback(() => {
    storeGameData();
    setGameStarted(true);
  }, [storeGameData]);

  const handleJoinGame = useCallback(() => {
    console.log('Join game');
  }, []);

  return (
    <div className='view-container'>
      <div>
        <div className='logo-container'>
          <span className='correct'>T</span>
          <span>U</span>
          <span className='misplaced'>S</span>
          <span>M</span>
          <span className='correct'>O</span>
        </div>
        <div className='menu'>
          <button type='button' name='create-game' id='create-game' onClick={handleCreateGame}>START GAME</button>
          <button type='button' name='join-game' id='join-game' onClick={handleJoinGame}>JOIN GAME</button>
          <UserDisplay />
        </div>
      </div>
    </div>
  )
}
