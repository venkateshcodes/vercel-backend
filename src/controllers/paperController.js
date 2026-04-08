const Paper = require('../models/Paper');

exports.uploadPaper = async (req, res) => {
  const paper = await Paper.create({
    title: req.body.title,
    file: req.file.filename,
    uploadedBy: req.user.id
  });

  res.json(paper);
};

exports.getPapers = async (req, res) => {
  const papers = await Paper.find().populate("uploadedBy");
  res.json(papers);
};