const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!

    const path = require('path');

    app.use(express.static(path.join(__dirname, 'client/build')));

    // Express will serve up the index.html file
    // if it doesn't recognize the route

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

// app.use(express.static('public'));

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// });

// console.developers.google.com

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log("Express server is up on port " + PORT);
});