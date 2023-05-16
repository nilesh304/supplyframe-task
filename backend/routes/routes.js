const express = require("express");
const router = express.Router();
const axios = require('axios');
const { param } = require("express/lib/request");
const path = require('path');


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
  // res("character.html");
  // res.send("./character.html");
  // res.render("",)
  res.contentType("text/html");
  res.sendFile(path.join(__dirname, "../public/character.html"));
  // res.send("../ /character.html");
});

router.get("/test-2", function (req, res) {
  // res("character.html");
  // res.send("./character.html");
  res.render("pages/character-test")
  // res.contentType("text/html");
  // res.sendFile(path.join(__dirname, "../public/character.html"));
  // res.send("../ /character.html");
});

router.get("/characters", async function (req, res) {

    var page = req.query.page || 1;
    var name = req.query.name || "";
    // console.log(page);
    const query_params = {
        api_key: process.env.COMIC_VINE_API_KEY,
        field_list: "name,image,id,origin,publisher,api_detail_url",
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


router.get("/character", async function (req, res) {

  var id = req.query.id || 0;
  
  // console.log(page);
  const query_params = {
      api_key: process.env.COMIC_VINE_API_KEY,
      field_list: "name,gender,image,deck,powers,movies,birth",
      format:"json",
  }
  // // console.log("name:"+name);
  const character_api = await axios.get(process.env.GET_CHARACTER_API+id,{params:query_params})
  // console.log(character_api.data.results,);

  res.render("pages/character",{data:character_api.data.results});
}); 

module.exports = router;
