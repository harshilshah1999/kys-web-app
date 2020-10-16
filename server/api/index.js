const router = require('./routes');
const { syncDB } = require('../sequelize')

//sync the models
syncDB();

export default {
    path: '/api',
    handler: router
}