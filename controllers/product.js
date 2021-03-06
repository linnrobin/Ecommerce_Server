const { Product, User } = require('../models')

class Controller {
    static findAll(req, res, next) {
        Product.findAll({
            order: [
                ['id', 'ASC']
            ],
            include: [ User ]
        })
            .then( result => {
                return res.status(200).json({ result })
            })
            .catch( err => {
                return next(err)
            })
    }

    static create(req, res, next) {
        let { name, image_url, price, stock } = req.body
        let newCreate = { name, image_url, price, stock, UserId: req.currentUserId }
        Product.create(newCreate)
            .then( result => {
                return res.status(201).json({
                    result,
                    message: 'Successfully created new product'
                })
            })
            .catch( err => {
                return next(err)
            })
    }

    static delete(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then( result => {
                if (result) {
                    return res.status(200).json({ message: 'Successfully deleted product'})
                } else { 
                    return next({
                        name: 'NotFound',
                        errors: [{ message: 'Product Not Found' }] 
                    })
                }
            })
            .catch( err => {
                return next(err)
            })
    }

    static put(req, res, next) {
        let { id } = req.params
        let { name, image_url, price, stock } = req.body
        let newUpdate = { name, image_url, price, stock }
        Product.update(newUpdate, {
            where: {
                id
            },
            returning: true
        })
            .then( result => {
                if ( result[0] ) {
                    return res.status(200).json({
                        result,
                        message: 'Successfully updated product'
                    })
                } else {
                    return next({
                        name: 'NotFound',
                        errors: [{ message: 'Product Not Found' }]
                    })
                }
            })
            .catch( err => {
                return next(err)
            })
    }

    static findOne(req, res, next) {
        let { id } = req.params
        Product.findOne({
            where: {
                id
            }, 
            include: [ User ]
        })
            .then( result => {
                if (result) {
                    return res.status(200).json({
                        result,
                        message: 'Found'
                    })
                } else {
                    return next({
                        name: 'NotFound',
                        errors: [{ message: 'Product Not Found '}]
                    })
                }
            })
            .catch( err => {
                return next(err)
            })
    }
}

module.exports = Controller