import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Playlist from '~/components/Playlist';
import api from '~/ultis/httpsRequest';

import style from './CollectionTrack.module.scss';

const cx = classNames.bind(style);
function CollectionTrack() {
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchApi(page);
    }, []);

    const fetchApi = async (pageNum) => {
        try {
            const res = await api.get(`auth/favorite-song?page=${pageNum}&limit=5`, {
                withCredentials: true,
            });
            setData((prev) => [...prev, ...res.data.data]);
            setHasMore(res.data.hasMore);
        } catch (err) {
            console.log(err);
        }
    };
    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
        fetchApi(page + 1);
    };
    return (
        <div className="d-flex flex-column">
            <Playlist
                hasMore={hasMore}
                loadMore={loadMore}
                dataSongs={data}
                text={'Danh sách phát của tôi'}
                imageProfileArtist={'https://misc.scdn.co/liked-songs/liked-songs-300.jpg'}
            />
        </div>
    );
}

export default CollectionTrack;
