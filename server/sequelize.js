const { Sequelize, DataTypes } = require('sequelize');
const VolunteerModel = require('../models/volunteer');
const ShakhaModel = require('../models/shakha');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

const Volunteer = VolunteerModel(sequelize, DataTypes)
const Shakha = ShakhaModel(sequelize, DataTypes)

sequelize.authenticate()
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err))

function syncDB() {

    //Sync all models
    sequelize.sync()
        .then(() => console.log('All the models synced'))
        .catch((err) => console.log(err))
}

module.exports = {
    syncDB,
    Volunteer,
    Shakha
}