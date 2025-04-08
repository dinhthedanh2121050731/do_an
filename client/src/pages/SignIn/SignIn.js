import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '~/context/AppProvider';
import api from '~/ultis/httpsRequest';

function SignIn() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext);
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    const handleFacebookLogin = () => {
        window.location.href = 'http://localhost:3000/auth/facebook';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                'auth/login',
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                    // body: JSON.stringify({ email, password }),
                },
            );
            setPassword('');
            setEmail('');
            setUser(response.data.user.role);
            navigate('/');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} method="post" className="d-flex flex-column">
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
                <button onClick={handleGoogleLogin}>Login with Google</button>
                <button onClick={handleFacebookLogin}>Login with Facebook</button>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;
