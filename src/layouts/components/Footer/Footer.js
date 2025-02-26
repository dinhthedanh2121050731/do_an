import { faPlus, faVolumeDown, faVolumeUp, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { NextIcon, PauseIcon, PlayIcon, PreviousIcon, RepeatIcon, ShuffleIcon } from '~/components/Icon';
import Image from '~/components/Image';
import style from './Footer.module.scss';
import { DataMusicContext } from '~/context/AppProvider';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Footer() {
    // Lấy state từ context data music
    const { dataMusic, idMusic, play, setPlay } = useContext(DataMusicContext);
    const controllerStorage = JSON.parse(localStorage.getItem('controller')) ?? false;
    const volumeStorage = localStorage.getItem('volume');
    // Tạo State
    const [data, setData] = useState(dataMusic[idMusic] ?? []);
    const [currentIndex, setCurrentIndex] = useState(idMusic);
    const [shuffle, setShuffle] = useState(controllerStorage.shuffle || false);
    const [repeat, setRepeat] = useState(controllerStorage.repeat || false);
    const [volume, setVolume] = useState(volumeStorage || 0);
    const [textDesc, setTextDesc] = useState([]);
    console.log(volumeStorage);
    // Tạo Ref
    const audioRef = useRef();
    const inputProcessBarRef = useRef();
    const inputProcessBackgroundRef = useRef();
    const timeCurrentRef = useRef();
    const timeDurationRef = useRef();
    const nextIconRef = useRef();
    const prevIconRef = useRef();
    const inputVolumeControlRef = useRef();
    const inputVolumeControlBackGroundRef = useRef();
    const textDescRef = useRef();

    // Hàm xử lý volume
    const renderIconVolumes = useCallback(() => {
        if (volume > 0.5) {
            return <FontAwesomeIcon icon={faVolumeUp} />;
        } else if (volume > 0 && volume <= 0.5) {
            return <FontAwesomeIcon icon={faVolumeDown} />;
        } else {
            return <FontAwesomeIcon icon={faVolumeXmark} />;
        }
    }, [volume]);

    // Xử lý audio khi phát
    useEffect(() => {
        //Current state
        const audio = audioRef.current;
        const inputProcessBar = inputProcessBarRef.current;
        const inputProcessBackground = inputProcessBackgroundRef.current;
        const timeCurrent = timeCurrentRef.current;
        const timeDuration = timeDurationRef.current;
        const nextIcon = nextIconRef.current;
        const prevIcon = prevIconRef.current;
        const inputVolumeControl = inputVolumeControlRef.current;
        const inputVolumeControlBackGround = inputVolumeControlBackGroundRef.current;
        const textDesc = textDescRef.current;

        const duration = audio.duration;

        localStorage.setItem('controller', JSON.stringify({ shuffle: shuffle, repeat: repeat }));

        const app = {
            //Hàm cập nhật current
            loadTimeCurrent: function () {
                const currentTime = audio.currentTime;
                const minuteCurrentTime = Math.floor(currentTime / 60);
                const secondsCurrentTime = Math.floor(currentTime % 60);
                //Tạo currentTime time
                if (Math.floor(currentTime % 60 < 10)) {
                    timeCurrent.innerText = `${minuteCurrentTime}:0${secondsCurrentTime}`;
                } else {
                    timeCurrent.innerText = `${minuteCurrentTime}:${secondsCurrentTime}`;
                }
            },
            // Hàm cập nhật duration
            loadTimeDuration: function () {
                const minuteDuration = duration / 60;
                const secondsDuration = Math.floor(duration % 60);

                if (secondsDuration < 10) {
                    timeDuration.innerText = `${Math.floor(minuteDuration)}:0${secondsDuration}`;
                } else if (!minuteDuration && !secondsDuration) {
                    timeDuration.innerText = `0:00`;
                } else {
                    timeDuration.innerText = `${Math.floor(minuteDuration)}:${secondsDuration}`;
                }
            },

            // Hàm khi next song
            nextSong: function () {
                if (currentIndex < dataMusic.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                    setData(dataMusic[currentIndex + 1]);
                } else {
                    setCurrentIndex(0);
                    setData(dataMusic[0]);
                }
            },
            // Hàm khi prev song
            prevSong: function () {
                if (currentIndex > 0) {
                    setCurrentIndex((prev) => prev - 1);
                    setData(dataMusic[currentIndex - 1]);
                } else {
                    setCurrentIndex(dataMusic.length - 1);
                    setData(dataMusic[dataMusic.length - 1]);
                }
            },
            // Hàm shuffle song
            randomSong: function () {
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * dataMusic.length);
                } while (newIndex === currentIndex);
                setCurrentIndex(newIndex);
                setData(dataMusic[currentIndex]);
            },
            // Hàm set time out
            setTimeDelay: function (delay) {
                const defaultDelay = 300;
                setPlay(false);
                setTimeout(() => {
                    setPlay(true);
                    audio.play();
                }, (delay = delay || defaultDelay));
            },
            // Hàm set volume
            volumeSong: function () {
                inputVolumeControlBackGround.style.width = `${volume * 100}%`;
                audio.volume = volume;
                inputVolumeControl.oninput = function (e) {
                    audio.volume = e.target.value;
                    inputVolumeControlBackGround.style.width = `${audio.volume * 100}%`;
                    localStorage.setItem('volume', audio.volume);
                    setVolume(audio.volume);
                };
            },

            // Hàm xử lý event
            handleEvents: function () {
                const _this = this;
                if (play) {
                    audio.play();
                    audio.ontimeupdate = function () {
                        const currentTime = audio.currentTime;
                        const processTime = (currentTime / duration) * 100;
                        inputProcessBackground.style.width = `${processTime}%`;
                        inputProcessBar.value = `${processTime}`;
                        _this.loadTimeCurrent();
                    };
                    audio.onended = function () {
                        if (repeat) {
                            audio.loop = true;
                            audio.play();
                        } else {
                            audio.loop = false;
                            if (shuffle) {
                                _this.randomSong();
                                _this.setTimeDelay();
                            } else {
                                _this.nextSong();
                                _this.setTimeDelay();
                            }
                        }
                    };
                    inputProcessBar.oninput = function (e) {
                        const newTime = (e.target.value / 100) * duration;
                        audio.currentTime = newTime;
                    };
                    nextIcon.onclick = () => {
                        if (shuffle) {
                            _this.randomSong();
                            _this.setTimeDelay();
                        } else {
                            _this.nextSong();
                            _this.setTimeDelay();
                        }
                    };
                    prevIcon.onclick = () => {
                        if (shuffle) {
                            _this.randomSong();
                            _this.setTimeDelay();
                        } else {
                            _this.prevSong();
                            _this.setTimeDelay();
                        }
                    };
                } else {
                    audio.pause();
                }
            },
            start: function () {
                this.handleEvents();
                this.loadTimeDuration();
                this.volumeSong();
            },
        };
        app.start();
        return () => {
            audio.pause();
            audio.ontimeupdate = null;
            audio.onended = null;
            inputProcessBar.oninput = null;
            nextIcon.onclick = null;
            prevIcon.onclick = null;
            inputVolumeControl.oninput = null;
        };
    }, [play]);

    //Xử lý khi thêm state ở context
    useEffect(() => {
        setData(dataMusic[idMusic]);
        if (play) {
            setPlay(false);
            setTimeout(() => {
                setPlay(true);
                setVolume(volumeStorage);
            }, 500);
        }
        setCurrentIndex(idMusic);
    }, [idMusic, dataMusic]);
    useEffect(() => {
        const texts = data.composer.split(',');
        setTextDesc(texts);
    }, [data]);

    return (
        <div className={cx('footer')}>
            <div className={cx('wrapper')}>
                <div className={cx('left-content')}>
                    <Image src={data.image_song || 'https://via.placeholder.com/150'} className={cx('img')} />
                    <div className={cx('track-details')}>
                        <div className={cx('text-head')}>{data.name}</div>
                        <div ref={textDescRef} className={cx('text-wrap-name')}>
                            {textDesc.map((text, index) => (
                                // <Link key={index}>
                                <div key={index} className={cx('text-desc')}>
                                    {text}
                                </div>
                                // </Link>
                            ))}
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faPlus} className={cx('icon-plus')} />
                </div>
                <div className={cx('player-container')}>
                    <div className={cx('control-bar')}>
                        <ShuffleIcon
                            onClick={() => {
                                setShuffle(!shuffle);
                            }}
                            className={cx('icon-control-bar', { active: shuffle })}
                        />
                        <PreviousIcon ref={prevIconRef} className={cx('icon-control-bar')} />
                        {play ? (
                            <i
                                onClick={() => {
                                    setPlay(false);
                                }}
                                className={cx('icon-control-bar__background')}
                            >
                                <PlayIcon className={cx('icon-control-bar__active')} />
                            </i>
                        ) : (
                            <i
                                onClick={() => {
                                    setPlay(true);
                                }}
                                className={cx('icon-control-bar__background')}
                            >
                                <PauseIcon className={cx('icon-control-bar__active')} />
                            </i>
                        )}

                        <NextIcon ref={nextIconRef} className={cx('icon-control-bar')} />
                        <RepeatIcon
                            onClick={() => {
                                setRepeat(!repeat);
                            }}
                            className={cx('icon-control-bar', { active: repeat })}
                        />
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
                                min="0"
                                step="0.1"
                                max="100"
                            />
                            <nav ref={inputProcessBackgroundRef} className={cx('input-process-bar_background')}></nav>
                        </div>
                        <span ref={timeDurationRef} className={cx('time')}>
                            0:00
                        </span>
                    </div>
                </div>

                <div className={cx('volume-control')}>
                    <div
                        style={{
                            width: 30,
                            height: 30,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {renderIconVolumes()}
                    </div>
                    <input
                        ref={inputVolumeControlRef}
                        defaultValue={volume}
                        className={cx('input-volume-control')}
                        type="range"
                        min="0"
                        step="0.1"
                        max="1"
                    />
                    <nav ref={inputVolumeControlBackGroundRef} className={cx('input-volume-control_background')}></nav>
                </div>
            </div>
            <audio ref={audioRef} src={data.url} type="audio/mp3" />
        </div>
    );
}

export default Footer;
