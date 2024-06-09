import './styles/App.css'
import React, { useEffect } from 'react'

import Landing from './view/Landing';
import uniqueIds from './utils/uniqueIds';

import { getCookie, storeCookie } from './utils/cookies';
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

export default function App() {
  async function storeIdInDb() {
    const userId = getCookie('userId');
    await setDoc(doc(db, 'users', userId), {
      username: 'anonymous',
    });
  }

  useEffect(() => {
    if (!getCookie('userId')) {
      const userId = uniqueIds();
      storeCookie('userId', userId);
      storeIdInDb();
      console.log('User id cookie set');
    }
  }, []);

  return (
    <div className='app-container'>
      <Landing />
    </div>
  )
}
