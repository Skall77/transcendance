import { ChangeEvent, FormEvent, useEffect, useState, ChangeEventHandler } from 'react';
import './Profile.css';
import { getCookieValue } from '../../utils';
import { useParams } from 'react-router-dom';



export const Profile = () => {
    const { id } = useParams();
    console.log(id); 
    const [username, setUsername] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [newUsername, setNewUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    useEffect(() => {
        if (token !== '') {
            getUsername(token);
            getAvatar(token);
        } 
        const cookieToken = getCookieValue('token');
        if (cookieToken)
            setToken(cookieToken);
    }, [token])

    async function getUsername(token: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me/username`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });
            const data = await response.json();
            if (data)
                setUsername(data.username);
        } catch (error) {
            console.log(error);
        }
    }

    async function setUsernameHandler(username: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me/username`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    username: username
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update username');
            }
            const data = await response.json();
            if (data.username)
                setUsername(data.username);
        } catch (error) {
            console.log(error);
        }
    }

    async function getAvatar(token: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me/avatar`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });
            const data = await response.json();
            if (data)
                setAvatar(data.avatarUrl);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUsername(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (newUsername.length < 3)
                return;
            setUsernameHandler(newUsername);
            setUsername(newUsername);
            setNewUsername('');
    }

    const handleUpload: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent) => {
        event.preventDefault();
		const target = event.target as HTMLInputElement;

		if (target && target.files && target.files.length > 0) {
			const file = target.files[0];
			setProfilePicture(file);
			const formData = new FormData();
			formData.append('file', file);

            const uploadUrl = `${import.meta.env.VITE_BACKEND_URL}/files/${username}/upload`;

			fetch(uploadUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error uploading file: ${response.statusText}`);
                }
        
                // File uploaded successfully, update avatar URL
                const avatarUrl = `${import.meta.env.VITE_BACKEND_URL}/users/me/avatar`;
                return fetch(avatarUrl, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    body: JSON.stringify({ token, username }),
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error updating avatar URL: ${response.statusText}`);
                }
        
                // Both requests succeeded
                // console.log('File uploaded successfully');
                // console.log('Updating avatar URL...');
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        

			
		}
	};

    const handleFormSubmit = async (e) => {
        const selectedFile = e.target.files[0];
        setProfilePicture(selectedFile);
    }

    useEffect(() => {
        if (token !== '' && username !== '') {
            const fetchData = async () => {
                getProfilePicture();
            };
            fetchData();
        }
        const cookieToken = getCookieValue('token');
        if (cookieToken)
            setToken(cookieToken);
    }, [token, username]);

    async function getProfilePicture() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/files/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        });
        if (response.status === 404) {
            getAvatar(token);
            return;
        }
        const blob = await response.blob();
        const newFile = new File([blob], 'profilePicture', { type: 'image/png' });
        setProfilePicture(newFile);
    }



    
    return (
        <div className='ProfileContainer'>
        <div className="Profile">
            <h2 className='ProfileTitle'>Profile</h2>
            <div>
                <img src={avatar} alt="Description of the image" className="smallIcon" />
            </div>
            <span className='ProfileText'>Username: </span><span className='ProfileAnswerText'>{username}</span>
            <hr></hr>
            <form className='ProfileForm' onSubmit={handleSubmit}>
                <label className='ProfileText'>Change Username: </label>
                <input className='UsernameInput' type="text" value={newUsername} onChange={handleUsernameChange} placeholder="Username must have at least 3 characters" />
                <hr></hr>
                <button className='SubmitButton' type="submit">Submit Change</button>
            </form>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Select Avatar:
                    <input type="file" accept="image/*" onChange={handleUpload} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
        
    </div>
    );
};