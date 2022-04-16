const router = require("express").Router();
const { User, BlogPost } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [User],
    });
    const postData = posts.map((post) => post.get({ plain: true }));
    // res.render after create handlebars
    // res.json(postData);
    res.render("homePage", {
        postData,
        logged_in: req.session.logged_in,
    })
  } catch (err) {
    console.log(err);
  }
});



/* add get request for getting blogpost by id */

module.exports = router;
