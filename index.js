import express from "express"
import multer from "multer"
import cors from "cors"
import dotenv from "dotenv"
import {connectDb} from "./connectMongo.js"
import {
    registerValidation,
    loginValidation,
    postCreateValidation,
    categoryCreateValidation,
    productCreateValidation
} from "./validations.js"
import checkAuth from "./utils/checkAuth.js"
import checkAdmin from "./utils/checkAdmin.js";
import * as UserController from "./controllers/UserController.js"
import * as PostController from "./controllers/PostController.js"
import * as CategoryController from "./controllers/CategoryController.js"
import * as ProductController from "./controllers/ProductController.js"
import handleValidationErrors from "./utils/handleValidationErrors.js";

const app = express()
const PORT = process.env.PORT || 3001

// env configuration
dotenv.config()

// connect to db
connectDb()


// category storage to save category images
const categoryStorage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads/categories")
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

// product storage to save product images
const productStorage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads/products")
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const categoryUpload = multer({storage: categoryStorage})
const productUpload = multer({storage: productStorage})

// app

app.use(express.json())
app.use(cors())
app.use("/uploads/categories", express.static("uploads/categories"))
app.use("/uploads/products", express.static("uploads/products"))

// user auth

app.post("/api/auth/register", registerValidation, handleValidationErrors, UserController.register)
app.post("/api/auth/login", loginValidation, handleValidationErrors, UserController.login)
app.get("/api/auth/me", checkAuth, UserController.getMe)
app.get("/api/users", checkAdmin, UserController.getAll)


// category CRUD

app.get("/api/category", CategoryController.getAll)
app.post("/api/category", checkAdmin, categoryCreateValidation, CategoryController.create)
app.delete("/api/category/:id", checkAdmin, CategoryController.remove)
app.put("/api/category/:id", checkAdmin, categoryCreateValidation, CategoryController.update)

// product CRU

app.get("/api/product", ProductController.getAll)
app.get("/api/product/:id", ProductController.getOne)
app.get("/api/product/cat/:id", ProductController.getBySelectedCategory)
app.get("/api/product/search/:id", ProductController.getBySearch)
app.get("/api/products", ProductController.getByFilters)
app.post("/api/product", checkAdmin, productCreateValidation, ProductController.create)
app.delete("/api/product/:id", checkAdmin, ProductController.remove)
app.put("/api/product/:id", checkAdmin, productCreateValidation, ProductController.update)

// posts CRUD

app.get("/api/posts", PostController.getAll)
app.get("/api/posts/:id", PostController.getOne)
app.post("/api/posts", checkAuth, postCreateValidation, PostController.create)
app.delete("/api/posts/:id", checkAuth, PostController.remove)
app.patch("/api/posts/:id", checkAuth, postCreateValidation, PostController.update)


// categories images uploads

app.post("/api/category/upload", checkAuth, categoryUpload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/categories/${req.file.originalname}`
    })
})


// products images uploads
app.post("/api/product/upload", checkAuth, productUpload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/products/${req.file.originalname}`
    })
})


// listen server on port
app.listen(PORT, () => console.log("server listening on port 3001"))