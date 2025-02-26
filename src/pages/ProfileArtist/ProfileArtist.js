import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import tinycolor from 'tinycolor2';
import { FastAverageColor } from 'fast-average-color';

import style from './ProfileArtist.module.scss';
import { DataMusicContext } from '~/context/AppProvider';
import Image from '~/components/Image';
import { PauseIcon, PlayIcon } from '~/components/Icon';

const cx = classNames.bind(style);
function ProfileArtist() {
    const location = useLocation();
    const data = Object(location.state);
    const { idMusic, play, setDataMusic, setIdMusic, setPlay } = useContext(DataMusicContext);

    const [dominantColor, setDominantColor] = useState(null);
    const [hoverItem, setHoverItem] = useState(false);
    const baseColor = tinycolor(dominantColor);
    const darkerColor = baseColor.saturate(30).toHexString(); // Làm đậm hơn 30%

    useEffect(() => {
        const fac = new FastAverageColor();
        fac.getColorAsync(data.image_album)
            .then((color) => {
                setDominantColor(color.hex); // Lấy màu chủ đạo
            })
            .catch((error) => {
                console.error('Lỗi khi lấy màu:', error);
            });
    }, [data.image_album]);

    useEffect(() => {
        setDataMusic(data.songs);
    }, [data]);

    return (
        <div className={cx('wrapper')}>
            <header className={cx('head')}>
                <Image src={data.image_album} className={cx('image-head')} />
                <span className={cx('text-head')}>{data.name}</span>
            </header>
            <div className={cx('container')}>
                <div style={{ '--color-background': `${darkerColor}` }} className={cx('container-top')}>
                    <div className={cx('container-top-control')}>
                        <div className={cx('background-icon-container-top')}>
                            {play && data ? (
                                <PlayIcon className={cx('icon-container-top')} />
                            ) : (
                                <PauseIcon className={cx('icon-container-top')} />
                            )}
                        </div>
                        <span className={cx('following')}>Theo dõi</span>
                    </div>
                    <span className={cx('container-top_text')}>Phổ biển</span>
                </div>
                <div className={cx('container-center')}>
                    {data.songs.map((song, index) => {
                        return (
                            <div
                                onMouseEnter={() => setHoverItem(true)}
                                onMouseLeave={() => setHoverItem(false)}
                                key={index}
                                className={cx('cente-container_item')}
                            >
                                {!hoverItem ? (
                                    <span className={cx('text-center', { active: index == idMusic })}>{index + 1}</span>
                                ) : (
                                    <PauseIcon className={cx('icon-container-top')} />
                                )}
                                <Image src={song.image_song} className={cx('image-song')} />
                                <div
                                    className={cx('text-center', { active: index == idMusic })}
                                    onClick={() => {
                                        setIdMusic(index);
                                        setPlay(true);
                                    }}
                                    key={index}
                                >
                                    {song.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProfileArtist;
