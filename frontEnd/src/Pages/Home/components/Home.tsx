import Header from './Header';
import CustomButton from './Button';
import { BiPlay , BiSolidChat} from "react-icons/bi";

export const Home = () => {
    const handleClick = () => {
        alert('Bouton cliqued');
      }
      return (
          <div className='p-homepage'>
            <Header/>
            <CustomButton isLoggedIn={true} onClick={handleClick}><BiPlay/>PLAY</CustomButton>
            <p></p>
            <CustomButton isLoggedIn={true} onClick={handleClick}><BiSolidChat/>CHAT</CustomButton>
          </div>
      )
};

export default Home;