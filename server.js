const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path= require('path'),
    expressSession = require('express-session'),
    apiRoutes = require('./server/routes/apiRoutes'),
    webRoutes = require('./server/routes/webRoutes'),
    con = require('./server/config/db');

const app = express();

//session
app.use(expressSession({
    secret: 'mytoken',
    saveUninitialized: true,
    resave: true
}));

//request body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//cors settings
app.use(cors());

//static files
app.use(express.static(path.join(__dirname,'./client')));

//routing
app.use('/api', apiRoutes);
app.use('/', webRoutes);

const port = process.env.PORT || 1300;
app.listen(port, function () {
    console.log('Server is running at http://localhost:' + port);
});