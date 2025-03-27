import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../Image';
import styles from './CardItem.module.scss';
const cx = classNames.bind(styles);
function CardItem({ noBorderImg, dataUser, bio }) {
    const navigate = useNavigate();

    // Khi mà drag element
    const handleDragStart = useCallback((e, user) => {
        e.dataTransfer.setData('user', JSON.stringify(user));
        e.dataTransfer.effectAllowed = 'copy';

        window.dragData = e.currentTarget;
        // Tạo một span chứa tên
        const dragIcon = document.createElement('span');
        dragIcon.textContent = user.name;
        dragIcon.style.fontSize = '16px';
        dragIcon.style.fontWeight = 'bold';
        dragIcon.style.color = '#fff';
        dragIcon.style.background = '#2a2929';
        dragIcon.style.padding = '5px 10px';
        dragIcon.style.borderRadius = '5px';

        // Thêm vào body nhưng không hiển thị
        document.body.appendChild(dragIcon);

        // Đặt hình ảnh kéo thành tên khối
        e.dataTransfer.setDragImage(dragIcon, 10, 10);
    }, []);
    return (
        <div className={cx('container')}>
            {dataUser?.map((user, index) => (
                <div
                    key={index}
                    id={user._id}
                    onDragStart={(e) => handleDragStart(e, user)}
                    draggable="true"
                    className={cx('card')}
                    data-zone="artist"
                    onClick={() => {
                        navigate(`/artist/${user.name}`);
                    }}
                >
                    <Image src={user.imageArtist} className={cx('image', { noborder: noBorderImg })} />
                    <div className={cx('info')}>
                        <div className={cx('name')}>{user?.name}</div>
                        {bio ? (
                            <div className={cx('desc')}>{user?.genre}</div>
                        ) : (
                            <div className={cx('desc')}>{user?.role}</div>
                        )}
                    </div>
                    <div className={cx('button-inner')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardItem;
