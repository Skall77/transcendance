import { useEffect, useState } from 'react'
import './App.css'
import {Home, Menu, ProfilePage, Chat, PongGame} from './Pages/index'
import {Route, Routes, useNavigate} from 'react-router-dom'
import { getCookieValue } from './utils'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      console.log('Checking token...');
      const cookieToken = getCookieValue('token');
      if (!cookieToken) {
        console.log('SET FALSE');
        setIsLoggedIn(false);
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/42/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${cookieToken}`
        },
      });
      if (response.status === 400 || response.status === 401 || response.status === 403 || response.status === 404) {
        navigate('/');
        return;
      }
      const data = await response.json();
      if (data.error) {
        console.log('SET FALSE');
        setIsLoggedIn(false);
      } else {
        console.log('SET OK');
        setIsLoggedIn(true);
      }
      console.log('Token check complete');
    }

    checkToken();
  }, [navigate]) 

  return (
      <div>
        <Menu isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Profile' element={<ProfilePage/>}/>
          <Route path='/PongGame' element={<PongGame/>}/>
          <Route path='/Chat' element={<Chat/>}/>
        </Routes>
      </div>
  )
}

export default App