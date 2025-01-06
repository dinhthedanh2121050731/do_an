import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import FooterContent from '../components/FooterContent';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>
                    {children}
                    <FooterContent />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
