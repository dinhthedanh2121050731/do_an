import { toBeRequired } from '@testing-library/jest-dom/matchers';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import { LibraryIcon, PlusSignIcon } from '~/components/Icon';
import MenuItem from '~/components/MenuItem';
import SongLists from '~/components/SongLists';
import api from '~/ultis/httpsRequest';
import Library from '../Library';
import styles from './Sidebar.module.scss';
const cx = classNames.bind(styles);
function Sidebar() {
    const [dataFavoriteSongs, setDataFavoriteSongs] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await api.get('auth/favorite-song', {
                    withCredentials: true,
                });
                setDataFavoriteSongs(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchApi();
    }, []);

    // Khi mà drop element
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('song');
        if (data) {
            const parseData = JSON.parse(data);
            const fetchApi = async () => {
                try {
                    const res = await api.post(
                        'auth/add-favorite-song',
                        {
                            song: parseData,
                        },
                        {
                            withCredentials: true,
                        },
                    );
                    if (res.status === 200 && dataFavoriteSongs.length > 0) {
                        setDataFavoriteSongs((prev) => [...prev, parseData]);
                    }
                } catch (err) {
                    console.log(err);
                }
            };
            fetchApi();
        }
    }, []);

    // Khi mà drop element
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-wrap')}>
                    <LibraryIcon className={cx('libary-icon')} />
                    <span className={cx('header-text')}>Thư viện</span>
                </div>
                {dataFavoriteSongs?.length > 0 ? (
                    <div className={cx('background-create')}>
                        <MenuItem activeIcon={<PlusSignIcon className={cx('plussign-icon')} />} title={'Tạo'} />
                    </div>
                ) : (
                    <PlusSignIcon className={cx('plussign-icon')} />
                )}
            </div>
            {dataFavoriteSongs?.length > 0 ? (
                <div onDrop={(e) => handleDrop(e)} onDragOver={(e) => handleDragOver(e)}>
                    <Library dataFavSong={dataFavoriteSongs} dataFavArtist />
                </div>
            ) : (
                <div>
                    <div
                        className={cx('create-playlist-wrap')}
                        onDrop={(e) => handleDrop(e)}
                        onDragOver={(e) => handleDragOver(e)}
                    >
                        <div className={cx('create-playlist-li')}>
                            <div className={cx('create-playlist-head')}>Tạo danh sách phát đầu tiên của bạn</div>
                            <div className={cx('create-playlist-dsc')}>Rất dễ!Chúng tôi sẽ giúp bạn</div>
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
