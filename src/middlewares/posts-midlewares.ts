import {body} from "express-validator";
import {bloggersRepository} from "../repositories/bloggers-in-memory-repository";


export const titleValidation = body('title').trim().isLength({min:1, max: 30}).withMessage('title validation some error')

export const shortDescriptionValidation = body('shortDescription').trim().isLength({min: 1, max: 100}).withMessage('shortDescription validation some error')

export const contentValidation = body('content').trim().isLength({min:1, max: 1000}).withMessage('content validation some error')


export const bloggerIdValidation = body('bloggerId')
    .isNumeric().withMessage('body.bloggerId must be Int')
    .custom(async (bloggerId) => {
        const existingBloggerId =
            await bloggersRepository.getBloggerById(bloggerId)
        if (!existingBloggerId)  {
            throw  new Error ('BloggerId in not exists')
        }
    })







export const postsValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation
]