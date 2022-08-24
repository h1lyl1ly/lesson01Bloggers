import {body} from "express-validator";
import {bloggersRepository} from "../repositories/bloggers-repository";

// export const bloggerIdValidation = body('bloggerId')
//     .isNumeric().withMessage('body.bloggerId must be Int')


export const bloggerIdValidation = body('bloggerId')
    .isNumeric().withMessage('body.bloggerId must be Int')
    .custom(async (bloggerId) => {
        const existingBloggerId =
                await bloggersRepository.getBloggerById(bloggerId)
        if (!existingBloggerId)  {
            throw  new Error ('BloggerId in not exists')
        }
    })



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
