const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [User],
    });

    const postData = posts.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      postData,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/posts", async (req, res) => {
  try {
    const postData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name", "id"],
        },
      ],
    });

    const posts = postData.get({ plain: true });

    res.render("posts", {
      ...posts,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });

    const posts = postData.get({ plain: true });

    res.render("posts", {
      ...posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  }
  res.render("login");
});

module.exports = router;
