const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = function(app) {
    app.post('/api/surveys', requireLogin, requireCredits, function(req, res) {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(function(email) {
                return { email: email.trim() }
            }),
            _user: req.user.id,
            dateSent: Date.now()
        });
    });

    // app.get('/api/current_user', function(req, res) {
    //     res.send(req.user);
    // });
};
