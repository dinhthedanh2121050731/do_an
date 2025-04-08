import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '~/context/AppProvider';

function ProtectedRoute({ children }) {
    const { user } = useContext(AppContext);
    console.log(user);
    if (user !== 'admin') {
        return <Navigate to="/unauthorized" replace />;
    }
    return children;
}

export default ProtectedRoute;
