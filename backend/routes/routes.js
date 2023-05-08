const express = require("express");
const router = express.Router();
const axios = require('axios');
const { param } = require("express/lib/request");


// index page
router.get("/", function (req, res) {
  
  res.render("pages/index");
});

// about page
router.get("/about", function (req, res) {
  res.render("pages/about");
});

// about page
router.get("/test", function (req, res) {
  res.render("pages/character-test");
});

router.get("/characters", async function (req, res) {

    const query_params = {
        api_key: process.env.COMIC_VINE_API_KEY,
        field_list: "name,image,id,origin,publisher",
        limit:10,
        format:"json",
        offset:20
    }
    const characters_api = await axios.get(process.env.GET_CHARACTERS_API,{params:query_params})
    console.log(characters_api.data.results);

  res.render("pages/characters",{data:characters_api.data.results});
});
router.get("/comics", function (req, res) {
    res.render("pages/comics");
  });

module.exports = router;
