import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './AdminShowArtist.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function AdminShowArtist() {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();

    const handleUpdate = (data) => {
        navigate(`/admin/artist/artist-update/${data._id}`, { state: data });
    };
    const hanldeDeleted = (id) => {
        const fetchArtists = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.delete(`http://localhost:3000/artists/delete-artist/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const updatedArtists = artists.filter((artist) => artist._id !== id);
                setArtists(updatedArtists);
                alert('Deleted successfully');
            } catch (err) {
                console.log(err);
            }
        };
        fetchArtists();
    };
    const handleDestroy = (id) => {
        const fetchArtists = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.delete(`http://localhost:3000/artists/destroy-artist/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const updatedArtists = artists.filter((artist) => artist._id !== id);
                setArtists(updatedArtists);
                alert('Destroy successfully');
            } catch (err) {
                console.log(err);
            }
        };
        fetchArtists();
    };

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await axios.get('http://localhost:3000/artists');
                setArtists(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchArtists();
    }, []);

    return (
        <table className={cx('wrapper', 'table')}>
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Artists</th>
                    <th colSpan="1" scope="col">
                        Handle
                    </th>
                </tr>
            </thead>
            <tbody>
                {artists.map((artist, index) => (
                    <tr key={index}>
                        <th scope="row">{artist._id}</th>
                        <td>{artist.name}</td>
                        <td>{artist.genre}</td>
                        <td>{artist.artist}</td>
                        <td className={cx('btn-wrapper')}>
                            <Link to={`/admin/artist/song-create/${artist._id}`} className={cx('btn', 'bg-primary')}>
                                Thêm Song
                            </Link>
                            <div onClick={() => handleUpdate(artist)} className={cx('btn', 'bg-info')}>
                                Sửa
                            </div>
                            <div onClick={() => hanldeDeleted(artist._id)} className={cx('btn', 'bg-warning')}>
                                Xoá
                            </div>
                            <div onClick={() => handleDestroy(artist._id)} className={cx('btn', 'bg-danger')}>
                                Xoá vĩnh viễn
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AdminShowArtist;
