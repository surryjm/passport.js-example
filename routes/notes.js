const { Router } = require("express");
const router = Router();
const noteDAO = require('../daos/note');

router.use(async (req, res, next) => {
  const { userId } = req.params;
  //const { email } = req.params;
  const user = await userDAO.getUser(userId);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    req.user = user;
    next();
  }
});

// Create: POST /notes
// POST / - If the user is logged in, 
// it should store the incoming note along with their userId
router.post("/", async (req, res, next) => {
  const userId = req.userId;
  const note = req.body;
  //note.userId = userId;
  if (!note || JSON.stringify(note) === '{}') {
    res.status(400).send('Note is required');
  } else {
    try {
      const savedNote = await noteDAO.createNote(userId, note);
      res.json(savedNote);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
});

// Get all of my notes: GET /notes
// GET / - If the user is logged in, it should get all notes for their userId
router.get("/", async (req, res, next) => {

});

// Get a single note: GET /notes/:id
// GET /:id - If the user is logged in, 
// it should get the note with the provided id and that has their userId
router.get("/:id", async (req, res, next) => {
  try {
    const note = await noteDAO.getNote(req.user._id, req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.use(function (err, req, res, next) {
  if (err.message.includes("Cast to ObjectId failed")) {
    res.status(400).send('Invalid ID provided');
  } else {
    res.status(500).send('Something broke!');
  }
});

module.exports = router;