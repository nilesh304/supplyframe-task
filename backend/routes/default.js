const axios = require("axios");
const path = require("path");

function index(req, res) {
  res.render("pages/index");
}

function about(req, res) {
  res.render("pages/about");
}

async function characters(req, res) {
  var page = req.query.page || 1;
  var name = req.query.name || "";
  const query_params = {
    api_key: process.env.COMIC_VINE_API_KEY,
    field_list: "name,image,id,origin,publisher,api_detail_url",
    limit: 12,
    format: "json",
    offset: (page - 1) * 12,
    filter: "name:" + name,
  };
  const characters_api = await axios.get(process.env.GET_CHARACTERS_API, {
    params: query_params,
  });

  res.render("pages/characters", {
    data: characters_api.data.results,
    page: parseInt(page),
    name: name,
  });
}

async function comics(req, res) {
  var page = req.query.page || 1;
  var name = req.query.name || "";
  const query_params = {
    api_key: process.env.COMIC_VINE_API_KEY,
    field_list: "cover_date,image,id",
    limit: 12,
    format: "json",
    offset: (page - 1) * 12,
    filter: "name:" + name,
  };
  const characters_api = await axios.get(process.env.GET_COMICS_API, {
    params: query_params,
  });

  res.render("pages/comics", {
    data: characters_api.data.results,
    page: parseInt(page),
    name: name,
  });
}

async function character(req, res) {
  var id = req.query.id || 0;

  const query_params = {
    api_key: process.env.COMIC_VINE_API_KEY,
    field_list: "name,gender,image,deck,powers,movies,birth",
    format: "json",
  };
  const character_api = await axios.get(process.env.GET_CHARACTER_API + id, {
    params: query_params,
  });

  res.render("pages/character", { data: character_api.data.results });
}

async function get_characters(req, res) {
  var ids = req.query.id;

  const query_params = {
    api_key: process.env.COMIC_VINE_API_KEY,
    field_list: "name,image,id,origin,publisher,api_detail_url",
    format: "json",
  };

  if (Array.isArray(ids)) {
    query_params["filter"] = "id:" + ids.join("|");
  } else {
    query_params["filter"] = "id:" + ids;
  }
  console.log(query_params);

  const characters_api = await axios.get(process.env.GET_CHARACTERS_API, {
    params: query_params,
  });
  console.log(characters_api.data);
  res.send(JSON.stringify(characters_api.data));
}

async function get_favorites(req, res) {
  res.sendFile(path.join(__dirname, "../public/favorites.html"));
}

async function get_comic(req,res) {

    var id = req.query.id || "";
    console.log(id);

    const query_params = {
      api_key: process.env.COMIC_VINE_API_KEY,
      field_list: "name,image,id,origin,publisher,api_detail_url,description",
      format: "json",
    };
    const comic_api = await axios.get(process.env.GET_COMIC_API+id, {
      params: query_params,
    });
    console.log(process.env.GET_COMIC_API+id,comic_api.data.results);

    console.log(comic_api.data.results);
  
    res.render("pages/comic", {
      data: comic_api.data.results,
    });
}

function not_found_page(req, res) {
  res.render("pages/not_found_page.ejs");
}
module.exports = { index, about,characters,comics,character,get_characters,get_favorites,not_found_page,get_comic };
