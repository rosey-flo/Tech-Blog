const router = require('express').Router()
const view_controller = require('../controllers/view_controller')

//Homepage Routes
router.get('/', view_controller.showHomePage)

// module.exports = router