const express = require("express");
const router = express.Router();
const path = require("path");

const  { index, about,characters,comics,character,get_characters,get_favorites,not_found_page } = require('./default.js');

// index page
router.get("/", index);

// about page
router.get("/about",about );

// about page
router.get("/test", function (req, res) {
  res.contentType("text/html");
  res.sendFile(path.join(__dirname, "../public/character.html"));
});

router.get("/test-2", function (req, res) {
  res.render("pages/character-test");
});

router.get("/characters",characters);

router.get("/comics", comics);


router.get("/character", character);



router.get("/get-characters", get_characters);

router.get("/favorites", get_favorites);

router.get("*", not_found_page);

module.exports = router;
