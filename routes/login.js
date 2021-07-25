const { Router } = require("express");
const router = Router();

const userDAO = require('../daos/user');
const noteDAO = require('../daos/note');

// Signup: POST /login/signup
// POST /signup - should use bcrypt on the incoming password. 
// Store user with their email and encrypted password, 
// handle conflicts when the email is already in use.
// router.post("/signup", async (req, res, next) => {

// });

// Login: POST /login
// POST / - find the user with the provided email. 
// Use bcrypt to compare stored password with the incoming password. 
// If they match, generate a random token with uuid and return it to the user.
// router.post("/", async (req, res, next) => {

// });

// Change Password POST /login/password
// POST /password - If the user is logged in, store the incoming password using their userId
// router.post("/password", async (req, res, next) => {

// });

// Logout: POST /login/logout
// POST /logout - If the user is logged in, invalidate their token so they can't use it again (remove it)
// router.post("/logout", async (req, res, next) => {

// });

module.exports = router;