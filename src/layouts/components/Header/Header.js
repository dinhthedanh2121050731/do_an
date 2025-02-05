import classNames from 'classnames/bind';

import { BrowseActiveIcon, BrowseIcon, HomeActiveIcon, HomeIcon, SearchIcon } from '~/components/Icon';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';

import MenuItem from '~/components/MenuItem';
import config from '~/config/config';
import styles from './Header.module.scss';
import img from '~/assets/images/rounded-in-photoretrica.png';

import FormUser from '../FormUser';
const cx = classNames.bind(styles);
function Header() {
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                if (token) {
                    const responseProtected = await axios.get('http://localhost:3000/users/protected', {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setUser(responseProtected.data.user);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className={cx('wrapper', 'container-fluid')}>
            <div className={cx('row', 'wrapper')}>
                <Link className={cx('col-1 col-lg-2  col-md-3 col-sm-1')} to={config.routes.home}>
                    <img className={cx('logo')} src={img}></img>
                </Link>

                <div className={cx('search-home', 'col-7 col-lg-6 col-md-5 col-sm-6')}>
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
                    <div
                        className={cx(
                            'auth-form',
                            'col-2 col-lg-3 col-md-4 col-sm-5 d-lg-flex d-md-flex d-sm-flex d-none',
                        )}
                    >
                        <Link to={config.routes.signup}>
                            <div className={cx('register')}>Đăng ký</div>
                        </Link>
                        <Link to={config.routes.signin}>
                            <div className={cx('signin')}>Đăng nhập</div>
                        </Link>
                    </div>
                ) : (
                    <FormUser user={user} />
                )}
            </div>
        </div>
    );
}

export default Header;
