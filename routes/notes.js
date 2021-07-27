const { Router } = require("express");
const router = Router();
const noteDAO = require('../daos/note');
//const userDAO = require('../daos/user');
const tokenDAO = require('../daos/token');

//router.use(async function isLoggedIn (req, res, next) {
async function isLoggedIn(req, res, next) {
//router.use(req, res, next) => {
  //async function isLoggedIn(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
      const tokenString = bearerToken.split(' ')[1];
      const userId = await tokenDAO.getUserIdFromToken(tokenString);
      if (userId) {
        req.userId = userId.userId;
        next();
      } else if (!userId) {
        res.sendStatus(401);
      }
    } else if (!bearerToken) {
      res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(401);
    next();
  }
//}
}//);

// Create: POST /notes
// POST / - If the user is logged in, 
// it should store the incoming note along with their userId
router.post("/", isLoggedIn, async (req, res, next) => {  
  const userId = req.userId;
  const note = req.body;
  //note.userId = userId;
  if (!note || JSON.stringify(note) === '{}') {
    //res.status(400).send('Note is required');
    return res.sendStatus(400);
  } else {
    try {
      const savedNote = await noteDAO.createNote(userId, note);
      res.json(savedNote);
    } catch (e) {
      //res.status(500).send(e.message);
      next(e);
    }
  }
});

// Get all of my notes: GET /notes
// GET / - If the user is logged in, it should get all notes for their userId
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const notes = await noteDAO.getUserNotes(req.userId);
    res.json(notes);
  } catch (e) {
    next(e);
  }
});

// Get a single note: GET /notes/:id
// GET /:id - If the user is logged in, 
// it should get the note with the provided id and that has their userId
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const note = await noteDAO.getNote(req.userId, req.params.id);
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
  //function errorMessages (err, req, res, next) {
  if (err.message.includes("invalid")) {
    res.status(400).send('Invalid ID provided');
  } else if (err.message.includes("token")) {
    res.sendStatus(401);
  } else {
    res.status(500).send('Something broke!');
  }
});

module.exports = router;