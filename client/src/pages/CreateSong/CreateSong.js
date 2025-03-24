import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CreateSong.module.scss';
import api from '~/ultis/httpsRequest';
const cx = classNames.bind(styles);
function CreateSong() {
    const [name, setName] = useState('');
    const [composer, setComposer] = useState('');
    const [image_song, setImageSong] = useState('');
    const [url, setUrl] = useState('');
    const [duration, setDuration] = useState('');
    const [message, setMessage] = useState('');
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Gửi dữ liệu đến backend
        try {
            const fetchApi = async () => {
                const response = await api.post(
                    `artists/add-song/${id}`,
                    {
                        name,
                        composer,
                        image_song,
                        url,
                        duration,
                    },
                    {
                        withCredentials: true,
                    },
                );
                setMessage('User created successfully!');
                setComposer('');
                setName('');
                setImageSong('');
                setImageAlbum('');
                setUrl('');
                navigate('/admin/artist/artist-admin-show');
            };
            fetchApi();
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage('Error creating user');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h1>Create Song</h1>
            <form>
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
                <div>
                    <label>Duration sound:</label>
                    <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                </div>

                <button onClick={handleSubmit} type="submit">
                    Create Song
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateSong;
