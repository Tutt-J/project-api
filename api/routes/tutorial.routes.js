const { authJwt } = require("../middlewares");

module.exports = app => {
    const tutorial = require("../controllers/tutorial.controller.js");
    const chapter = require("../controllers/chapter.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", [authJwt.verifyToken], tutorial.create);

    // Retrieve all Tutorials
    router.get("/",  [authJwt.verifyToken], tutorial.findAll);

    // Retrieve all published Tutorials
    router.get("/published", [authJwt.verifyToken, authJwt.isAdmin], tutorial.findAllPublished);

    router.get("/:id/chapters", chapter.findAllByTutorial);

    // Retrieve a single Tutorial with id
    router.get("/:id", [authJwt.verifyToken], tutorial.findOne);

    // Update a Tutorial with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], tutorial.update);

    // Delete a Tutorial with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], tutorial.delete);

    // Delete all Tutorials
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], tutorial.deleteAll);

    app.use('/api/tutorials', router);
};