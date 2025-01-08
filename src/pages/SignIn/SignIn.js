import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config/config';

function SignIn() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/login', {
                email,
                password,
            });
            setPassword('');
            setEmail('');
            setToken(response.data.access_token);
            localStorage.setItem('token', response.data.access_token);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="d-flex flex-column">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                {/* <Link to={config.routes.home}> */}
                <button type="submit">Sign In</button>
                {/* </Link> */}
            </form>
        </div>
    );
}

export default SignIn;
