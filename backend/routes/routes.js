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

    var page = req.query.page || 1;
    // console.log(page);
    const query_params = {
        api_key: process.env.COMIC_VINE_API_KEY,
        field_list: "name,image,id,origin,publisher",
        limit:12,
        format:"json",
        offset:(page-1)*12
    }
    const characters_api = await axios.get(process.env.GET_CHARACTERS_API,{params:query_params})
    // console.log(characters_api.data.results);

  res.render("pages/characters",{data:characters_api.data.results,page:parseInt(page)});
});
router.get("/comics", function (req, res) {
    res.render("pages/comics");
  });

module.exports = router;
