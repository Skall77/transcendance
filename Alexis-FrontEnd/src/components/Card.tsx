import loginPic from '../assets/password_9482478.png'
import '../styles/Card.css'

export const Card = () => {
    return(
        <div className='cardContainer'>
            <a onClick={() => {
                window.open(`${import.meta.env.VITE_API42_REDIRECTION_URL}`, '_self')
            }}>
            <div className="card">
                <img className="cardImage" alt="login icon by juicy_fish" src={loginPic}></img>
                <h2 className='cardTitle'>Login</h2>
                <p className='cardText'>Log In using your 42 credentials with the 42 API</p>
            </div>
            </a>
        </div>
    )
}