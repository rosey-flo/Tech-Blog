const { User, Post, Comment } = require('../models');

module.exports = {
  async showHomepage(req, res) {
    
    try {
      // Fetch all posts with associated user information and comments
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['email'],
          },
          {
            model: Comment,
            attributes: ['content', 'createdAt'],
            include: [
              {
                model: User,
                attributes: ['email']
              }
            ]
          }
        ],
        order: [['createdAt', 'DESC']], // Optional: Order posts by creation date
      });
      const serializedPost = posts.map((post) => post.get({plain:true}))
      console.log(serializedPost)
      res.render('homepage', {
        title: 'Tech Blog - Homepage',
        posts: serializedPost
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('An error occurred while fetching posts.');
    }
  },

  showRegisterPage(req, res) {
  res.render('register', {
    title: 'Tech Blog - Register',
    register: true
  })
},

showLoginPage(req, res) {
  res.render('login', {
    title: 'Tech Blog - Log In',
    login: true
  });
},


  async showCreatePostPage(req, res) {
  try {
    // Fetch user information
    const user = await User.findByPk(req.session.user_id, {
      attributes: ['email']
    });
    res.render('post', {
      title: 'Tech Blog - Post Creation',
      user: user ? user.get({ plain: true }) : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while rendering the dashboard page.');
  }
},

  async showDashboardPage(req, res) {
  try {
    // Fetch user information
    const user = await User.findByPk(req.session.user_id, {
      attributes: ['email']
    });

    // Fetch posts created by the logged-in user
    const posts = await Post.findAll({
      where: { user_id: req.session.user_id },
      order: [['createdAt', 'DESC']] // Optional: Order posts by creation date
    });

    res.render('dashboard', {
      title: 'Your Dashboard',
      user: user.get({ plain: true }),
      posts: posts.map(post => post.get({ plain: true }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while rendering the dashboard page.');
  }
},


  async showPostByID(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.session.user_id;
    console.log(req.params)

    // console.log('Post ID:', postId);
    // console.log('User ID:', userId);

    const user = await User.findByPk(userId, {
      attributes: ['email']
    });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    const post = await Post.findOne({
      where: { id: postId, user_id: userId },
      include: [User],
      attributes: ['id', 'title', 'content', 'createdAt']
    });

    console.log('Fetched Post:', post); // this line is for debugging

    if (!post) {
      return res.status(404).send('Post not found.');
    }
    // console.log(User.associations);
    // console.log(Post.associations);

    res.render('postID', {
      title: `Post Details - ${post.title}`,
      post: post.get({ plain: true }),
      user: user ? user.get({ plain: true }) : null
    });
  } catch (error) {
    console.error('Error fetching post details:', error);
    res.status(500).send('An error occurred while fetching post details.');
  }
}
}