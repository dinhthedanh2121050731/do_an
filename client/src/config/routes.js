const routes = {
    home: '/',
    following: '/following',
    profile: '/profile/:nickname',
    search: '/search',
    signup: '/signup',
    login: '/login',
    createArtist: '/admin/artist/artist-create',
    createSong: '/admin/artist/song-create/:id',
    adminShowArtist: '/admin/artist/artist-admin-show',
    updateArtist: '/admin/artist/artist-update/:id',
    profileArtist: '/artist/:id',
    collectionTrack: '/collection/tracks',
};
export default routes;
