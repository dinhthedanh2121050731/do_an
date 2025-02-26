import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config/config';

import Image from '../Image';
import styles from './CardItem.module.scss';
const cx = classNames.bind(styles);
function CardItem({ noBorderImg, dataUser, bio }) {
    const navigate = useNavigate();
    return (
        <div
            className={cx('card')}
            onClick={() => {
                navigate(`/artist/${dataUser.name}`, { state: dataUser });
            }}
        >
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
