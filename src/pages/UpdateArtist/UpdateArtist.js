import axios from 'axios';
import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import style from './UpdateArtist.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '~/config/config';
import api from '~/ultis/httpsRequest';

const cx = classNames.bind(style);

function UpdateArtist() {
    const location = useLocation();
    const data = Object(location.state);
    const [name, setName] = useState(data.name);
    const [artist, setArtist] = useState(data.artist);
    const [genre, setGenre] = useState(data.genre);
    const [image_artist, setImage] = useState(data.image_artist);
    const [image_album, setImageAblum] = useState(data.image_album);
    const navigate = useNavigate();

    const handleUpdate = useCallback((e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const fetchApi = async () => {
                const res = await api.put(
                    `artists/update-artist/${data._id}`,
                    {
                        name,
                        artist,
                        genre,
                        image_artist,
                        image_album,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );
                setName('');
                setArtist('');
                setGenre('');
                setImage('');
                setImageAblum('');
                navigate(config.routes.adminShowArtist);
            };
            fetchApi();
        } catch (err) {
            console.log(err);
        }
    });

    return (
        <form method="PUT">
            <div className={cx('item')}>
                <label htmlFor="name">Tên nhạc singer:</label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    id="name"
                    name="name"
                    placeholder={data.name}
                />
            </div>

            <div className={cx('item')}>
                <label htmlFor="name">Genre:</label>
                <input
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                    type="text"
                    id="genre"
                    name="genre"
                    placeholder={data.genre}
                />
            </div>
            <div className={cx('item')}>
                <label htmlFor="name">Artist:</label>
                <input
                    onChange={(e) => setArtist(e.target.value)}
                    value={artist}
                    type="text"
                    id="artist"
                    name="artist"
                    placeholder={data.artist}
                />
            </div>
            <div className={cx('item')}>
                <label htmlFor="name">Image Artist:</label>
                <input
                    onChange={(e) => setImage(e.target.value)}
                    value={image_artist}
                    type="text"
                    id="image_artist"
                    name="image_artist"
                    placeholder={data.image_artist}
                />
            </div>
            <div className={cx('item')}>
                <label htmlFor="name">Image Album:</label>
                <input
                    onChange={(e) => setImageAblum(e.target.value)}
                    value={image_album}
                    type="text"
                    id="image_artist"
                    name="image_artist"
                    placeholder={data.image_album}
                />
            </div>
            <button onClick={(e) => handleUpdate(e)}>Cập nhật</button>
        </form>
    );
}

export default UpdateArtist;
