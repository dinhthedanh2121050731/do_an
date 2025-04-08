const User = require("../models/User");
const Artist = require("../models/Artist");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Song = require("../models/Song");
require("dotenv").config();
class UserController {
  // [Get] all
  async show(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error getting users", error: err });
    }
  }
  // [Post] Register
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email alrealy existing" });
      }
      const newUser = new User({ username, email, password });
      await newUser.save();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating user", error: err });
    }
  }
  // [Post] login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Password inValid" });
      }
      const access_token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          password: user.password,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie("access_token", access_token, {
        httpOnly: true, // Bảo mật, không thể lấy từ JavaScript
        secure: true, // Chỉ gửi qua HTTPS
        sameSite: "Strict", // Chống CSRF
        maxAge: 24 * 60 * 60 * 1000, // 1 ngày
      });
      res.status(200).json({ message: "Success", user: user });
    } catch (err) {
      res.status(500).json({ message: "Error creating user", error: err });
    }
  }
  // [Get] logout
  logout(req, res) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Đăng xuất thất bại!" });
      }
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.clearCookie("access_token");
        res.json({ message: "Đăng xuất thành công" });
      });
    });
  }
  // [Get] me
  async me(req, res) {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "This is protected", user: user });
  }
  // [Get] admin
  async getAdmin(req, res) {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "This is admin", user: user });
  }
  // [Post] Favorite Song
  async addFavoriteSong(req, res) {
    try {
      const user = await User.findById(req.user.id);
      const id = req.body.id;

      const songData = await Song.findById({ _id: id });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (!songData) {
        return res.status(404).json({ message: "Song not found" });
      }

      if (user.favoritePlaylist.includes({ _id: id })) {
        return res
          .status(401)
          .json({ message: "Song is already in favorites" });
      }
      // Kiểm tra nếu user đã thích bài hát này
      if (songData.favoriteBy.includes(user._id)) {
        return res
          .status(400)
          .json({ message: "User already liked this song" });
      }
      user.favoritePlaylist.push({ _id: id });
      songData.favoriteBy.push(user._id);
      await songData.save();
      await user.save();

      res.status(200).json({ message: "Added to favorite songs", user });
    } catch (err) {
      res.status(500).json({ message: "Error creating user", error: err });
    }
  }
  // [Delete] Favorite Song

  async deleteFavoriteSong(req, res) {
    try {
      const user = await User.findById(req.user.id);

      const { id } = req.params;
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      user.favoritePlaylist = user.favoritePlaylist.filter((songId) => {
        if (songId.toString() !== id) {
        }
        return songId.toString() !== id;
      });

      await user.save();

      await Song.updateOne(
        { _id: id },
        { $pull: { favoriteBy: user._id } } // Xoá user._id khỏi favoriteBy
      );
      res.status(200).json({
        message: "Favorite song deleted successfully",
        dataFavoriteSong: user.favoritePlaylist,
      });
    } catch (err) {
      console.log(err);
    }
  }
  // [Get] Favorite Song
  async showFavoriteSong(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const favoriteSongs = await Song.find({ favoriteBy: { $in: [user._id] } })
        .populate("favoriteBy", "name imageSong url composer duration")
        .skip(startIndex)
        .limit(limit)
        .exec();

      res.status(200).json({
        data: favoriteSongs,
        currentPage: page,
        hasMore: endIndex < user.favoritePlaylist.length,
        length: user.favoritePlaylist,
      });
    } catch (err) {
      res.status(500).json({ message: "Error found", error: err });
    }
  }
  // [Post] Follow
  async addFollow(req, res) {
    try {
      const user = await User.findById(req.user.id);
      const artist = req.body.artist;
      const { name } = artist;
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      const isHasFollow = user.follow.some((follow) => {
        return follow?.name === name;
      });
      if (!isHasFollow) {
        user.follow.push(artist);
        await user.save();
        res.status(200).json({ message: "Follow added successfully" });
      } else {
        return res.status(401).json({ message: "Follow not successfully" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error added", error: err });
    }
  }
  // [Delete] Follow
  async deleteFollow(req, res) {
    try {
      const user = await User.findById(req.user.id);
      const { id } = req.params;
      let followDelete;
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      user.follow = user.follow.filter((follow) => {
        if (follow._id.toString() == id) {
          followDelete = follow;
        }
        return follow._id.toString() !== id;
      });
      await user.save();
      res
        .status(200)
        .json({ message: "Follow deleted successfully", followDelete });
    } catch (err) {
      res.status(500).json({ message: "Error deleted", error: err });
    }
  }
  // [Get] Follow
  async showFollow(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      res.status(200).json({ data: user.follow });
    } catch (err) {
      res.status(500).json({ message: "Error found", error: err });
    }
  }
}
module.exports = new UserController();
