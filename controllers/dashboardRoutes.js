/**
 route for all blog posts from a specific user ID

 new posts - get requests - just rendering pages

 edit post pages - get requests - just rendering pages

 */

 const router = require('express').Router();
 const { User } = require('../models');
 const withAuth = require('../utils/auth')

 router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Project }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });