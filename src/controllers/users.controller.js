const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {

    bcrypt.hash(req.body.password, 15)
    .then(hash => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        });
        user.save()
            .then((data) => {
                let userToken = jwt.sign({
                    id: data._id,

                },
                'supersecret',
                {
                    expiresIn: 86400,
                }
                );
            res.send({
            token:userToken,
             auth: true
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


exports.login = (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'user not found'})
        }
        bcrypt.compare(req.body.password, user.password)
            .then(comp =>{
                if(!comp){
                    return res.status(401).json({ error: 'password wrong'})
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'supersecret',
                        { expiresIn: 86400 },
                        
                    ),
                    auth: true
                });
            })
            .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({error}))
}