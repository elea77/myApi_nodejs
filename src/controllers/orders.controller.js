const Order = require('../models/order.model');
const User = require('../models/user.model');

exports.create = (req, res) => {
    const order = new Order({
        total: req.body.total,
        user: req.body.user,
        products: req.body.products
    });

    order.save()
    .then((data) => {
        User.findByIdAndUpdate(req.body.user, {orders: data._id}).then(() => {
            res.send({
                data: data,
            })
            .catch((err) => res.send(err));
        });
        res.send({
            data: data,
        })
    })
    .catch((err) => {
        console.log(err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while creating order"
        })
    })

}


exports.getAll = (req, res) => {
    Order.find({})
    .populate('products')
    .populate('user')
    .then(
        (data) => {
          res.send({
              data: data,
              created: true
          });
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
    var id = req.params.id;
    Order.findById(id)
    .then((data) => {
        res.send(data);

    })
    .catch((err) => {
        console.log(err.message);
        res.send(err);
    })
}
