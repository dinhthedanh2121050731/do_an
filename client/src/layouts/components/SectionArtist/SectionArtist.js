import classNames from 'classnames/bind';
import CardItem from '~/components/CardItem';
import styles from './SectionArtist.module.scss';
const cx = classNames.bind(styles);
function SectionArtist({ text, noBorderImg, dataUser, bio }) {
    return (
        <div className={cx('section')}>
            <div className={cx('header')}>
                <div className={cx('text')}>{text}</div>
                <span className={cx('see-more')}>Hiện tất cả</span>
            </div>
            <CardItem bio={bio} noBorderImg={noBorderImg} dataUser={dataUser} />
        </div>
    );
}

export default SectionArtist;
