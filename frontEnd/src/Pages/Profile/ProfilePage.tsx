import LogoutButton from './components/LogoutButton';
import ProfileDetails from './components/ProfileDetails';

export interface UserProfile {
  username: string;
  friends: { id: string; name: string; profilePicture: string}[];
  matches: {player1: string; score: string; player2: string}[];
}

export const ProfilePage = () => {
  return (
    <div>
      <ProfileDetails />
      <LogoutButton/>
    </div>
  );
};

export default ProfilePage;