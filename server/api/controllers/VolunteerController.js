const volunteer = require('../../../models/volunteer');
const { Volunteer } = require('../../sequelize');

exports.createVolunteer = function (req, res) {
    Volunteer.create(req.body)
        .then(() => res.send('added successfully'))
        .catch((err) => res.status(400).send(err))

}

exports.uploadVolunteerPicture = function (req, res) {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.getAllVolunteers = async function (req, res) {
    try {
        const volunteers = await Volunteer.findAll();
        res.send(JSON.stringify(volunteers, null, 2))
    }
    catch (err) {
        res.status(400).send(err)
    }

}