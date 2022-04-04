const router = require("express").Router();
const {User, BlogPost } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
    BlogPost.findAll({
        include: [User]
    })
})