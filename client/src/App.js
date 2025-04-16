import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { privateRoutes, publicRoutes } from './routes/routes';
import DefaultLayout from './layouts/DefaultLayout';
import ProtectedRoute from './layouts/ProtectedRoute/ProtectedRoute';
function App() {
    const renderRoute = (route, index, isPrivate = false) => {
        const Page = route.component;
        let Layout = DefaultLayout;

        if (route.layout) {
            Layout = route.layout;
        } else if (route.layout === null) {
            Layout = Fragment;
        }
        const element = (
            <Layout>
                {isPrivate ? (
                    <ProtectedRoute requiredRole={route.role}>
                        <Page />
                    </ProtectedRoute>
                ) : (
                    <Page />
                )}
            </Layout>
        );
        return <Route key={index} path={route.path} element={element} />;
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => renderRoute(route, index))}
                    {privateRoutes.map((route, index) => renderRoute(route, index, true))}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
