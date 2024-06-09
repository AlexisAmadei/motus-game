import React, { useEffect, useState } from 'react'
import './UserDisplay.css'
import EditIcon from '@mui/icons-material/Edit';
import { getCookie } from '../../utils/cookies';
import { retrieveDbUser, updatesDbUser } from '../../utils/users';

export default function UserDisplay() {
  const [pseudoInput, setPseudoInput ] = useState(false);
  const [username, setUsername] = useState('anonymous');

  const handlePseudoChange = (e) => {
    setUsername(e.target.value);
  }

  const updateUsername = () => {
    localStorage.setItem('username', username);
    updatesDbUser(username, getCookie('userId'));
    setPseudoInput(false);
  }

  useEffect(() => {
    if (localStorage.getItem('username')) {
      setUsername(localStorage.getItem('username'));
    } else {
      retrieveDbUser(getCookie('userId')).then((data) => {
        setUsername(data);
      });
    }
  }, []);

  return (
    <div className='user-display'>
      {pseudoInput && (
        <div className='pseudo-input'>
          <input type='text' value={username} onChange={handlePseudoChange} />
          <button type='button' onClick={updateUsername}>OK</button>
        </div>
      )}
      {!pseudoInput && username && (
        <div className='user-display' onClick={() => setPseudoInput(true)}>
          <p>Pseudo: {username}</p>
          <EditIcon />
        </div>
      )}
    </div>
  )
}
