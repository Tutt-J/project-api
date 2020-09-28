const { authJwt } = require("../middlewares");

module.exports = function(app) {

    const chapter = require("../controllers/chapter.controller");
    var router = require("express").Router();

    router.get("/", chapter.findAll);
    router.get("/:slug", chapter.findOne);

    app.use('/api/chapters', router);
};
