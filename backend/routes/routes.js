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
    var name = req.query.name || "";
    // console.log(page);
    const query_params = {
        api_key: process.env.COMIC_VINE_API_KEY,
        field_list: "name,image,id,origin,publisher",
        limit:12,
        format:"json",
        offset:(page-1)*12,
        filter:"name:"+name
    }
    // console.log("name:"+name);
    const characters_api = await axios.get(process.env.GET_CHARACTERS_API,{params:query_params})
    // console.log(characters_api.data.results);

  res.render("pages/characters",{data:characters_api.data.results,page:parseInt(page),name:name});
});

router.get("/comics", async function (req, res) {

  var page = req.query.page || 1;
  var name = req.query.name || "";
  // console.log(page);
  const query_params = {
      api_key: process.env.COMIC_VINE_API_KEY,
      field_list: "cover_date,image",
      limit:12,
      format:"json",
      offset:(page-1)*12,
      filter:"name:"+name
  }
  // console.log("name:"+name);
  const characters_api = await axios.get(process.env.GET_COMICS_API,{params:query_params})
  // console.log(characters_api.data.results);

res.render("pages/comics",{data:characters_api.data.results,page:parseInt(page),name:name});
});

module.exports = router;
