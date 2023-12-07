import React from 'react';
import '../style/ProfileDetails.css'; // Assurez-vous que le chemin est correct

interface ProfileDetailsProps {
  fullName: string;
  profilePicture: string;
  bio: string;
  username: string;
  email: string;
  accountCreationDate: string;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  fullName,
  profilePicture,
  bio,
  username,
  email,
  accountCreationDate,
}) => {
  return (
    <div className='profile-details-container'>
        <img src={profilePicture} className='profile-picture' alt='Profile' />
      <div className='profile-info'>
        <h2>{fullName}</h2>
        <p>{bio}</p>
      </div>
      <div className='account-details'>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Account Created On: {accountCreationDate}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
