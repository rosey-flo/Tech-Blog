const router = require('express').Router()
const user_controller = require('../controllers/user_controller')

//AUTHENTICATION

//REGISTER
router.post('/register', user_controller.registerUser)

//login
router.post('/login', user_controller.logInUser)

//logout
router.post('/logout', user_controller.logOutUser)

//Make blog post
router.post('/', user_controller.createPost)

//Edit blog post
router.post('/', user_controller.editPost)

//delete blog post
router.delete('/:id', user_controller.deletePost)

module.exports = router