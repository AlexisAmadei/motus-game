import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App.jsx'
import './styles/index.css'
import GameSolo from './view/GameSolo.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/solo' element={<GameSolo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
