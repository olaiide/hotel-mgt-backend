const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();
const roomsRoutes = require('./routes/rooms-routes')
const PORT = 5000;

app.use(bodyParser.json());

app.use('/api', roomsRoutes)



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });