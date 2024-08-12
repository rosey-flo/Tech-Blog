const router = require('express').Router()
const user_controller = require('../controllers/user_controller');
const view_controller = require('../controllers/view_controller');

//AUTHENTICATION

//REGISTER
router.post('/register', user_controller.registerUser);

// Login
router.post('/login', user_controller.logInUser);

// Log Out
router.get('/logout', user_controller.logOutUser);

// Route for viewing and creating posts
router.get('/post', (req, res) => {
    res.render('post', { title: 'Create a New Blog Post' });
});

router.post('/dashboard', user_controller.createNewPost);

// Route to handle editing a post
router.post('/dashboard/edit/:id', user_controller.editPost);

// Route to handle deleting a post
router.post('/dashboard/delete/:id', user_controller.deletePost);


// // Route to show edit form for a specific post
// router.get('/dashboard/edit/:id', redirectGuest, view_controller.showEditPostPage);

// // Route to handle the form submission for editing a post
// router.post('/dashboard/edit/:id', redirectGuest, view_controller.updatePost);



module.exports = router