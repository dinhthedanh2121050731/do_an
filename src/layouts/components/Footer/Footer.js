import { faPause, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { NextIcon, PauseIcon, PlayIcon, PreviousIcon, RepeatIcon, ShuffleIcon } from '~/components/Icon';
import Image from '~/components/Image';

import style from './Footer.module.scss';

const cx = classNames.bind(style);
function Footer() {
    const [play, setPlay] = useState(false);

    const audioRef = useRef();
    const inputProcessBarRef = useRef();
    const inputProcessBackgroundRef = useRef();
    const timeCurrentRef = useRef();
    const timeDurationRef = useRef();
    useEffect(() => {
        const audio = audioRef.current;
        const inputProcessBar = inputProcessBarRef.current;
        const inputProcessBackground = inputProcessBackgroundRef.current;
        const timeCurrent = timeCurrentRef.current;
        const timeDuration = timeDurationRef.current;
        const duration = audio.duration;
        if (audio) {
            if (play) {
                audio.play();
                audio.onplay = function () {
                    timeDuration.innerHTML = duration / 60;
                };
                audio.ontimeupdate = function () {
                    const currentTime = audio.currentTime;
                    const processTime = (currentTime / duration) * 100;
                    inputProcessBackground.style.width = `${processTime}%`;
                    inputProcessBar.value = `${processTime}`;
                };
                inputProcessBar.oninput = function (e) {
                    const newTime = (e.target.value / 100) * duration;
                    audio.currentTime = newTime;
                };
            } else {
                audio.pause();
            }
        }
    }, [play]);

    return (
        <div className={cx('footer')}>
            <div className={cx('wrapper')}>
                <div className={cx('left-content')}>
                    <Image className={cx('img')} />
                    <div className={cx('track-details')}>
                        <div className={cx('text-head')}>Exit Sign</div>
                        <div className={cx('text-desc')}>HIEUTHUHAI,marzuz</div>
                    </div>
                    <FontAwesomeIcon icon={faPlus} className={cx('icon-plus')} />
                </div>
                <div className={cx('player-container')}>
                    <div className={cx('control-bar')}>
                        <ShuffleIcon className={cx('icon-control-bar')} />
                        <PreviousIcon className={cx('icon-control-bar')} />
                        {play ? (
                            <div onClick={() => setPlay(false)} className={cx('icon-control-bar__background')}>
                                <PlayIcon className={cx('icon-control-bar__active')} />
                            </div>
                        ) : (
                            <div onClick={() => setPlay(true)} className={cx('icon-control-bar__background')}>
                                <PauseIcon className={cx('icon-control-bar__active')} />
                            </div>
                        )}
                        <NextIcon className={cx('icon-control-bar')} />
                        <RepeatIcon className={cx('icon-control-bar')} />
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
            <audio
                ref={audioRef}
                src="https://a128-z3.zmdcdn.me/79c2cc95606877e8e04dd1e9fb403b75?authen=exp=1738939555~acl=/79c2cc95606877e8e04dd1e9fb403b75*~hmac=b7a0cd3ff061108c46305bf4deafb574"
            />
        </div>
    );
}

export default Footer;
