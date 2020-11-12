const { Volunteer } = require('../../sequelize');

const multer = require('multer');
const { unlink } = require('fs');

exports.createVolunteer = function (req, res) {
    Volunteer.create(req.body)
        .then(() => res.send('added successfully'))
        .catch((err) => res.status(400).send(err))

}

exports.uploadVolunteerPicture = function (req, res) {
    if (req.headers.hasOwnProperty('oldfile')) {
        unlink('static/volunteer_profile/' + req.headers.oldfile, (err) => console.log(err))
    }

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'static/volunteer_profile')
        },
        filename: function (req, file, cb) {
            cb(null, req.headers.filename + '_' + file.originalname) //Appending extension
        }
    })
    var upload = multer({ storage: storage }).single('file');

    upload(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.status(400).send('error')
        } else if (error) {
            // An unknown error occurred when uploading.
            res.status(400).send('error')
        }
        else {
            res.send('File uploaded successfully')
        }

    })
}

exports.getAllVolunteers = async function (req, res) {
    try {
        const volunteers = await Volunteer.findAll();
        res.send(JSON.stringify(volunteers, null, 2))
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)

    }

}

exports.updateVolunteer = async function (req, res) {
    try {
        const volunteer = await Volunteer.findByPk(req.body.id);
        const updatedVolunteer = await volunteer.update(req.body, {
            where: {
                id: req.body.id
            }
        })
        res.send(updatedVolunteer)
    }
    catch (err) {
        res.status(400).send(err)
    }
}
