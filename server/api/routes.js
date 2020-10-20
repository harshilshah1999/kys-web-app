import express from 'express';
const multer = require('multer');
const path = require('path');
const VolunteerController = require('./controllers/VolunteerController');

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

// const upload = multer({
//     dest: './static/volunteer_profile'
// })

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/volunteer_profile')
    },
    filename: function (req, file, cb) {
        console.log(req.headers.filename)
        cb(null, req.headers.filename + '_' + file.originalname) //Appending extension
    }
})

var upload = multer({ storage: storage });

router.route('/createVolunteer').post(VolunteerController.createVolunteer)
router.route('/uploadVolunteerPicture').post(upload.single('file'), VolunteerController.uploadVolunteerPicture)
router.route('/getAllVolunteers').get(VolunteerController.getAllVolunteers)
router.route('*').get((req, res) => res.send('No Such Endpoint'));

module.exports = router