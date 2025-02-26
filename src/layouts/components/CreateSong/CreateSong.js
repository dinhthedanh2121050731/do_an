import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './CreateSong.module.scss';
const cx = classNames.bind(styles);
function CreateSong() {
    const [name, setName] = useState('');
    const [composer, setComposer] = useState('');
    const [image_song, setImageSong] = useState('');
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');
    const params = useParams();
    const id = params.id;

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();

        // Gửi dữ liệu đến backend
        try {
            const response = await axios.post(
                `http://localhost:3000/artists/add-song/${id}`,
                {
                    name,
                    composer,
                    image_song,
                    url,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setMessage('User created successfully!');
            setComposer('');
            setName('');
            setImageSong('');
            setImageAlbum('');
            setUrl('');
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage('Error creating user');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h1>Create Song</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Composer:</label>
                    <input type="text" value={composer} onChange={(e) => setComposer(e.target.value)} required />
                </div>
                <div>
                    <label>Image song:</label>
                    <input type="text" value={image_song} onChange={(e) => setImageSong(e.target.value)} required />
                </div>
                <div>
                    <label>Url sound:</label>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
                </div>

                <button type="submit">Create Song</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateSong;
