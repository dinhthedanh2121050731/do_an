import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import style from './ProfileArtist.module.scss';
import api from '~/ultis/httpsRequest';
import Playlist from '~/components/Playlist';

const cx = classNames.bind(style);
function ProfileArtist() {
    const { id } = useParams();
    const [dataArtist, setDataArtist] = useState([]);
    const [dataSongs, setDataSongs] = useState([]);

    useEffect(() => {
        const fetApi = async () => {
            try {
                const resArtist = await api.get(`artists/get-artist-popular/${id}`);
                const resSongs = await api.get(`songs/artist/${id}`);
                setDataArtist(resArtist.data.artist);
                setDataSongs(resSongs.data.songs);
            } catch (err) {
                console.error(err);
            }
        };
        fetApi();
    }, [id]);

    return <Playlist dataArtist={dataArtist} dataSongs={dataSongs} />;
}

export default ProfileArtist;
