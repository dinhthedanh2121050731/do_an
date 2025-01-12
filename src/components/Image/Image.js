import classNames from 'classnames';

import images from '~/assets/images';
import styles from './Image.module.scss';
function Image({ src, alt, className, ...props }) {
    return (
        <img
            src={images.noImage || src}
            alt={'anh_default ' || alt}
            className={classNames(styles.wrapper, classNames)}
            {...props}
        />
    );
}

export default Image;
