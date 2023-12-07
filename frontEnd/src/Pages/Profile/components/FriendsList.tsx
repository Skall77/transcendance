import React from 'react';
import '../style/FriendsList.css'

interface FriendsListProps {
  friends: { id: string; name: string;  profilePicture: string }[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  const numberOfFriends =friends.length
  return (
    <div className='friends-list-container'>
      <h3 className='friends-list-header'>Friends ({numberOfFriends})</h3>
      <ul className='friends-list'>
         {friends.slice(0, 6).map((friend) => (
          <li key={friend.id} className='friends-list-item'>
            <img src={friend.profilePicture} alt={`Profile of ${friend.name}`} className='friend-picture' />
            {friend.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;