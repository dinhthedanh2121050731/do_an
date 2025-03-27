import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { forwardRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Image from '~/components/Image';
import config from '~/config/config';
import style from './UserSongItem.module.scss';
const cx = classNames.bind(style);

function UserSongItem({ data, refSong, refArtist }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [activeMenu, setActiveMenu] = useState(null);

    const renderOptions = (attrs) => (
        <div className={cx('context-menu')} tabIndex="-1" {...attrs}>
            <span className={cx('menu-item')}> Xóa khỏi Thư viện</span>
            <span className={cx('menu-item')}>
                <FontAwesomeIcon className={cx('background-icon')} icon={faCheck} /> Loại bỏ khỏi hồ sơ yêu thích
            </span>
            <span className={cx('menu-item')}>Chia sẻ</span>
        </div>
    );
    const handleContextMenu = (event, artistID) => {
        event.preventDefault(); // Chặn menu mặc định của trình duyệt
        setPosition({ x: event.clientX, y: event.clientY });
        setActiveMenu(artistID);
    };
    return (
        <div>
            {data[0]?.composer ? (
                <NavLink
                    style={{ border: '2px solid transparent' }}
                    ref={refSong}
                    to={config.routes.collectionTrack}
                    className={(nav) => cx('content-item', { active: nav.isActive })}
                >
                    <Image small src={'https://misc.scdn.co/liked-songs/liked-songs-64.png'} />
                    <div className={cx('content-head')}>
                        <div className={cx('content-text', { active: true })}>Bài hát đã thích</div>
                        <div className={cx('content-desc')}>
                            Danh sách phát
                            <div className={cx('content-span')}>{data.length} bài hát</div>
                        </div>
                    </div>
                </NavLink>
            ) : (
                <div ref={refArtist} style={{ border: '2px solid transparent' }}>
                    {data?.map((artist, index) => {
                        return (
                            <HeadlessTippy
                                key={index}
                                onClickOutside={() => setActiveMenu(null)}
                                placement="right"
                                // offset={[position.x, -position.y]}
                                visible={activeMenu === artist._id}
                                followCursor={'Initial'}
                                interactive
                                render={(attrs) => renderOptions(attrs)}
                                appendTo={document.body}
                            >
                                <NavLink
                                    onContextMenu={(e) => handleContextMenu(e, artist._id)}
                                    to={`/artist/${artist.name}`}
                                    className={(nav) => cx('content-item', { active: nav.isActive })}
                                >
                                    <Image small src={artist?.imageArtist} />
                                    <div className={cx('content-head')}>
                                        <div className={cx('content-text')}>{artist?.name}</div>
                                        <div className={cx('content-desc')}>{artist?.role}</div>
                                    </div>
                                </NavLink>
                            </HeadlessTippy>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
export default UserSongItem;
