const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

// you will have the ability to create routes
const app = express();

//Body parser alternative
app.use(cors());
app.use(express.json({ extended: false }));

// IMPORT ROUTES
app.use('/posts', require('./routes/posts'));

// CONNECT TO DB
mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('connectd to db')
);

// LISTEN
app.listen(3000);
