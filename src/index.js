import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GLStyles from './components/GlStyles';
import { AppProvider, DataMusicProvider } from './context/AppProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <GLStyles>
        <AppProvider>
            <DataMusicProvider>
                <App />
            </DataMusicProvider>
        </AppProvider>
        ,
    </GLStyles>,

    // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
