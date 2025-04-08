import { createContext, useState } from 'react';
import { DataMusicProvider } from './DataMusicProvider';
import { UpdateDataSidebarProvider } from './UpdateDataSidebarProvider';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user') ?? 'user');
    localStorage.setItem('user', user);

    return (
        <AppContext.Provider value={{ user, setUser }}>
            <UpdateDataSidebarProvider>
                <DataMusicProvider>{children}</DataMusicProvider>
            </UpdateDataSidebarProvider>
        </AppContext.Provider>
    );
};
