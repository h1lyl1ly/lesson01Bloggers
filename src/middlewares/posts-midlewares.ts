import {body} from "express-validator";
import {bloggersRepository} from "../repositories/bloggers-db-repository";


export const titleValidation = body('title')
    .trim()
    .isLength({min:1, max: 30}).withMessage('title validation some error')

export const shortDescriptionValidation = body('shortDescription')
    .trim()
    .isLength({min: 1, max: 100}).withMessage('shortDescription validation some error')

export const contentValidation = body('content')
    .trim()
    .isLength({min:1, max: 1000}).withMessage('content validation some error')

export const idValidationMiddleware = body("id")
    .trim()
    .isString().withMessage('id must be string')


export const blogIdValidation = body('blogId')
    .isString().withMessage('body.blogId must be string')
    .custom(async (blogId) => {
        const existingblogId =
            await bloggersRepository.getBloggerById(blogId)
        if (!existingblogId)  {
            throw  new Error ('blogId in not exists')
        }
    })


let blogIdValidation1 = blogIdValidation;
export const postsValidation = [
    idValidationMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation1
]