const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        });
        user.save()
            .then((data) => {
                res.send({
                user: data,
                created: true
            })
        })
        .catch((err) => {
            console.log(err.message);    
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating user"
            })
        })
    })

}


exports.getOne = (req, res) => {
    var id = req.params.id;
    User.findById(id)
    .then((data) => {
        res.send(data);

    })
    .catch((err) => {
        console.log(err.message);
        res.send(err);
    })
}
