import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import style from './FooterContent.module.scss';
const cx = classNames.bind(style);
function FooterContent() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('item')}>
                <p className={cx('text-head')}>Công ty</p>
                <p className={cx('text-p')}>Giới thiệu</p>
                <p className={cx('text-p')}>Việc làm</p>
                <p className={cx('text-p')}>For the Record</p>
            </div>
            <div className={cx('item')}>
                <p className={cx('text-head')}>Cộng đồng</p>
                <p className={cx('text-p')}>Dành cho nghệ sĩ</p>
                <p className={cx('text-p')}>Nhà phát triển</p>
                <p className={cx('text-p')}>Quảng cáo</p>
                <p className={cx('text-p')}>Nhà đâu tư</p>
                <p className={cx('text-p')}>Nhà cung cấp</p>
            </div>
            <div className={cx('item')}>
                <p className={cx('text-head')}>Liên kết hữu ích</p>
                <p className={cx('text-p')}>Hỗ trợ</p>
                <p className={cx('text-p')}>Ứng dụng di động miễn phí</p>
            </div>
            <div className={cx('item')}>
                <p className={cx('text-head')}>Công ty</p>
                <p className={cx('text-p')}>Giới thiệu</p>
                <p className={cx('text-p')}>Việc làm</p>
                <p className={cx('text-p')}>For the Record</p>
            </div>
            <div className={cx('item')}>
                <FontAwesomeIcon icon={faInstagram} className={cx('icon')} />
                <FontAwesomeIcon icon={faX} className={cx('icon')} />
                <FontAwesomeIcon icon={faFacebook} className={cx('icon')} />
            </div>
        </div>
    );
}

export default FooterContent;
