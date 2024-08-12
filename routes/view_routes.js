const router = require('express').Router();
const view_controller = require('../controllers/view_controller');
const { redirectGuest, redirectUser } = require('./helpers');

// Homepage Route
router.get('/', redirectUser, view_controller.showHomepage);

// Register Route
router.get('/register', redirectUser, view_controller.showRegisterPage);

// Login Route
router.get('/login', redirectUser, view_controller.showLoginPage);

// Dashboard Route - Route to view all posts on the dashboard
router.get('/dashboard', redirectGuest, view_controller.showDashboardPage);

// Show a specific post by ID - Detailed view for a specific post
router.get('/dashboard/:id', redirectGuest, view_controller.showPostByID);

// Create new post form
router.get('/post', redirectGuest, view_controller.showCreatePostPage);






module.exports = router;