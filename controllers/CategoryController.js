import CategoryModel from "../models/Category.js"


export const getAll = async (req, res) => {
    try {
        const categories = await CategoryModel.find()
        res.send(categories)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error get all categories"
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new CategoryModel({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
        });
        const category = await doc.save();
        res.json(category);

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error category create"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const doc = await CategoryModel.findOneAndDelete({
                _id: categoryId
            }
        )
        if (!doc) {
            return res.status(404).json({
                message: "not found category"
            })
        }

        res.send({
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: "error delete category catchga tuwdi"
        })
    }
}

export const update = async (req, res) => {
    console.log(req.params)
    try {
        const categoryId = req.params.id;
        await CategoryModel.updateOne({
            _id: categoryId
        }, {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
        })
        res.json({success: true})

    } catch (err) {
        res.status(500).json({
            message: "error update category catchga tuwdi"
        })
    }
}