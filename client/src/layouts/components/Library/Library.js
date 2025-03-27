import classNames from 'classnames/bind';
import UserSongItem from '~/components/UserSongItem';
import style from './Library.module.scss';
const cx = classNames.bind(style);
function Library({ data, refSong, refArtist, setIsHasData, setDataFollow }) {
    const { dataFavoriteSongs, dataFollow } = data;
    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('search')}></div> */}
            {dataFavoriteSongs && <UserSongItem refSong={refSong} data={dataFavoriteSongs} />}
            {dataFollow && (
                <UserSongItem
                    setDataFollow={setDataFollow}
                    setIsHasData={setIsHasData}
                    refArtist={refArtist}
                    data={dataFollow}
                />
            )}
        </div>
    );
}

export default Library;
