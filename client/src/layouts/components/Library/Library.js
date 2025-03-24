import classNames from 'classnames/bind';
import Image from '~/components/Image';
import style from './Library.module.scss';
const cx = classNames.bind(style);
function Library({ dataFavSong }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('d-flex justify-content-left')}>
                <span className={cx('header_text')}>Danh sách phát</span>
                <span className={cx('header_text')}>Nghệ sĩ</span>
            </div>
            {/* <div className={cx('search')}></div> */}
            <div className={cx('content')}>
                <div className={cx('content-item')}>
                    <Image small src={'https://misc.scdn.co/liked-songs/liked-songs-64.png'} />
                    <div className={cx('content-head')}>
                        <div className={cx('content-text', { active: true })}>Bài hát đã thích</div>
                        <div className={cx('content-desc')}>
                            Danh sách phát
                            <div className={cx('content-span')}>{dataFavSong.length} bài hát</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Library;
