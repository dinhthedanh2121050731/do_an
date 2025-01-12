// client/src/App.js
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import axios from 'axios';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);
function Home() {
    const [artists, getArists] = useState([]);
    useEffect(() => {
        const fetchArtists = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/artists', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                getArists(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchArtists();
    }, []);
    return (
        <div className={cx('wrapper')}>
            All artist
            {artists.map((artist, index) => {
                const artistId = `/song-create/${artist._id}`;
                return (
                    <div key={index}>
                        <a href={artistId}>{artist.artist}</a>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;
