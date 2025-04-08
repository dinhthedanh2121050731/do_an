import { createContext, useState } from 'react';
export const DataMusicContext = createContext();

export const DataMusicProvider = ({ children }) => {
    const containerDataMusic = JSON.parse(localStorage.getItem('containerDataMusic'));
    const [dataMusic, setDataMusic] = useState(containerDataMusic?.dataMusic ?? []);
    const [play, setPlay] = useState(false);
    const [idMusic, setIdMusic] = useState(containerDataMusic?.idMusic ?? 0);

    localStorage.setItem('containerDataMusic', JSON.stringify({ dataMusic: dataMusic, idMusic: idMusic }));

    return (
        <DataMusicContext.Provider value={{ dataMusic, setDataMusic, idMusic, setIdMusic, play, setPlay }}>
            {children}
        </DataMusicContext.Provider>
    );
};
