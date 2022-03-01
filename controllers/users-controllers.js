const { validationResult } = require("express-validator");
const User = require("../models/users-model");
const HttpError = require("../models/https-error");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser)
    return next(
      new HttpError("User exists already, please Login instead", 422)
    );
  const createdUser = new User({
    name,
    email,
    password,
  });

  try {
    await createdUser.save();
    res.status(200).json({ user: createdUser.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError(
      "Could not sign up user, Something went wrong.",
      500
    );
    return next(error);
  }
};

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const { email, password } = req.body;
  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Login failed, Something went wrong.", 500);
    return next(error);
  }
  if (!identifiedUser || identifiedUser.password !== password) {
    res.status(200).json({ msg: "Invalid details" });
  }
  res
    .status(200)
    .json({
      message: "Logged in!",
      user: identifiedUser.toObject({ getters: true }),
    });
};
exports.signup = signup;
exports.login = login;
