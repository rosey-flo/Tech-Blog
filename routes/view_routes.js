const router = require('express').Router()
const view_controller = require('../controllers/view_controller')

//Homepage Routes
router.get('/', view_controller.showHomePage)

router.get('/register', view_controller.showRegisterPage)

router.get('/login', view_controller.showLoginPage)

//dashbaord route
router.get('/dashboard', view_controller.showDashboardPage)
   

module.exports = router