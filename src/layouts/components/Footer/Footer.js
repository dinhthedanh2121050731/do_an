import { faPause, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NextIcon, PauseIcon, PlayIcon, PreviousIcon, RepeatIcon, ShuffleIcon } from '~/components/Icon';
import Image from '~/components/Image';

import style from './Footer.module.scss';
import khongthesay from '~/assets/sounds/KhongTheSay.mp3';
import nolovenolive from '~/assets/sounds/523d1e25f4e888d8920b84d8bd0e731f.mp3';
import vetinh from '~/assets/sounds/6f88866cfadcb72de0a68edc99a6444a.mp3';

const cx = classNames.bind(style);

const srcAudio = [
    {
        name: 'Không Thể Say',
        composer: 'HieuThuHai',
        image_song: 'https://i.scdn.co/image/ab67616d00004851c006b0181a3846c1c63e178f',
        url: khongthesay,
    },
    {
        name: 'NOLOVENOLIVE',
        composer: 'HieuThuHai',
        image_song:
            'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/0/e/4/10e4d42bb9604e35f971bb0d82fa369d.jpg',
        url: nolovenolive,
    },
    {
        name: 'Vệ Tinh',
        composer: 'HieuThuHai,Hoàng Tôn, Kewtiie',
        image_song:
            'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/4/9/f/6/49f6f7ebf517b9a6b2bc47abd6abfa32.jpg',
        url: vetinh,
    },
];
function Footer() {
    const [play, setPlay] = useState(false);
    const [data, setData] = useState(srcAudio[0]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const audioRef = useRef();
    const inputProcessBarRef = useRef();
    const inputProcessBackgroundRef = useRef();
    const timeCurrentRef = useRef();
    const timeDurationRef = useRef();
    const nextIconRef = useRef();
    const prevIconRef = useRef();
    const playPauseIconRef = useRef();

    useLayoutEffect(() => {
        const audio = audioRef.current;
        const inputProcessBar = inputProcessBarRef.current;
        const inputProcessBackground = inputProcessBackgroundRef.current;
        const timeCurrent = timeCurrentRef.current;
        const timeDuration = timeDurationRef.current;
        const nextIcon = nextIconRef.current;
        const prevIcon = prevIconRef.current;
        const playPauseIcon = playPauseIconRef.current;
        const duration = audio.duration;
        const app = {
            loadTimeSong: function () {
                const minuteDuration = duration / 60;
                const secondsDuration = Math.floor(duration % 60);
                const currentTime = audio.currentTime;
                const minuteCurrentTime = Math.floor(currentTime / 60);
                const secondsCurrentTime = Math.floor(currentTime % 60);

                //Tạo duration time
                if (secondsDuration < 10) {
                    timeDuration.innerText = `${Math.floor(minuteDuration)}:0${secondsDuration}`;
                } else if (!minuteDuration && !secondsDuration) {
                    timeDuration.innerText = `0:00`;
                } else {
                    timeDuration.innerText = `${Math.floor(minuteDuration)}:${secondsDuration}`;
                }
                //Tạo currentTime time
                if (Math.floor(currentTime % 60 < 10)) {
                    timeCurrent.innerText = `${minuteCurrentTime}:0${secondsCurrentTime}`;
                } else {
                    timeCurrent.innerText = `${minuteCurrentTime}:${secondsCurrentTime}`;
                }
            },

            handleEvents: function () {
                const _this = this;
                if (play) {
                    audio.play();
                    setPlay(true);
                    audio.ontimeupdate = function () {
                        const currentTime = audio.currentTime;
                        const processTime = (currentTime / duration) * 100;
                        inputProcessBackground.style.width = `${processTime}%`;
                        inputProcessBar.value = `${processTime}`;
                        _this.loadTimeSong();
                    };
                    inputProcessBar.oninput = function (e) {
                        const newTime = (e.target.value / 100) * duration;
                        audio.currentTime = newTime;
                    };
                    nextIcon.onclick = () => {
                        if (currentIndex < srcAudio.length - 1) {
                            setCurrentIndex((prev) => prev + 1);
                            setPlay(false);
                            setData(srcAudio[currentIndex + 1]);
                            setTimeout(() => {
                                setPlay(true);
                                audio.play();
                            }, 300);
                            audio.pause();
                        } else {
                            setCurrentIndex(0);
                            setData(srcAudio[0]);
                            setPlay(false);
                            setTimeout(() => {
                                setPlay(true);
                                audio.play();
                            }, 300);
                            audio.pause();
                        }
                    };
                    prevIcon.onclick = () => {
                        if (currentIndex > 0) {
                            setCurrentIndex((prev) => prev - 1);
                            setPlay(false);
                            setData(srcAudio[currentIndex - 1]);
                            setTimeout(() => {
                                setPlay(true);
                                audio.play();
                            }, 300);
                            audio.pause();
                        } else {
                            setCurrentIndex(srcAudio.length - 1);
                            setData(srcAudio[srcAudio.length - 1]);
                            setPlay(false);
                            setTimeout(() => {
                                setPlay(true);
                                audio.play();
                            }, 300);
                            audio.pause();
                        }
                    };
                } else {
                    audio.pause();
                    setPlay(false);
                }
            },
            start: function () {
                this.handleEvents();
                this.loadTimeSong();
            },
        };
        app.start();
    }, [play, data]);

    return (
        <div className={cx('footer')}>
            <div className={cx('wrapper')}>
                <div className={cx('left-content')}>
                    <Image src={data.image_song} className={cx('img')} />
                    <div className={cx('track-details')}>
                        <div className={cx('text-head')}>{data.name}</div>
                        <div className={cx('text-desc')}>{data.composer}</div>
                    </div>
                    <FontAwesomeIcon icon={faPlus} className={cx('icon-plus')} />
                </div>
                <div className={cx('player-container')}>
                    <div className={cx('control-bar')}>
                        <div>
                            <ShuffleIcon className={cx('icon-control-bar')} />
                        </div>
                        <div ref={prevIconRef}>
                            <PreviousIcon className={cx('icon-control-bar')} />
                        </div>
                        <div ref={playPauseIconRef}>
                            {play ? (
                                <div onClick={() => setPlay(false)} className={cx('icon-control-bar__background')}>
                                    <PlayIcon className={cx('icon-control-bar__active')} />
                                </div>
                            ) : (
                                <div onClick={() => setPlay(true)} className={cx('icon-control-bar__background')}>
                                    <PauseIcon className={cx('icon-control-bar__active')} />
                                </div>
                            )}
                        </div>

                        <div ref={nextIconRef}>
                            <NextIcon className={cx('icon-control-bar')} />
                        </div>
                        <div>
                            <RepeatIcon className={cx('icon-control-bar')} />
                        </div>
                    </div>
                    <div className={cx('process-bar')}>
                        <span ref={timeCurrentRef} className={cx('time')}>
                            0:00
                        </span>
                        <div className={cx('form-process-bar')}>
                            <input
                                ref={inputProcessBarRef}
                                className={cx('input-process-bar')}
                                type="range"
                                defaultValue="0"
                                min="0"
                                step="0.1"
                                max="100"
                            />
                            <div ref={inputProcessBackgroundRef} className={cx('input-process-bar_background')}></div>
                        </div>
                        <span ref={timeDurationRef} className={cx('time')}>
                            0:00
                        </span>
                    </div>
                </div>
                <div className={cx('volume-control')}>
                    <input className={cx('input-voulume-control')} type="range" min="0" step="10" max="100" />
                </div>
            </div>
            <audio ref={audioRef} src={data.url} type="audio/mp3" />
        </div>
    );
}

export default Footer;
