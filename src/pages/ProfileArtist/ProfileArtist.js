import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import tinycolor from 'tinycolor2';
import { FastAverageColor } from 'fast-average-color';

import style from './ProfileArtist.module.scss';
import { DataMusicContext } from '~/context/AppProvider';
import Image from '~/components/Image';
import { PauseIcon, PlayIcon } from '~/components/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import api from '~/ultis/httpsRequest';

const cx = classNames.bind(style);
function ProfileArtist() {
    const { name } = useParams();

    const { idMusic, play, dataMusic, setDataMusic, setIdMusic, setPlay } = useContext(DataMusicContext);

    const [dominantColor, setDominantColor] = useState(null);
    const [hoverId, setHoverId] = useState(false);
    const [data, setData] = useState([]);

    const headerControlRef = useRef();

    const baseColor = tinycolor(dominantColor);
    const darkerColor = baseColor.saturate(30).toHexString();

    useEffect(() => {
        const fetApi = async () => {
            try {
                const res = await api.get(`artists/get-album/${name}`);
                setData(res.data.artist);
            } catch (err) {
                console.error(err);
            }
        };
        fetApi();
    }, [name]);

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
    });

    const handleMouseEnter = useCallback(
        (index) => {
            setHoverId(index);
        },
        [hoverId],
    );

    const handleMouseLeave = useCallback(() => {
        setHoverId(null);
    }, [hoverId]);

    const containerIcon = useCallback(
        (song, index) => {
            return hoverId !== index ? (
                <div>
                    {index == idMusic && dataMusic[idMusic].name == song.name && play ? (
                        <div className={cx('music-icon')}>
                            <div className={cx('bar')}></div>
                            <div className={cx('bar')}></div>
                            <div className={cx('bar')}></div>
                            <div className={cx('bar')}></div>
                        </div>
                    ) : (
                        <span
                            className={cx('text-center', {
                                active: index == idMusic && dataMusic[idMusic].name == song.name,
                            })}
                        >
                            {index + 1}
                        </span>
                    )}
                </div>
            ) : (
                <PauseIcon />
            );
        },
        [hoverId, play],
    );

    useEffect(() => {
        const fac = new FastAverageColor();
        fac.getColorAsync(data?.image_album)
            .then((color) => {
                setDominantColor(color.hex); // Lấy màu chủ đạo
            })
            .catch((error) => {
                // console.error('Lỗi khi lấy màu:', error);
            });
    }, [data]);

    return (
        <div className={cx('wrapper')}>
            <div
                ref={headerControlRef}
                style={{ '--color-background': `${darkerColor}` }}
                className={cx('header-control')}
            >
                <div className={cx('background-icon')}>{play ? <PlayIcon /> : <PauseIcon />}</div>
                <span className={cx('text-control')}>{data?.name}</span>
            </div>
            <header className={cx('head')}>
                <Image src={data?.image_album} className={cx('image-head')} />
                <span className={cx('text-head')}>{data?.name}</span>
            </header>
            <div className={cx('container')}>
                <div style={{ '--color-background': `${darkerColor}` }} className={cx('container-top')}>
                    <div className={cx('container-top-control')}>
                        <div className={cx('background-icon')}>{play ? <PlayIcon /> : <PauseIcon />}</div>
                        <span className={cx('following')}>Theo dõi</span>
                    </div>
                    <span className={cx('container-top_text')}>Phổ biển</span>
                </div>
                <div className={cx('container-center')}>
                    {data?.songs?.length > 0 ? (
                        data.songs.map((song, index) => {
                            return (
                                <div
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    key={index}
                                    className={cx('center-container_item')}
                                >
                                    <div className={cx('song-list')}>{containerIcon(song, index)}</div>

                                    <Image src={song.image_song} className={cx('image-song')} />
                                    <div
                                        className={cx('text-center', {
                                            active: index == idMusic && dataMusic[idMusic].name == song.name,
                                        })}
                                        onClick={() => {
                                            setIdMusic(index);
                                            setPlay(true);
                                            setDataMusic(data.songs);
                                        }}
                                        key={index}
                                    >
                                        {song.name}
                                    </div>
                                    <div className={cx('track-options')}>
                                        <div className={cx('duration-song')}>{song.duration}</div>
                                        {hoverId === index && (
                                            <FontAwesomeIcon icon={faEllipsis} className={cx('icon-ellipsis')} />
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>Loading....</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileArtist;
