import { useState } from 'react'

import './App.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { ImCancelCircle } from 'react-icons/im'
import { Route, Routes } from 'react-router-dom'
import Auth from '../Pages/Auth'
import Home from '../Pages/Home'
import AdminPage from '../Pages/AdminPage'
import User from '../Pages/User'







function App() {



  return (
    <>
      <Routes>
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register/>} />
        <Route path='/' element={<Home />} />
        <Route path='/admin-page' element={<AdminPage/>} />
            <Route path='/user-page' element={<User/>} />
      </Routes>

    </>
  )
}


export default App
