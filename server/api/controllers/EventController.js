const { Event } = require('../../sequelize')

exports.createEvent = function (req, res) {
    Event.create(req.body)
        .then(() => res.send('added successfully'))
        .catch((err) => res.status(400).send(err))
}

exports.getAllEvents = async function (req, res) {
    try {
        const event = await Event.findAll();
        res.send(JSON.stringify(event, null, 2))
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

exports.updateEvent = async function (req, res) {
    try {
        const event = await Event.findByPk(req.body.id);
        const updatedEvent = await event.update(req.body, {
            where: {
                id: req.body.id
            }
        })
        res.send(updatedEvent)
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

exports.uploadClosedEventImages = function (req, res) {
    console.log(req.body)
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'static/closed_events')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname) //Appending date and filename
        }
    })
    var upload = multer({ storage: storage }).array('files', 20);

    upload(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log(error)
            res.status(400).send('error')
        } else if (error) {
            // An unknown error occurred when uploading.
            console.log(error)
            res.status(400).send('error')
        }
        else {
            res.send('File uploaded successfully')
        }

    })
}