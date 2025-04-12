import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import { loadState, saveState } from './localStorage';

const persistedState = {
    player: loadState(),
};

const store = configureStore({
    reducer: {
        player: playerReducer,
    },
    preloadedState: persistedState,
});

store.subscribe(() => {
    saveState(store.getState().player);
});

export default store;
