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
            password: hash,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            address: req.body.address
        });
        user.save()
            .then((data) => {
                let userToken = jwt.sign({
                    id: data._id
                },
                process.env.SECRET_JWT,
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

exports.getAll = (req, res) => {
  User.find().then(
      (data) => {
        res.status(200).json(data);
      }
  ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
  );
}


exports.getOne = (req, res) => {
    User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User with id ${req.params.id} not found`,
          // message:"User with id" + req.params.id +"not found"
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
}


exports.login = (req, res) => {
    User.findOne({
      email: req.body.email,
    })
    .then((data) => {
          
    if (!data) {
      return res.status(404).send({
        auth: false,
          token: null,
          message: `No user find with email ${req.body.email}`,
      });
    }
  
    let passwordIsValid = bcrypt.compareSync(
      req.body.password,
      data.password
    );
  
    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: 'password is not valid',
      });
    }
  
    let userToken = jwt.sign(
      {
        id: data._id,
        isAdmin: data.isAdmin
      },
      process.env.SECRET_JWT,
        {expiresIn: 86400}
      );
  
      res.send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};


exports.updateOne = (req, res) => {
  var user = User.findById(req.params.id)

  User.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address
    }
  )
  .then((data) => {
    user
    res.send({
      user: data
    })
  })
  .catch((err) => {
    res.status(500).send({
      error: 500,
      message: err.message || "NULL"
      })
  })
  
};


exports.deleteOne = (req, res) => {

  var user = User.findById(req.params.id)
  User.remove(user)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User with id ${req.params.id} not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
  
};
