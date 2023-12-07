import { Footer, Header, Menu, Home, Pong, Chat, Profile, Login} from "./components/index";
import PrivateRoutes from "./components/PrivateRoute";
import { Route, Routes, useNavigate } from "react-router-dom";
import './styles/background.css'
import './styles/App.css'
import { useEffect, useState } from "react";
import { getCookieValue } from "./utils";


function App() {

  const [isloggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => { 
    checkToken() }, []);


  const checkToken = async () => {
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
      }
      else {
        console.log('SET OK');
        setIsLoggedIn(true);
      }   
    }

    
  return (
    <>
    <Header />
    <Menu isLoggedIn={isloggedIn} />
    <div className="background">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoutes isLoggedIn={isloggedIn} />}>
        <Route path="/pong" element={<Pong />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Route>
      <Route path="/Login" element={<Login />} />
    </Routes>
    <Footer />
    </div>
    </>
  );
}

export default App
