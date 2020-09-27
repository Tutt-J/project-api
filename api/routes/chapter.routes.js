const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //create new chapter
    //retrieve all chapter
    //retrieve all chapter by tutorial
    //retrieve chapter by id
    //update a chapter with id
    //delete chapter with id
    //delete all chapters by tutorial
    //delete all chapters
};
