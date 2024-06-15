import { useCallback, useEffect, useState } from 'react'
import './styles/Landing.css'
import '../components/TriesHistory/TriesHistory.css'
import UserDisplay from '../components/UserDisplay/UserDisplay';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo/Logo';

export default function Landing() {
  const navigate = useNavigate();

  function handleCreateGame() {
    navigate('/solo');
  }

  const handleJoinGame = useCallback(() => {
    console.log('Join game');
  }, []);

  return (
    <div className='view-container'>
      <Logo />
      <div className='menu'>
        <button type='button' name='create-game' id='create-game' onClick={handleCreateGame}>PARTIE SOLO</button>
        <button type='button' name='join-game' id='join-game' onClick={handleJoinGame}>MULTIJOUEUR</button>
        <UserDisplay />
      </div>
    </div>
  )
}
