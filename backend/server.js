var express = require('express');
var app = express();
require('dotenv').config();



// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public")); 

// use res.render to load up an ejs view file

app.use("",require("./routes/routes"))

app.listen( process.env.PORT);
console.log('Server is listening on port '+ process.env.PORT);