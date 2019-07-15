const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')
const middlewares = require('./middlewares');
const api = require('./api');
const app = express();
/*
const morgan = require('morgan');
const helmet = require('helmet');
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
*/
const cors= require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
app.get('/', (req, res) => {
    res.send("asd")
});
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
module.exports = app;
