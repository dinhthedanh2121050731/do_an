import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './MenuItem.module.scss';
const cx = classNames.bind(style);

function MenuItem({ to, title, icon, activeIcon }) {
    return (
        <NavLink to={to} className={(nav) => cx('menu-item', { active: nav.isActive })}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <span className={cx('title', { activeTitle: title })}>{title}</span>
        </NavLink>
    );
}

export default MenuItem;
