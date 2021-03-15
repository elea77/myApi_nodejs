const Category = require('../models/category.model');

exports.create = (req, res) => {
    const category = new Category({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        img: req.body.img
    });

    category.save()
    .then((data) => {
        res.send({
            category: data,
            created: true
        })
    })
    .catch((err) => {
        console.log(err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while creating category"
        })
    })

}
