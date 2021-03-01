const User = require('../models/user.model');
const brcypt = require('bcrypt');

exports.create = (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
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
