const {User} = require('../models')

module.exports = {
    showHomePage(req, res) {
        //this is meant to render to homepage
        //refers to the hbs homepage file within views
        res.render('homepage', {
            title: 'Project Tracker - Homepage'
        });
    },
    showRegisterPage(req, res) {
        res.render('register', {
            title: 'Project Tracker - Register'
        })
    },
    showLoginPage(req, res) {
        res.render('register', {
            title: 'Project Tracker - Login'
        })
    },
    async showDashboardPage(req, res) {
        const user = await User.findByPk(req.session.user_id, {
            attributes: ['email']
        })
        res.render('dashboard', {
            user: user.get({plain:true}),
            title: 'Project Tracker - Dashboard'
        })

        
    }
}
//ALL THE RESUABLE {{{EXAMPLE}}} YOU WOULD LIKE TO USE SHOULD BE STATED HERE BESIDES BODY

