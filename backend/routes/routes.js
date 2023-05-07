const express = require("express");
const router = express.Router();

// index page
router.get("/", function (req, res) {
  var mascots = [
    { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
    { name: "Tux", organization: "Linux", birth_year: 1996 },
    { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
  ];
  var tagline =
    "No programming concept is complete without a cute animal mascot.";

  res.render("pages/index", {
    mascots: mascots,
    tagline: tagline,
  });
});

// about page
router.get("/about", function (req, res) {
  res.render("pages/about");
});

// about page
router.get("/test", function (req, res) {
  res.render("pages/character-test");
});

router.get("/characters", function (req, res) {
  res.render("pages/characters");
});
router.get("/comics", function (req, res) {
    res.render("pages/comics");
  });

module.exports = router;
