import React from 'react';
import '../style/AccountDetails.css'

interface AccountDetailsProps {
  username: string;
  email: string;
  accountCreationDate: string;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ username, email, accountCreationDate }) => {
  return (
    <div>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Account Created On: {accountCreationDate}</p>
    </div>
  );
};

export default AccountDetails;