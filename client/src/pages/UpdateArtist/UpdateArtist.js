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
    const [role, setRole] = useState(data.role);
    const [genre, setGenre] = useState(data.genre);
    const [imageArtist, setImageArtist] = useState(data.imageArtist);
    const [imageAlbum, setImageAblum] = useState(data.imageAlbum);
    const navigate = useNavigate();

    const handleUpdate = useCallback((e) => {
        e.preventDefault();
        try {
            const fetchApi = async () => {
                const res = await api.put(
                    `artists/update-artist/${data._id}`,
                    {
                        name,
                        role,
                        genre,
                        imageArtist,
                        imageAlbum,
                    },
                    {
                        withCredentials: 'include', // Gửi cookie session
                    },
                );
                setName('');
                setRole('');
                setGenre('');
                setImageArtist('');
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
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    type="text"
                    id="rol"
                    name="rol"
                    placeholder={data.rol}
                />
            </div>
            <div className={cx('item')}>
                <label htmlFor="name">Image Artist:</label>
                <input
                    onChange={(e) => setImageArtist(e.target.value)}
                    value={imageArtist}
                    type="text"
                    id="imageArtist"
                    name="imageArtist"
                    placeholder={data.imageArtist}
                />
            </div>
            <div className={cx('item')}>
                <label htmlFor="name">Image Album:</label>
                <input
                    onChange={(e) => setImageAblum(e.target.value)}
                    value={imageAlbum}
                    type="text"
                    id="imageArtist"
                    name="imageArtist"
                    placeholder={data.imageAlbum}
                />
            </div>
            <button onClick={(e) => handleUpdate(e)}>Cập nhật</button>
        </form>
    );
}

export default UpdateArtist;
