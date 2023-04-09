import User from "../model/user-schema.js";

export const userSignup = async (req, res) => {
  try {
    const userExit = await User.findOne({ username: req.body.username });
    if (userExit) {
      return res.status(401).json({ message: "Username already exist" });
    }

    const user = req.body;
    const newUser = new User(user);
    await newUser.save();
    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const userExit = await User.findOne({
      username: username,
      password: password,
    });
    if (userExit) {
      return res.status(200).json({ data: userExit });
    } else {
      return res.status(401).json("Invalid login");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
