import { Link } from "react-router-dom";
import './Menu.css';
import React, { useEffect, useState } from 'react';
import { getCookieValue } from "../../utils";

interface MenuProps {
    isLoggedIn: boolean;
}

export const Menu: React.FC<MenuProps> = ({isLoggedIn}) => {

    const [id, setId] = useState<number>(0);
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        if (token !== '')
            getId(token);
        const cookieToken = getCookieValue('token');
        if (cookieToken)
            setToken(cookieToken);
    }, [token]);

    async function getId(token: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me/id`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });
            const data = await response.json();
            if (data)
                setId(data.id);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <nav className="nav">
        <ul>
            <Link to="/" className="NavButton">Home</Link>
            <Link to="/pong" className="NavButton">Pong</Link>
            <Link to="/chat" className="NavButton">Chat</Link>
            <Link to={`/profile/${id}`} className="NavButton">Profile</Link>
            { !isLoggedIn ?
                <Link to="/login" className="NavButton" id="LoginButton">Login</Link> :
                <Link to="/" className="NavButton" id="LoginButton" onClick={() => {
                    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/42/logout`, "_self"); }}>Logout</Link>}
        </ul>
        </nav>
    );
}