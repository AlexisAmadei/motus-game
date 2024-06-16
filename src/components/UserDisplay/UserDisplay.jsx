import React, { useEffect, useState } from 'react'
import './UserDisplay.css'
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { getCookie } from '../../utils/cookies';
import { retrieveDbUser, updatesDbUser } from '../../utils/users';

export default function UserDisplay() {
  const [pseudoInput, setPseudoInput ] = useState(false);
  const [username, setUsername] = useState('anonymous');
  const [errorDisplay, setErrorDisplay] = useState('');

  const handlePseudoChange = (e) => {
    setUsername(e.target.value);
  }

  const updateUsername = () => {
    if (!username) {
      setErrorDisplay('Pseudo vide');
      return;
    }
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
          <input title='user-input' type='text' value={username} onChange={handlePseudoChange} placeholder='invité' />
          <CheckIcon id='check' onClick={updateUsername} />
        </div>
      )}
      {!pseudoInput && username && (
        <div className='username' onClick={() => setPseudoInput(true)}>
          <p>Pseudo: {username}</p>
          <EditIcon />
        </div>
      )}
    </div>
  )
}
