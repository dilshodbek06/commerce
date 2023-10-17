import {body} from "express-validator"

export const registerValidation = [
    body("email", "please enter the correct email").isEmail(),
    body("password", "password must be at least 5 character").isLength({min: 5}),
    body("username", "username must be at least 3 character").isLength({min: 3}),
    body("fullName", "please enter the correct fullName").isLength({min: 5}),
]

export const loginValidation = [
    body("email", "please enter the correct email").isEmail(),
    body("password", "password must be at least 5 character").isLength({min: 5}),
]


export const categoryCreateValidation = [
    body("title", "please enter the correct title").isLength({min: 3}).isString(),
    body("description", "please enter the correct description").isLength({min: 3}).isString(),
    body("imageUrl", "please enter the correct url").optional().isString(),
]

export const productCreateValidation = [
    body("title", "please enter the correct title").isLength({min: 3}).isString(),
    body("description", "please enter the correct description").isLength({min: 3}).isString(),
    body("price", "please enter the correct price").isInt().isLength({min: 3}),
    body("imageUrl", "please enter the correct url").optional().isString(),
]
export const postCreateValidation = [
    body("title", "please enter the correct title").isLength({min: 3}).isString(),
    body("text", "please enter the correct text").isLength({min: 3}).isString(),
    body("tags", "please enter the array data").optional().isString(),
    body("imageUrl", "please enter the correct url").optional().isString(),
]