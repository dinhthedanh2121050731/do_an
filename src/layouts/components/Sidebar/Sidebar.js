import classNames from 'classnames/bind';
import { LibraryIcon, PlusSignIcon } from '~/components/Icon';
import styles from './Sidebar.module.scss';
const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-wrap')}>
                    <LibraryIcon className={cx('libary-icon')} />
                    <span className={cx('header-text')}>Thư viện</span>
                </div>
                <PlusSignIcon className={cx('plussign-icon')} />
            </div>
            <div className={cx('create-playlist-wrap')}>
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
    );
}

export default Sidebar;
