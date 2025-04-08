const Song = require("../models/Song");
const User = require("../models/User");
class SongsController {
  async showSongsByArtist(req, res) {
    try {
      const { artistId } = req.params;
      const songs = await Song.find({ artistId })
        .populate("artistId", "name genre image_artist") // Lấy thông tin artist
        .exec();
      res.status(200).json({ songs });
    } catch (err) {
      console.log(err);
    }
  }
  async addSong(req, res) {
    try {
      const { artistId } = req.params;
      const { name, composer, imageSong, url, duration } = req.body;

      const newSong = new Song({
        name,
        composer,
        imageSong,
        url,
        duration,
        artistId,
      });
      await newSong.save();
      res.status(201).json({ message: "Song added successfully" });
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = new SongsController();
