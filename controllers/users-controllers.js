const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jtw = require("jsonwebtoken");
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
      new HttpError("User exists already, please Login instead", 500)
    );
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(
      new HttpError("Could not create user, please try again later", 500)
    );
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Could not sign up user, Something went wrong.",
      500
    );
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "secret-key",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Could not sign up user, Something went wrong.",
      500
    );
    return next(error);
  }

 // res.status(200).json({ user: createdUser.toObject({ getters: true }) });
  res.status(201).json({userId : createdUser.id, email : createdUser.email, token : token})
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
  if (!identifiedUser) {
    const error = new HttpError("Invalid credentials, please try again", 401);
    return next(error);
  }
  let isValidPassword;
  try {
    await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    const error = new HttpError("Login failed, try again later.", 500);
    return next(error);
  }
  if (!isValidPassword) {
    const error = new HttpError("Invalid credentials, please try again", 401);
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "secret-key",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Login failed, try again later.",
      500
    );
    return next(error);
  }
  res.status(200).json({
    message: "Logged in!",
    userId : identifiedUser.id,
    email : identifiedUser.email,
    token : token
  });
};
exports.signup = signup;
exports.login = login;
