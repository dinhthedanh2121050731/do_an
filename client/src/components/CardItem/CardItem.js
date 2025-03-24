import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import Image from '../Image';
import styles from './CardItem.module.scss';
const cx = classNames.bind(styles);
function CardItem({ noBorderImg, dataUser, bio }) {
    const navigate = useNavigate();
    return (
        <div
            className={cx('card')}
            onClick={() => {
                navigate(`/artist/${dataUser.name}`);
            }}
        >
            <Image src={dataUser.imageArtist} className={cx('image', { noborder: noBorderImg })} />
            <div className={cx('info')}>
                <div className={cx('name')}>{dataUser.name}</div>
                {bio ? (
                    <div className={cx('desc')}>{dataUser.genre}</div>
                ) : (
                    <div className={cx('desc')}>{dataUser.role}</div>
                )}
            </div>
            <div className={cx('button-inner')}>
                <FontAwesomeIcon icon={faPlay} />
            </div>
        </div>
    );
}

export default CardItem;
