import config from '~/config/config';
import CreateArtist from '~/layouts/components/CreateArtist';
import CreateSong from '~/layouts/components/CreateSong';

// layouts
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/Signup/Signup';
//Public routes
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },

    {
        path: config.routes.profile,
        component: Profile,
    },

    {
        path: config.routes.search,
        component: Search,
    },
    {
        path: config.routes.signup,
        component: SignUp,
    },
    {
        path: config.routes.signin,
        component: SignIn,
    },
    {
        path: config.routes.createArtist,
        component: CreateArtist,
    },
    {
        path: config.routes.createSong,
        component: CreateSong,
    },
];

export { publicRoutes };
