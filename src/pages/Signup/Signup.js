import axios from 'axios';
import { useState } from 'react';

function SignUp() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/user/create-user', {
                username,
                email,
                password,
            });
            setUserName('');
            setPassword('');
            setEmail('');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="d-flex flex-column">
                <input
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                    type="text"
                    name="username"
                    placeholder="Username"
                />
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
