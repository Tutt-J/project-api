const db = require("../models");
const User = db.user;
const Roles = db.role;

exports.findAll = (req, res) => {
    User.findAll({
        include: [
            {model: Roles, as: Roles.tableName}
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.findAllByRoles = (req, res) => {
    const role = req.params.role;
    User.findAll({
        where: {
            '$name$': role
        },
        include: [
            {model: Roles, as: Roles.tableName}
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.findOne = (req, res) => {
    const slug = req.params.slug;
    User.findOne({
        where: { slug: slug },
        include: [
            {model: Roles, as: Roles.tableName}
        ]
    }).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with slug=" + slug
            });
        });
};

exports.update = (req, res) => {
    const slug = req.params.slug;

    User.update(req.body, {
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

    User.destroy({
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
