import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '~/ultis/httpsRequest';

function Protected() {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('auth/protected', {
                    withCredentials: 'include', // Gửi cookie session
                });
                setData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Protected Data</h2>
            {error && <p>{error}</p>}
            {data && <p>{JSON.stringify(data)}</p>}
        </div>
    );
}

export default Protected;
