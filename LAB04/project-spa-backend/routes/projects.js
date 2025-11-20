// Import express and create router object
const express = require("express");
const router = express.Router();
// Import the Project model
const Project = require("../models/project");
// Configure route handlers
// GET /projects/ - List all projects
router.get("/", async (req, res, next) => {
  let projects = await Project.find().sort({ dueDate: 1 });
  // Path is views/projects/index.hbs
  res.render("projects/index", { title: "Projects", projects: projects });
});

router.post('/', (req, res) => {
    Project.create(req.body)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(501).json(err));
});

router.delete('/:_id', (req, res) => {
  Project.remove({ _id: req.params._id })
    .then(() => res.status(204).send())
    .catch(err => res.status(400).json(err));
});

router.put('/', (req, res) => {
  Project.findOneAndUpdate(
    { _id: req.body._id },  // filter
    req.body,               // updated data
    { new: true }           // return updated doc
  )
    .then(() => res.status(202).send())
    .catch(err => res.status(400).json(err));
});

// Export the router object for use in app.js
module.exports = router;