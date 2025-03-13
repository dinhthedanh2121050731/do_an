import classNames from 'classnames/bind';

import images from '~/assets/images';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);
function Image({ src, alt, className, border, large, small, ...props }) {
    const classes = cx('wrapper', {
        large,
        small,
        border,
        [className]: className,
    });
    return (
        <img src={src || images.noImage} alt={'anh_default ' || alt} className={classes} {...props} loading="lazy" />
    );
}

export default Image;
