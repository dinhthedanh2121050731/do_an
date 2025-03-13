import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import style from './SongLists.module.scss';
import { DataMusicContext } from '~/context/AppProvider';
import Image from '~/components/Image';
import { PauseIcon, PlayIcon } from '~/components/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);
function SongLists({ data }) {
    const { idMusic, play, dataMusic, setDataMusic, setIdMusic, setPlay } = useContext(DataMusicContext);

    const [hoverId, setHoverId] = useState(false);

    let isDataHasSongs;
    if (data?.hasOwnProperty('songs')) {
        isDataHasSongs = data?.songs;
    } else if (data == null || data == undefined) {
        data = [];
    } else if (data[0]?.hasOwnProperty('songs')) {
        isDataHasSongs = data[0]?.songs;
    } else {
        isDataHasSongs = data;
    }

    const containerIcon = useCallback(
        (song, index) => {
            return hoverId !== index ? (
                <div>
                    {index == idMusic && dataMusic[idMusic]?.name == song?.name && play ? (
                        <div className={cx('music-icon')}>
                            <div className={cx('bar')}></div>
                            <div className={cx('bar')}></div>
                            <div className={cx('bar')}></div>
                            <div className={cx('bar')}></div>
                        </div>
                    ) : (
                        <span
                            className={cx('text-center', {
                                active: index == idMusic && dataMusic[idMusic]?.name == song?.name,
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
    const handleMouseEnter = useCallback(
        (index) => {
            setHoverId(index);
        },
        [hoverId],
    );

    const handleMouseLeave = useCallback(() => {
        setHoverId(null);
    }, [hoverId]);

    return (
        <div className={cx('container-center')}>
            {isDataHasSongs?.length >= 0 ? (
                isDataHasSongs?.map((song, index) => {
                    return (
                        <div
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            key={index}
                            className={cx('center-container_item')}
                        >
                            <div className={cx('song-list')}>{containerIcon(song, index)}</div>

                            <Image src={song?.image_song} className={cx('image-song')} />
                            <div
                                className={cx('text-center', {
                                    active: index == idMusic && dataMusic[idMusic]?.name == song?.name,
                                })}
                                onClick={() => {
                                    setIdMusic(index);
                                    setDataMusic(isDataHasSongs);
                                    setPlay(true);
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
    );
}

export default SongLists;
