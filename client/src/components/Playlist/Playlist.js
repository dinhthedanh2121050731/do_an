import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import tinycolor from 'tinycolor2';
import { FastAverageColor } from 'fast-average-color';

import style from './Playlist.module.scss';
import Image from '~/components/Image';
import { useDispatch, useSelector } from 'react-redux';
import { PauseIcon, PlayIcon } from '~/components/Icon';
import SongLists from '~/components/SongLists';
import api from '~/ultis/httpsRequest';
import { UpdateDataSidebarContext } from '~/context/UpdateDataSidebarProvider';
import { setPlaying } from '~/redux/playerSlice';

const cx = classNames.bind(style);
function Playlist({ dataArtist, dataSongs, imageProfileArtist, text, loadMore, hasMore }) {
    const { dataFollow, setDataFollow } = useContext(UpdateDataSidebarContext);

    // Lấy state từ redux data music
    const dispatch = useDispatch();
    const { isPlaying } = useSelector((state) => state.player);

    const [dominantColor, setDominantColor] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const [hasFollow, setHasFollow] = useState([]);
    const [isFollow, setIsFollow] = useState(false);

    const headerControlRef = useRef();

    const baseColor = tinycolor(dominantColor);
    const lightColor = baseColor.saturate(10).toHexString();
    const darkerColor = baseColor.desaturate(30).darken(35).toHexString();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await api.get('auth/follow', {
                    withCredentials: true,
                });
                setHasFollow(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchApi();
    }, [dataFollow.length]);
    useEffect(() => {
        if (dataArtist && hasFollow) {
            const isFollowing = hasFollow.some((fl) => fl._id === dataArtist._id);
            setIsFollow(isFollowing);
        }
    }, [dataArtist]);

    useEffect(() => {
        const headerControl = headerControlRef.current;
        window.onscroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 200) {
                headerControl.style.display = 'flex';
            } else {
                headerControl.style.display = 'none';
            }
        };
        return () => {
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        const fac = new FastAverageColor();
        fac.getColorAsync(imageProfileArtist ?? dataArtist?.imageProfileArtist)
            .then((color) => {
                if (color.isDark) {
                    setIsDark(true);
                }
                setDominantColor(color.hex); // Lấy màu chủ đạo
            })
            .catch((error) => {
                // console.error('Lỗi khi lấy màu:', error);
            });
    }, [dataArtist]);

    const handleUnfollow = async () => {
        try {
            const res = await api.delete(`auth/delete-follow/${dataArtist._id}`, {
                withCredentials: true,
            });
            if (res.status === 200) {
                setDataFollow((prevs) =>
                    prevs.filter((prev) => prev._id.toString() !== res.data.followDelete._id.toString()),
                );
                setIsFollow(false);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleFollow = async () => {
        try {
            const res = await api.post(
                `auth/add-follow`,
                {
                    artist: dataArtist,
                },
                {
                    withCredentials: true,
                },
            );
            if (res.status === 200) {
                setDataFollow((prev) => [...prev, dataArtist]);
                setIsFollow(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div
                ref={headerControlRef}
                style={{ '--color-background': `${!isDark ? darkerColor : lightColor}` }}
                className={cx('header-control')}
            >
                <div className={cx('background-icon')}>{isPlaying ? <PlayIcon /> : <PauseIcon />}</div>
                <span className={cx('text-control')}>{dataArtist?.name}</span>
            </div>
            <header className={cx('head')}>
                {!imageProfileArtist ? (
                    <div>
                        <Image src={dataArtist.imageProfileArtist} className={cx('image-head')} />
                        <span className={cx('text-head')}>{dataArtist?.name}</span>
                    </div>
                ) : (
                    <div className={cx('position-relative')} style={{ '--color-background': `${lightColor}` }}>
                        <div className={cx('image-playlist')}></div>
                        <div className={cx('head-content')}>
                            <Image large src={imageProfileArtist} className={cx('image-head-content_left')} />
                            <div className={cx('head-content_right')}>
                                <span className={cx('head-content_span')}>Playlist</span>
                                <h1 className={cx('head-content_text', { activeText: text })}>
                                    {text ?? 'Bài hát đã thích'}
                                </h1>
                            </div>
                        </div>
                    </div>
                )}
            </header>
            <div className={cx('container')}>
                <div
                    style={{ '--color-background': `${!isDark ? darkerColor : lightColor}` }}
                    className={cx('container-top')}
                >
                    <div className={cx('container-top-control')}>
                        <div className={cx('background-icon')}>{isPlaying ? <PlayIcon /> : <PauseIcon />}</div>
                        {!imageProfileArtist &&
                            (!isFollow ? (
                                <span className={cx('following')} onClick={handleFollow}>
                                    Theo dõi
                                </span>
                            ) : (
                                <div className={cx('following')} onClick={handleUnfollow}>
                                    Bỏ theo dõi
                                </div>
                            ))}
                    </div>
                    {!!imageProfileArtist || <span className={cx('container-top_text')}>Phổ biển</span>}
                </div>

                <SongLists data={dataSongs} />
                {hasMore && (
                    <button className={cx('button-add')} onClick={loadMore}>
                        Xem thêm
                    </button>
                )}
            </div>
        </div>
    );
}

export default Playlist;
