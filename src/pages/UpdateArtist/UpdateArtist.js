import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './UpdateArtist.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import config from '~/config/config';

const cx = classNames.bind(style);

function UpdateArtist() {
    const location = useLocation();
    const data = Object(location.state);
    const [name, setName] = useState(data.name);
    const [artist, setArtist] = useState(data.artist);
    const [genre, setGenre] = useState(data.genre);
    const [image, setImage] = useState(data.image_artist);

    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const fetchApi = async () => {
                const res = await axios.put(
                    `http://localhost:3000/artists/update-artist/${data._id}`,
                    {
                        name,
                        artist,
                        genre,
                        image,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );
                setName('');
                setArtist('');
                setGenre('');
                setImage('');
                navigate(config.routes.adminShowArtist);
            };
            fetchApi();
        } catch (err) {
            console.log(err);
        }
    };

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
                <label htmlFor="name">Image:</label>
                <input
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                    type="text"
                    id="image_artist"
                    name="image_artist"
                    placeholder={data.image_artist}
                />
            </div>
            <button onClick={(e) => handleUpdate(e)}>Cập nhật</button>
        </form>
    );
}

export default UpdateArtist;
