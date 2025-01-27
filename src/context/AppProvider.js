import axios from 'axios';
import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user') ?? 'user');
    localStorage.setItem('user', user);

    return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
};
