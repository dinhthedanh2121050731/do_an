import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { publicRoutes } from './routes/routes';
import DefaultLayout from './layouts/DefaultLayout';
import ProtectedRoute from './layouts/ProtectedRoute/ProtectedRoute';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        let ProtectedRou = Fragment;
                        if (route.role) {
                            ProtectedRou = ProtectedRoute;
                        }
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <ProtectedRou>
                                            <Page />
                                        </ProtectedRou>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
