const { Router } = require("express");
const router = Router();

// router.use((req, res, next) => {
//   console.log(`${req.method} ${req.url} at ${new Date()}`);
//   next();
// },
// //   function isLoggedIn (req, res, next) {
    
// //   }
// );

router.use("/login", require('./login'));
router.use("/notes", require('./notes'));

module.exports = router;