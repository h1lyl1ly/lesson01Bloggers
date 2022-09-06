// import {body} from "express-validator";
// import {bloggersRepository} from "../../repositories/bloggers-repository";
//
//
// export const bloggerIdValidation = body('bloggerId')
//     .isNumeric().withMessage('body.bloggerId must be Int')
//     .custom(async (bloggerId) => {
//         const existingBloggerId =
//                 await bloggersRepository.getBloggerById(bloggerId)
//         if (!existingBloggerId)  {
//             throw  new Error ('BloggerId in not exists')
//         }
//     })
//
