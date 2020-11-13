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
        res.status(400).send(err)
    }
}