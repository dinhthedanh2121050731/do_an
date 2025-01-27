import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import Image from '../Image';
import styles from './CardItem.module.scss';
const cx = classNames.bind(styles);
function CardItem({ noBorderImg, dataUser, bio }) {
    return (
        <div className={cx('card')}>
            <Image src={dataUser.image_artist} className={cx('image', { noborder: noBorderImg })} />
            <div className={cx('info')}>
                <div className={cx('name')}>{dataUser.name}</div>
                {bio ? (
                    <div className={cx('desc')}>{dataUser.genre}</div>
                ) : (
                    <div className={cx('desc')}>{dataUser.artist}</div>
                )}
            </div>
            <div className={cx('button-inner')}>
                <FontAwesomeIcon icon={faPlay} />
            </div>
        </div>
    );
}

export default CardItem;
