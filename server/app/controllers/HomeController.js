const Artist = require('../models/Artist');
class HomeController {
    async index(req, res) {
        try {
            const newArtist = new Artist(req.body);
            await newArtist.save();
        } catch (err) {
            console.log(err);
        }
    }
    create(req, res) {}
}
module.exports = new HomeController();
