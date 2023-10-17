import PostModel from "../models/Post.js"


export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("user").exec()
        res.send(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error get all posts"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.findOneAndUpdate(
            {
                _id: postId
            },
            {
                $inc: {viewsCount: 1}
            },
            {
                returnDocument: "after"
            }
        )
        if (!doc) {
            return res.status(404).json({
                message: "not found post"
            })
        }
        res.send(doc);

        //     (err, doc) => {
        //         if (err) {
        //             return res.status(500).json({
        //                 message: "error get one posts"
        //             })
        //         }
        //         if (!doc) {
        //             return res.status(404).json({
        //                 message: "not found post"
        //             })
        //         }
        //         res.send(doc)
        //     }
        // )
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error get one posts catch"
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        });
        const post = await doc.save();
        res.json(post);

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error post create"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.findOneAndDelete({
                _id: postId
            },

            // (err, doc) => {
            //     if (err) {
            //         return res.status(500).json({
            //             message: "error delete post "
            //         })
            //     }
            //     if (!doc) {
            //         return res.status(404).json({
            //             message: "not found post"
            //         })
            //     }
            //     res.send({
            //         success: true
            //     })
            // }
        )
        if (!doc) {
            return res.status(404).json({
                message: "not found post"
            })
        }

        res.send({
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: "error delete post catch"
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.updateOne({
            _id: postId
        },{
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })
        res.json({success: true})

    } catch (err) {
        res.status(500).json({
            message: "error update post"
        })
    }
}