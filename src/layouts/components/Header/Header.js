import classNames from 'classnames/bind';

import { AccessIcon, BrowseActiveIcon, BrowseIcon, HomeActiveIcon, HomeIcon, SearchIcon } from '~/components/Icon';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import MenuItem from '~/components/MenuItem';
import config from '~/config/config';
import styles from './Header.module.scss';
import axios from 'axios';
import Image from '~/components/Image';
const cx = classNames.bind(styles);
function Header() {
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                if (token) {
                    const response = await axios.get('http://localhost:3000/users/protected', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Link to={config.routes.home}>
                <img
                    className={cx('logo')}
                    src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
                ></img>
            </Link>

            <div className={cx('search-home')}>
                <Tippy delay={[500, 300]} content="Home" placement="bottom">
                    <div className={cx('background-icon')}>
                        <MenuItem icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} to={config.routes.home} />
                    </div>
                </Tippy>

                <div className={cx('search')}>
                    <SearchIcon className={cx('search-icon')} />
                    <input className={cx('input')} type="text" placeholder="Bạn muốn phát nội dung gì?" />
                    <Tippy delay={[500, 300]} placement="bottom" content="Duyệt tìm kiếm">
                        <div>
                            <MenuItem
                                icon={<BrowseIcon />}
                                activeIcon={<BrowseActiveIcon />}
                                to={config.routes.search}
                            />
                        </div>
                    </Tippy>
                </div>
            </div>
            {!user ? (
                <div className={cx('auth-form')}>
                    <Link to={config.routes.signup}>
                        <div className={cx('register')}>Đăng ký</div>
                    </Link>
                    <Link to={config.routes.signin}>
                        <div className={cx('signin')}>Đăng nhập</div>
                    </Link>
                </div>
            ) : (
                <div className={cx('user-form')}>
                    <Tippy delay={[500, 300]} interactive placement="bottom" content={user.username}>
                        <div className={cx('user-background')}>
                            <Image />
                        </div>
                    </Tippy>
                    <div className={cx('nav-user-form')}>
                        <div className={cx('text-nav-user-form')}>
                            Tài khoản
                            <AccessIcon />
                        </div>
                        <div className={cx('text-nav-user-form')}>Hồ sơ</div>
                        <div className={cx('text-nav-user-form')}>Cài đặt</div>
                        <div className={cx('text-nav-user-form')}>Đăng xuất</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
