const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// app.use(express.static('public'));

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// });

// console.developers.google.com

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("Express server is up on port " + PORT);
});