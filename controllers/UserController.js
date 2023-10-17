import bcrypt from "bcrypt";
import UserModel from "../models/User.js"
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            username: req.body.username,
            fullName: req.body.fullName,
            role: req.body.email === "hello@gmail.com" ? "ADMIN" : "USER",
            passwordHash: hash
        })
        const user = await doc.save();

        const token = jwt.sign({
            role: user.email === "hello@gmail.com" ? "ADMIN" : "USER",
            _id: user._id
        }, "uztelecom777", {
            expiresIn: '30d'
        })

        const {passwordHash, ...userData} = user._doc
        res.json({...userData, token})

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error register user"
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(400).json({
                message: "login or password wrong"
            });
        }

        const token = jwt.sign({
            role: user.email === "hello@gmail.com" ? "ADMIN" : "USER",
            _id: user._id
        }, "uztelecom777", {
            expiresIn: '30d'
        })
        const {passwordHash, ...userData} = user._doc
        res.json({...userData, token})


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error login action"
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        const {passwordHash, ...userData} = user._doc
        res.json(userData)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "not access"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.send(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "error get all users"
        })
    }
}