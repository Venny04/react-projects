import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login,Home } from './pages'
import { UserContext } from './contexts/UserContext'

const App = () => {
  const { userAuth } = useContext(UserContext)
  return (
    <section className='container'>
      <BrowserRouter>
          <Routes>
            <Route path='/' index element={userAuth?<Home />:<Login />} />
            <Route path='/login' index element={userAuth ?<Home />:<Login />} />
          </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App