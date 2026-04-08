const User = require('../models/User');
const Paper = require('../models/Paper');

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.makeAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.role = "admin";
  await user.save();

  res.json({ message: "User promoted to admin" });
};

exports.getAllPapers = async (req, res) => {
  const papers = await Paper.find().populate('uploadedBy', 'name email');
  res.json(papers);
};

exports.deletePaper = async (req, res) => {
  await Paper.findByIdAndDelete(req.params.id);
  res.json({ message: "Paper deleted" });
};

exports.getStats = async (req, res) => {
  const users = await User.countDocuments();
  const papers = await Paper.countDocuments();

  res.json({
    totalUsers: users,
    totalPapers: papers
  });
};