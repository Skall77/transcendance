import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
    isLoggedIn: boolean;
  }


  const PrivateRoutes: React.FC<PrivateRouteProps> = ({ isLoggedIn }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isLoggedIn) {
        navigate('/login', { replace: true });
      }
    }, [isLoggedIn, navigate]);
  
    if (isLoggedIn) {
      return <Outlet />;
    }
  
    return;
  };
export default PrivateRoutes