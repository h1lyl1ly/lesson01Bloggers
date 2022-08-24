import {body,CustomValidator } from "express-validator";
import {postsRepository} from "../repositories/posts-repository";



export const bloggerIdValidation = body('bloggerId')
    .isNumeric()
    .custom(async (bloggerId) => {
        const existingBloggerId =
            await postsRepository.getPostsById(bloggerId)
        if (existingBloggerId)  {
            throw  new Error ('BloggerId already exists')
        }
    })
    .withMessage('body.bloggerId must be Int')


// const bloggerIdBodyRegExp2 = /^\d+$/i
// export const bloggerIdValidation = body('bloggerId').matches(bloggerIdBodyRegExp2).withMessage('body.bloggerId must be Int')

// const isBloggerIdValid: CustomValidator = value => {
//     return User.findUserByEmail(value).then(user => {
//         if (user) {
//             return Promise.reject('E-mail already in use');
//         }
//     });
// };
// export const bloggerIdValidation = body('bloggerId')
//     .isNumeric()
//     .custom((bloggerId, {req})) => {
//     if (bloggerId !== req.body.bloggerId)
//         }
// .withMessage('body.bloggerId must be Int')
