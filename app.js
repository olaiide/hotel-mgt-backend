const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const app = express();
require("dotenv").config();

const PORT = 5000;

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello world')
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });