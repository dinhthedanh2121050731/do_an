import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CreateArtist.module.scss';
const cx = classNames.bind(styles);
function CreateArtist() {
    const [artist, setArtist] = useState('');
    const [image_artist, setImageArtist] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gửi dữ liệu đến backend
        try {
            const response = await axios.post('http://localhost:3000/artists/add-artist', {
                artist,
                image_artist,
            });
            setMessage('User created successfully!');
            setArtist('');
            setImageArtist('');
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage('Error creating user');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h1>Create Artist</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Artist:</label>
                    <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />
                </div>
                <div>
                    <label>image_artist:</label>
                    <input type="text" value={image_artist} onChange={(e) => setImageArtist(e.target.value)} required />
                </div>

                <button type="submit">Create Artist</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateArtist;
