const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();
const roomsRoutes = require('./routes/rooms-routes')
const HttpError = require("./models/https-error")

const PORT = 5000;

app.use(bodyParser.json());

app.use('/api', roomsRoutes)

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404)
    throw error;
})


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });