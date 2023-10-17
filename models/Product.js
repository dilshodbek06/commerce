import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        imageUrl: String
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Product", ProductSchema)