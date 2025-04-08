import classNames from 'classnames/bind';
import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateArtist.module.scss';
import api from '~/ultis/httpsRequest';
const cx = classNames.bind(styles);
function CreateArtist() {
    const [artist, setArtist] = useState(' ');
    const [image_artist, setImageArtist] = useState(' ');
    const [imageProfileArtist, setImageProfileArtist] = useState('');
    const [name, setName] = useState(' ');
    const [genre, setGenre] = useState(' ');
    const [message, setMessage] = useState(' ');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Gửi dữ liệu đến backend
        try {
            const response = await api.post(
                'artists/add-artist',
                {
                    artist,
                    image_artist,
                    name,
                    genre,
                    imageProfileArtist,
                },
                {
                    withCredentials: true,
                },
            );
            setMessage('User created successfully!');
            setArtist('');
            setImageArtist('');
            setName('');
            setGenre('');
            setImageProfileArtist('');
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
                <div>
                    <label>Image Profile Artist:</label>
                    <input
                        type="text"
                        value={imageProfileArtist}
                        onChange={(e) => setImageProfileArtist(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Create Artist</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateArtist;
