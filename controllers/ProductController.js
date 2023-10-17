import ProductModel from "../models/Product.js"


export const getAll = async (req, res) => {
    try {
        const products = await ProductModel.find().populate("category").exec()
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error get all products"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.find({
            _id: productId
        }).populate("category").exec()
        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error get one product"
        })
    }
}

export const getByFilters = async (req, res) => {
    try {
        const {category, title} = req.query;
        const filter = {};
        if (category) {
            filter.category = category;
        }
        if (title) {
            filter.title = new RegExp(title, 'i');
        }
        const products = await ProductModel.find(filter)
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error get products by filters"
        })
    }
}

export const getBySelectedCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const products = categoryId !== "all" ? await ProductModel.find({
            category: categoryId
        }) : await ProductModel.find()
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error get products"
        })
    }
}

export const getBySearch = async (req, res) => {
    try {
        const search = req.params.id;
        const results = search !== "all" ? await ProductModel.find({
            title: {$regex: new RegExp(search, 'i')},
        }) : await ProductModel.find();
        res.json(results);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error get products"
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new ProductModel({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            category: req.body.categoryId
        });
        const product = await doc.save();
        res.json(product);

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error product create"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const productId = req.params.id;
        const doc = await ProductModel.findOneAndDelete({
                _id: productId
            }
        )
        if (!doc) {
            return res.status(404).json({
                message: "not found product"
            })
        }

        res.send({
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: "error delete product catchga tuwdi"
        })
    }
}

export const update = async (req, res) => {
    try {
        const productId = req.params.id;
        await ProductModel.updateOne({
            _id: productId
        }, {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            category: req.body.categoryId
        })
        res.json({success: true})

    } catch (err) {
        res.status(500).json({
            message: "error update product catchga tuwdi"
        })
    }
}