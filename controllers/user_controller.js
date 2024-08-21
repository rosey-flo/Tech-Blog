const { User, Post, Comment } = require('../models');

module.exports = {
  async registerUser(req, res) {
    try {
      const user = await User.create(req.body);

      // Store some kind of value to the server that tracks who this user is, so later on when they make a request, we can pull specific data related to them and not someone else
      req.session.user_id = user.id;

      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
      res.redirect('/register');
    }
  },

  async logInUser(req, res) {
    const formData = req.body;
    // Get the user
    const user = await User.findOne({
      where: {
        email: formData.email
      }
    });

    // If the user was not found, redirect them to register
    if (!user) {
      return res.redirect('/register');
    }

    // Check the password that was provided through the form to ensure it's the same as the stored password in the database
    const valid_pass = await user.validatePassword(formData.password);

    if (!valid_pass) {
      //return res.redirect('/login');
      return res.json({ success: false, message: 'Please enter the correct password.' });
    }


    // The user is validated and now we need to create a session for them and send a cookie
    req.session.user_id = user.id;

    res.redirect('/dashboard');
  },

  logOutUser(req, res) {
    req.session.destroy();

    res.redirect('/');
  },




  ///////UNMADE ROUTES
  async createNewPost(req, res) {
    try {
      const { title, content } = req.body;
      const userId = req.session.user_id;

      if (!userId) {
        return res.redirect('/login'); // Ensure user is logged in
      }

      await Post.create({
        title,
        content,
        user_id: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      res.redirect('/dashboard'); // Redirect to dashboard or where appropriate
    } catch (error) {
      console.error(error);
      res.redirect('/dashboard'); // Handle error scenario
    }
  },

  async editPost(req, res) {
    try {
      const postId = req.params.id;
      const { title, content } = req.body;
      const userId = req.session.user_id;
      console.log('test', postId)
      const post = await Post.findByPk(postId);

      if (!post || post.user_id !== userId) {
        return res.redirect('/dashboard');
      }

      await post.update({ title, content });
      res.redirect('/dashboard/edit/' + postId); // Redirect to dashboard or where appropriate
    } catch (error) {
      console.error(error);
      res.redirect('/dashboard'); // Handle error scenario
    }
  },
  async deletePost(req, res) {
    try {
      const postId = req.params.id;

      const post = await Post.findByPk(postId);


      if (!post) {
        return res.redirect('/dashboard'); // Post not found
      }

      await post.destroy();
      res.redirect('/dashboard'); // Redirect to dashboard or where appropriate
    } catch (error) {
      console.error(error);
      res.redirect('/dashboard'); // Handle error scenario
    }
  },

  async createComment(req, res) {
    try {
      const { content } = req.body;
      console.log('message', content)
      const userId = req.session.user_id;
      const postId = req.params.id

      if (!userId) {
        return res.redirect('/login'); // Ensure user is logged in
      }

      const createdComment = await Comment.create({
        content,
        user_id: userId,
        post_id: postId,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      console.log('these are my created comments:', createdComment, 'end')
      res.redirect('/'); 
    } catch (error) {
      console.error(error);
      res.redirect('/dashboard'); // Handle error scenario
    }
  },
};
