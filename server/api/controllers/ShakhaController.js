const { Shakha } = require('../../sequelize')

exports.createShakha = function (req, res) {
    Shakha.create(req.body)
        .then(() => res.send('added successfully'))
        .catch((err) => res.status(400).send(err))
}

exports.getAllShakha = async function (req, res) {
    try {
        const shakha = await Shakha.findAll();
        res.send(JSON.stringify(shakha, null, 2))
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

exports.updateShakha = async function (req, res) {
    try {
        const shakha = await Shakha.findByPk(req.body.id);
        const updatedShakha = await shakha.update(req.body, {
            where: {
                id: req.body.id
            }
        })
        res.send(updatedShakha)
    }
    catch (err) {
        res.status(400).send(err)
    }
}
