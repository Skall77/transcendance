import '../style/Header.css'
import logo from '../style/pong.png'

export const Header = () => {
  const title:string = "Welcome to Pong game !";
  return (
    <header className='header_style'>
      <img src={logo} alt="Pong Game" className='header-img'/>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;

