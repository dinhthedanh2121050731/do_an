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
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        // Gửi dữ liệu đến backend
        try {
            const response = await axios.post(
                'http://localhost:3000/artists/add-artist',
                {
                    artist,
                    image_artist,
                    name,
                    genre,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setMessage('User created successfully!');
            setArtist('');
            setImageArtist('');
            setName('');
            setGenre();
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
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Genre</label>
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                </div>
                <div>
                    <label>Artist:</label>
                    <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />
                </div>
                <div>
                    <label>Image Artist:</label>
                    <input type="text" value={image_artist} onChange={(e) => setImageArtist(e.target.value)} required />
                </div>

                <button type="submit">Create Artist</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateArtist;
