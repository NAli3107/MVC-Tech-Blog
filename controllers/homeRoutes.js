const router = require("express").Router();
const { User, BlogPost } = require("../models");
// const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [User],
    });

    const postData = posts.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      postData,
      logged_in: req.session.logged_in,
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

    res.render("post", {
      ...posts,
      logged_in: req.session.logged_in,
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
          attributes: ["name"],
        },
      ],
    });

    const posts = projectData.get({ plain: true });

    res.render("post", {
      ...posts,
      logged_in: req.session.logged_in,
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

// router.get("/signup", (req, res) => {
//   console.log("route is being hit");
//   if (req.session.logged_in) {
//     res.redirect("/");
//   }
//   res.render("signup");
// });

module.exports = router;
