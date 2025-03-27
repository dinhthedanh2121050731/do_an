import config from '~/config/config';
import NoHeaderAndSidebar from '~/layouts/NoHeaderAndSidebar';
import AdminShowArtist from '~/pages/AdminShowArtist';
import CollectionTrack from '~/pages/CollectionTrack';
import CreateArtist from '~/pages/CreateArtist';
import CreateSong from '~/pages/CreateSong';

// layouts
import Home from '~/pages/Home';
import ProfileArtist from '~/pages/ProfileArtist';
import SearchPage from '~/pages/SearchPage';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/Signup/Signup';
import UpdateArtist from '~/pages/UpdateArtist';
//Public routes
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },

    {
        path: config.routes.collectionTrack,
        component: CollectionTrack,
    },

    {
        path: config.routes.search,
        component: SearchPage,
    },
    {
        path: config.routes.signup,
        component: SignUp,
        layout: NoHeaderAndSidebar,
    },
    {
        path: config.routes.login,
        component: SignIn,
        layout: NoHeaderAndSidebar,
    },
    {
        path: config.routes.createArtist,
        component: CreateArtist,
        role: 'admin',
    },
    {
        path: config.routes.createSong,
        component: CreateSong,
        role: 'admin',
    },
    {
        path: config.routes.adminShowArtist,
        component: AdminShowArtist,
        role: 'admin',
    },
    {
        path: config.routes.updateArtist,
        component: UpdateArtist,
        role: 'admin',
    },
    {
        path: config.routes.profileArtist,
        component: ProfileArtist,
    },
];

export { publicRoutes };
