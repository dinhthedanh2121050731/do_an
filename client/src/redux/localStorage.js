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
        const seralizedState = JSON.stringify(state);
        localStorage.setItem('playerState', seralizedState);
    } catch (e) {
        console.log(e);
    }
};
