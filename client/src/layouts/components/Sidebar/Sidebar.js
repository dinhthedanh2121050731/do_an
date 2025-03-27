import classNames from 'classnames/bind';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LibraryIcon, PlusSignIcon } from '~/components/Icon';
import MenuItem from '~/components/MenuItem';
import api from '~/ultis/httpsRequest';
import Library from '../Library';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const [dataFavoriteSongs, setDataFavoriteSongs] = useState([]);
    const [dataFollow, setDataFollow] = useState([]);
    const [isHasData, setIsHasData] = useState(false); // State theo dõi dữ liệu

    const refSong = useRef();
    const refArtist = useRef();

    useEffect(() => {}, [isHasData]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const resFavoriteSong = await api.get('auth/favorite-song', { withCredentials: true });
                const resFollow = await api.get('auth/follow', { withCredentials: true });

                setDataFavoriteSongs(resFavoriteSong.data.data);
                setDataFollow(resFollow.data.data);
                // Cập nhật trạng thái dữ liệu
                setIsHasData(resFavoriteSong.data.data.length > 0 || resFollow.data.data.length > 0);
            } catch (err) {
                console.log('Fetch API Error:', err);
            }
        };
        fetchApi();
    }, []); // Chỉ chạy 1 lần khi component mount

    // Khi kéo thả vào Sidebar
    const handleDrop = useCallback(async (e) => {
        e.preventDefault();
        const dataArtist = e.dataTransfer.getData('user');
        const dataSong = e.dataTransfer.getData('song');
        if (refArtist.current) {
            refArtist.current.style.border = '2px solid transparent';
            refSong.current.style.opacity = '1';
        }
        if (refSong.current) {
            refSong.current.style.border = '2px solid transparent';
            refArtist.current.style.opacity = '1';
        }

        if (dataArtist) {
            const parseData = JSON.parse(dataArtist);
            try {
                const res = await api.post('auth/add-follow', { artist: parseData }, { withCredentials: true });
                if (res.status === 200) {
                    setDataFollow((prev) => [...prev, parseData]);
                    setIsHasData(true); // Cập nhật UI ngay lập tức
                }
            } catch (err) {
                console.log('Add Follow Error:', err);
            }
        }

        if (dataSong) {
            const parseData = JSON.parse(dataSong);
            try {
                const res = await api.post('auth/add-favorite-song', { song: parseData }, { withCredentials: true });
                if (res.status === 200) {
                    setDataFavoriteSongs((prev) => [...prev, parseData]);
                    setIsHasData(true); // Cập nhật UI ngay lập tức
                }
            } catch (err) {
                console.log('Add Favorite Song Error:', err);
            }
        }
    }, []);

    // Cho phép kéo thả
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        if (refArtist.current) {
            if (window?.dragData?.getAttribute('data-zone') === 'artist') {
                refArtist.current.style.border = '2px solid #3be477';
                refSong.current.style.opacity = '0.4';
            }
        }
        if (refSong.current) {
            if (window?.dragData?.getAttribute('data-zone') === 'song') {
                refSong.current.style.border = '2px solid #3be477';
                refArtist.current.style.opacity = '0.4';
            }
        }
    }, []);
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();

        if (refArtist.current) {
            refArtist.current.style.border = '2px solid transparent';
            refSong.current.style.opacity = '1';
        }
        if (refSong.current) {
            refSong.current.style.border = '2px solid transparent';
            refArtist.current.style.opacity = '1';
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <div className={cx('header')}>
                    <div className={cx('header-wrap')}>
                        <LibraryIcon className={cx('libary-icon')} />
                        <span className={cx('header-text')}>Thư viện</span>
                    </div>
                    {isHasData ? (
                        <div className={cx('background-create')}>
                            <MenuItem activeIcon={<PlusSignIcon className={cx('plussign-icon')} />} title={'Tạo'} />
                        </div>
                    ) : (
                        <PlusSignIcon className={cx('plussign-icon')} />
                    )}
                </div>

                <div className={cx('d-flex justify-content-left mt-4')}>
                    <span className={cx('nav-tab_text')}>Danh sách phát</span>
                    <span className={cx('nav-tab_text')}>Nghệ sĩ</span>
                </div>
            </div>

            {isHasData ? (
                <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
                    <Library refSong={refSong} refArtist={refArtist} data={{ dataFavoriteSongs, dataFollow }} />
                </div>
            ) : (
                <div>
                    <div
                        className={cx('create-playlist-wrap')}
                        onDrop={handleDrop}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                    >
                        <div className={cx('create-playlist-li')}>
                            <div className={cx('create-playlist-head')}>Tạo danh sách phát đầu tiên của bạn</div>
                            <div className={cx('create-playlist-dsc')}>Rất dễ! Chúng tôi sẽ giúp bạn</div>
                            <div className={cx('create-playlist-btn')}>Tạo danh sách phát</div>
                        </div>
                        <div className={cx('create-playlist-li')}>
                            <div className={cx('create-playlist-head')}>Hãy cùng tìm và theo dõi một số podcast</div>
                            <div className={cx('create-playlist-dsc')}>
                                Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới
                            </div>
                            <div className={cx('create-playlist-btn')}>Duyệt xem podcast</div>
                        </div>
                    </div>
                    <ul className={cx('footer')}>
                        <li className={cx('footer-text')}>Pháp lý</li>
                        <li className={cx('footer-text')}>Trung tâm an toàn và quyền riêng tư</li>
                        <li className={cx('footer-text')}>Chính sách quyền riêng tư</li>
                        <li className={cx('footer-text')}>Cookie</li>
                        <li className={cx('footer-text')}>Giới thiệu quảng cáo</li>
                        <li className={cx('footer-text')}>Hỗ trợ tiếp cận</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
