import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        console.log("Connect success")
    } catch (e) {
        console.log("Connect failure: " + e.message)

    }
}
