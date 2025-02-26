import config from '~/config/config';
import CreateArtist from '~/layouts/components/CreateArtist';
import CreateSong from '~/layouts/components/CreateSong';
import NoHeaderAndSidebar from '~/layouts/NoHeaderAndSidebar';
import AdminShowArtist from '~/pages/AdminShowArtist';

// layouts
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import ProfileArtist from '~/pages/ProfileArtist';
import Search from '~/pages/Search';
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
        layout: NoHeaderAndSidebar,
    },
    {
        path: config.routes.signin,
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
