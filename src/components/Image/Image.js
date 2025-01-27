import classNames from 'classnames';

import images from '~/assets/images';
import styles from './Image.module.scss';
function Image({ src, alt, className, ...props }) {
    return (
        <img
            src={src || images.noImage}
            alt={'anh_default ' || alt}
            className={classNames(styles.wrapper, className)}
            {...props}
        />
    );
}

export default Image;
