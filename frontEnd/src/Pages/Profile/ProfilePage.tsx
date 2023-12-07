import React from 'react';
// import BasicInfo from './components/BasicInfo';
// import AccountDetails from './components/AccountDetails';
import FriendsList from './components/FriendsList';
import LogoutButton from './components/LogoutButton';
import pepitoAvatar from "./pepito.png"
import ProfileDetails from './components/ProfileDetails';

interface UserProfile {
  fullName: string;
  profilePicture: string;
  bio: string;
  username: string;
  email: string;
  accountCreationDate: string;
  friends: { id: string; name: string; profilePicture: string}[];
}

interface ProfilePageProps {
  user?: UserProfile
}

const hardcodedUser: UserProfile = {
  fullName: "Pepito Poquitos",
  profilePicture: pepitoAvatar,
  bio: "Pepito Poquitos est la mascotte des gateaux Pepito.",
  username: "AyePepito",
  email: "pepito@gmail.com",
  accountCreationDate: "2023-01-01",
  friends: [
    { id: "1", name: "Friend 1", profilePicture: pepitoAvatar },
    { id: "2", name: "Friend 2", profilePicture: pepitoAvatar },
    { id: "3", name: "Friend 3", profilePicture: pepitoAvatar },
    { id: "4", name: "Friend 4", profilePicture: pepitoAvatar },
    { id: "5", name: "Friend 5", profilePicture: pepitoAvatar },
    { id: "6", name: "Friend 6", profilePicture: pepitoAvatar },
    { id: "7", name: "Friend 7", profilePicture: pepitoAvatar },
    { id: "8", name: "Friend 8", profilePicture: pepitoAvatar },
    { id: "9", name: "Friend 9", profilePicture: pepitoAvatar },
    { id: "10", name: "Friend 10", profilePicture: pepitoAvatar },
  ],
};

export const ProfilePage: React.FC<ProfilePageProps> = ({ user = hardcodedUser}) => {
  if (!user) {
    return (
    <div>
    <p>To see profile details, please log in !</p>
    <button onClick={() => console.log("Log in logic here")}>Log In</button>
    </div>
    )
  }

  const handleLogout = () => {
    // Logique pour déconnexion ici
  };

  return (
    <div>
      {/* <BasicInfo
        fullName={user.fullName}
        profilePicture={user.profilePicture}
        bio={user.bio}
      />
      <AccountDetails
        username={user.username}
        email={user.email}
        accountCreationDate={user.accountCreationDate}
      /> */}
      <ProfileDetails
        fullName={user.fullName}
        profilePicture={user.profilePicture}
        bio={user.bio}
        username={user.username}
        email={user.email}
        accountCreationDate={user.accountCreationDate}
        />        
      <FriendsList friends={user.friends} />
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};

export default ProfilePage;