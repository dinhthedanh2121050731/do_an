import config from '~/config/config';
import CreateArtist from '~/layouts/components/CreateArtist';
import CreateSong from '~/layouts/components/CreateSong';

// layouts
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
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
        path: config.routes.createArtist,
        component: CreateArtist,
    },
    {
        path: config.routes.createSong,
        component: CreateSong,
    },
];

export { publicRoutes };
