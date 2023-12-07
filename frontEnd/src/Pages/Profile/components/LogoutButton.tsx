import React from 'react';
import '../style/LogoutButton.css'

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <button onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;