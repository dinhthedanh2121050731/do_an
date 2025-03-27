import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import style from './SongLists.module.scss';
import { DataMusicContext } from '~/context/AppProvider';
import Image from '~/components/Image';
import { PauseIcon, PlayIcon } from '~/components/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import api from '~/ultis/httpsRequest';

const cx = classNames.bind(style);
function SongLists({ data }) {
    const { idMusic, play, dataMusic, setDataMusic, setIdMusic, setPlay } = useContext(DataMusicContext);

    const [hoverId, setHoverId] = useState(false);

    let dataSong;
    if (data?.hasOwnProperty('songs')) {
        dataSong = data?.songs;
    } else if (data == null || data == undefined) {
        data = [];
    } else if (data[0]?.hasOwnProperty('songs')) {
        dataSong = data[0]?.songs;
    } else {
        dataSong = data;
    }

    // Tạo ra Icon của phần element Song
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

    // Khi mà hover vào element
    const handleMouseEnter = useCallback(
        (index) => {
            setHoverId(index);
        },
        [hoverId],
    );

    // Khi mà hết hover vào element
    const handleMouseLeave = useCallback(() => {
        setHoverId(null);
    }, [hoverId]);

    // Khi mà drag element
    const handleDragStart = useCallback((e, song) => {
        e.dataTransfer.setData('song', JSON.stringify(song));
        e.dataTransfer.effectAllowed = 'copy';

        window.dragData = e.currentTarget;
        // Tạo một span chứa tên
        const dragIcon = document.createElement('span');
        dragIcon.textContent = song.name;
        dragIcon.style.fontSize = '16px';
        dragIcon.style.fontWeight = 'bold';
        dragIcon.style.color = '#fff';
        dragIcon.style.background = '#2a2929';
        dragIcon.style.padding = '4px 14px';
        dragIcon.style.borderRadius = '5px';

        // Thêm vào body nhưng không hiển thị
        document.body.appendChild(dragIcon);

        // Đặt hình ảnh kéo thành tên khối
        e.dataTransfer.setDragImage(dragIcon, 10, 10);
    }, []);

    return (
        <div className={cx('container-center')}>
            {dataSong?.length >= 0 ? (
                dataSong?.map((song, index) => {
                    return (
                        <div
                            draggable="true"
                            id={song?._id}
                            onDragStart={(e) => handleDragStart(e, song)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            data-zone="song"
                            key={index}
                            className={cx('center-container_item')}
                        >
                            <div className={cx('song-list')}>{containerIcon(song, index)}</div>

                            <Image src={song?.imageSong} className={cx('image-song')} />
                            <div
                                className={cx('text-center', {
                                    active: index == idMusic && dataMusic[idMusic]?.name == song?.name,
                                })}
                                onClick={() => {
                                    setIdMusic(index);
                                    setDataMusic(dataSong);
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
