import classNames from 'classnames/bind';
import UserSongItem from '~/components/UserSongItem';
import style from './Library.module.scss';
const cx = classNames.bind(style);
function Library({ data, refSong, refArtist }) {
    const { dataFavoriteSong, dataFollow } = data;
    return (
        <div className={cx('wrapper')}>
            {dataFavoriteSong.length > 0 && <UserSongItem refSong={refSong} data={dataFavoriteSong} />}
            {dataFollow.length > 0 && <UserSongItem refArtist={refArtist} data={dataFollow} />}
        </div>
    );
}

export default Library;
