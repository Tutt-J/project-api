const { authJwt } = require("../middlewares");

module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/",users.findAll);
    router.get("/role/:role", [authJwt.verifyToken, authJwt.isAdmin], users.findAllByRoles);
    router.get("/:slug", [authJwt.verifyToken, authJwt.isAdmin], users.findOne);
    router.put("/:slug", [authJwt.verifyToken, authJwt.isAdmin], users.update);
    router.delete("/:slug", [authJwt.verifyToken, authJwt.isAdmin],users.delete);

    app.use('/api/users', router);

};
