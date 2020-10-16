const { Volunteer } = require('../../sequelize');

exports.createTestUser = function (req, res) {
    Volunteer.create({ name: 'test' })
        .then(() => res.send('user created'))
        .catch(err => console.log(err))
}