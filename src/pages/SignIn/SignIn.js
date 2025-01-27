import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext, AppProvider } from '~/context/AppProvider';

function SignIn() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);

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
            console.log(response.data.user.role);
            setUser(response.data.user.role);
            localStorage.setItem('token', response.data.access_token);
            navigate('/');
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
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;
