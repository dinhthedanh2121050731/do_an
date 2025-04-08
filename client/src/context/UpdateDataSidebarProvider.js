import { createContext, useState } from 'react';

export const UpdateDataSidebarContext = createContext();

export const UpdateDataSidebarProvider = ({ children }) => {
    const [isHasData, setIsHasData] = useState(false);
    const [dataFollow, setDataFollow] = useState([]);
    const [dataFavoriteSong, setDataFavoriteSong] = useState([]);

    return (
        <UpdateDataSidebarContext.Provider
            value={{ isHasData, setIsHasData, dataFollow, setDataFollow, dataFavoriteSong, setDataFavoriteSong }}
        >
            {children}
        </UpdateDataSidebarContext.Provider>
    );
};
