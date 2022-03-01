const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();
const roomsRoutes = require('./routes/rooms-routes')
const usersRoutes = require('./routes/users-routes')
const HttpError = require("./models/https-error")

const PORT = 5000;

app.use(bodyParser.json());

app.use('/api', roomsRoutes)
app.use('/api', usersRoutes)
app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404)
    throw error;
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occured!" });
  });
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });