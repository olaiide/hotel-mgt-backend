const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/users-controllers");

const router = express.Router();
 
router.post('/signup',  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ], userController.signup)

router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more chracters').isLength({ min : 6}),
], userController.login)

module.exports = router;