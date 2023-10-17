import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: String
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Category", CategorySchema)