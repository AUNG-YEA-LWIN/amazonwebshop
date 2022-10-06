require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const DefaultData = require('./defaultdata');
const Products = require('./models/productsSchema');
const cors = require('cors');
require('./db/conn');
const router = require('./routes/router');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

// //for deployment
if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

DefaultData();