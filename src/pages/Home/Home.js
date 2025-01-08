// client/src/App.js
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Home.module.scss';
import Protected from '~/layouts/components/Protected';

const cx = classNames.bind(styles);
function Home() {
    const [artists, getArists] = useState([]);
    useEffect(() => {
        const fetchArtists = async function () {
            try {
                const res = await axios.get('http://localhost:3000/artists');
                getArists(res.data);
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
                        <Protected />
                    </div>
                );
            })}
        </div>
    );
}

export default Home;
