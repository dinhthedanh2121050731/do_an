export const loadState = () => {
    try {
        const seralizedState = localStorage.getItem('playerState');
        if (seralizedState == null) return undefined;
        return JSON.parse(seralizedState);
    } catch (e) {
        return undefined;
    }
};
export const saveState = (state) => {
    try {
        const { currentSongId, currentSongData } = state;
        const seralizedState = JSON.stringify({ currentSongId, currentSongData });
        localStorage.setItem('playerState', seralizedState);
    } catch (e) {
        console.log(e);
    }
};
