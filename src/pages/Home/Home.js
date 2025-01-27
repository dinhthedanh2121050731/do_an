// client/src/App.js
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import axios from 'axios';
import styles from './Home.module.scss';
import SectionArtist from '~/layouts/components/SectionArtist/SectionArtist';

const cx = classNames.bind(styles);
function Home() {
    const [artists, getArists] = useState([]);
    const [rapper, getRapper] = useState([]);
    const [singer, getSinger] = useState([]);
    useEffect(() => {
        const fetchArtists = async () => {
            const token = localStorage.getItem('token');
            try {
                const responseArtists = await axios.get('http://localhost:3000/artists');
                const responseRapper = await axios.get('http://localhost:3000/artists/rapper');
                const responseSinger = await axios.get('http://localhost:3000/artists/singer');
                getArists(responseArtists.data);
                getRapper(responseRapper.data);
                getSinger(responseSinger.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchArtists();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <SectionArtist bio text="Nghệ sĩ phổ biến" dataUser={artists} />
            <SectionArtist noBorderImg text="Rapper nổi bật" dataUser={rapper} />
            <SectionArtist text="Ca sĩ nổi bật" dataUser={singer} />
        </div>
    );
}

export default Home;
