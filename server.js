// Library which will allow you to create a Web application more simply than with the http object directly.
// It provides a set of methods for processing HTTP requests and provides a middleware system to extend its functionality.
const express = require("express");

//Allowing to manage the data posted by a form for example.
const bodyParser = require("body-parser");

//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cors = require("cors");

//Put the express module inside a const
const app = express();

//Set cors options
var corsOptions = {
    origin: "http://127.0.0.1:8080"
};

//Link the cors middleware to an object instance
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./api/models");
db.sequelize.sync();

//Routes
require("./api/routes/tutorial.routes")(app);
require('./api/routes/auth.routes')(app);
require('./api/routes/user.routes')(app);
require('./api/routes/chapter.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
