import { useState } from 'react'
import './styles/Landing.css'

export default function Landing() {
  function handleCreateGame() {
    // Implement me
  }
  function handleJoinGame() {
    // Implement me
  }
  return (
    <div className='view-container'>
      <div clas>
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
        </div>
      </div>
    </div>
  )
}
