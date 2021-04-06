const Category = require('../models/category.model');

exports.create = (req, res) => {
    const category = new Category({
        title: req.body.title
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

exports.getAll = (req, res) => {
    Category.find().then(
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
