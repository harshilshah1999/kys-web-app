import express from 'express';
const VolunteerController = require('./controllers/VolunteerController');
const ShakhaController = require('./controllers/ShakhaController');

//Create express Router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()

router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
})

//volunteers
router.route('/createVolunteer').post(VolunteerController.createVolunteer)
router.route('/uploadVolunteerPicture').post(VolunteerController.uploadVolunteerPicture)
router.route('/getAllVolunteers').get(VolunteerController.getAllVolunteers)
router.route('/updateVolunteer').post(VolunteerController.updateVolunteer)

//shakha
router.route('/createShakha').post(ShakhaController.createShakha)
router.route('/getAllShakhas').get(ShakhaController.getAllShakha)
router.route('/updateShakha').post(ShakhaController.updateShakha)

router.route('*').get((req, res) => res.send('No Such Endpoint'));

module.exports = router