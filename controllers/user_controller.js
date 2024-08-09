const { User } = require('../models')

module.exports = {
    async registerUser(req, res) {
        try {
            const user = await User.create(req.body)
        //store some  kind of value to the server that tracks who this user is, so later on when they make a request, we can pull specific data related to thm and not someone else
            req.session.user_id = user.id

            res.redirect('/dashboard')
        } catch (error) {
            res.redirect('/register');

        }

    },

    async logInUser(req, res) {

    },

    async logOutUser(req, res) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    },

    async createPost(req, res) {
        
        res.redirect('/posts')
    },

    async editPost(req, res) {
        
        res.redirect('/posts')
    },

    async deletePost(req, res) {

        res.redirect('/posts')
    },

}

