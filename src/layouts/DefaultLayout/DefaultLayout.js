import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import FooterContent from '../components/FooterContent';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper', 'container-fluid')}>
            <Header />
            <div className={cx('row', 'container')}>
                <div className={cx('col-2')}>
                    <Sidebar />
                </div>
                <div className={cx('col-8', 'content')}>
                    {children}
                    <FooterContent />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
