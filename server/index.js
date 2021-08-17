const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();
// to parse json data from request object
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// to get all routes from /routes
const mountRoutes = require('./routes');
mountRoutes(app);

// start listening on port 5000
app.listen(5000, () => console.log("Running on http://localhost:5000"));