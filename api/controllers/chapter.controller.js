const db = require("../models");
const Tutorial= db.tutorial
const Chapter = db.chapter;
const Roles = db.role;
const User = db.user;

exports.findAll = (req, res) => {
    Chapter.findAll({
        include: [
            {model: Tutorial, as: Tutorial}
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving chapters."
            });
        });
};

exports.findAllByTutorial = (req, res) => {
    const id = req.params.id;
    Chapter.findAll({
        where: {
            '$tutorial.id$': id
        },
        include: [
            {model: Tutorial, as: Tutorial}
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving chapters."
            });
        });
};

exports.findOne = (req, res) => {
    const slug = req.params.slug;
    Chapter.findOne({
        where: { slug: slug },
        include: [
            {
                model: Tutorial, as: Tutorial
            },

        ]
    }).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Chapter with slug=" + slug
            });
        });
};

exports.update = (req, res) => {
    const slug = req.params.slug;

    Chapter.update(req.body, {
        where: { slug: slug }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with slug=${slug}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with slug=" + slug
            });
        });
};

exports.delete = (req, res) => {
    const slug = req.params.slug;

    Chapter.destroy({
        where: { slug: slug }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with slug=${slug}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with slug=" + slug
            });
        });
};
