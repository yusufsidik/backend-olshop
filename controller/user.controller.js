import User from "../models/user.model.js";

const getDataUser = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ message: "All user", data: users });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ message: "Data user", data: user });
};

export { getDataUser, getUser };