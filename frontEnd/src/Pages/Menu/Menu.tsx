import {Link} from 'react-router-dom';
import './Menu.css'
import { BiGhost, BiHomeAlt, BiSolidChat} from "react-icons/bi";
import { useEffect, useState } from 'react';
import { getCookieValue } from '../../utils';


interface MenuProps {
    isLoggedIn: boolean;
}

export const Menu: React.FC<MenuProps> = ({isLoggedIn}) => {
    const[avatar, setAvatar] = useState<string>('https://i.pinimg.com/474x/66/d0/5c/66d05c72ee5ff5acd6e00c1934791452.jpg');
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        if (token !== '')
            getAvatar(token);
        const cookieToken = getCookieValue('token');
        if (cookieToken)
            setToken(cookieToken);
    }, [token]);

    async function getAvatar(token: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me/avatar`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });
            const data = await response.json();
            if (data)
                setAvatar(data.avatarUrl);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className='navbar'>
           <ul>
            <Link to="/"><BiHomeAlt/> Home</Link>
            <Link to="/PongGame" className='navbarleft'><BiGhost/> Game</Link>
            <Link to="/Chat"><BiSolidChat/> Chat</Link>
            <Link to="/Profile" className='NavButton'>
                <div className='avatar-container'>
                    <img src={avatar} alt="avatar" className='avatar'/>
                    <span className='online-dot'></span>
                </div>
                Profile</Link>
            { !isLoggedIn ?
                <Link to="/" className='NavButton' onClick={() => {
                    window.open(`${import.meta.env.VITE_API42_REDIRECTION_URL}`, '_self')
                }}>Login</Link> :
                <Link to="/" className='NavButton' onClick={() => {
                    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/42/logout`, "_self"); }}>Logout</Link>}
            
            </ul>
        </nav>
    );
}