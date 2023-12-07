import React from 'react';
import '../style/BasicInfo.css'

interface BasicInfoProps {
  fullName: string;
  profilePicture: string;
  bio: string;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ fullName, profilePicture, bio }) => {
  return (
    <div className='basic-info-container'>
      <img src={profilePicture} alt="Profile" className='basic-info-image'/>
      <h2>{fullName}</h2>
      <p>{bio}</p>
    </div>
  );
};

export default BasicInfo;