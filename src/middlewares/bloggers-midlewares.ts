import {body} from "express-validator";


// export const idValidationMiddleware = body("id")
//     .trim().isNumeric().withMessage("id must be int")
//
//      .isString().withMessage("id must be string")





export const nameValidationMiddleware = body("name")
    .trim()
    .isLength({
        min: 1,
        max: 15
    }).withMessage("Name must be >1 and <15 characters.")

const youtubeUrlRegExp = '^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$'
export const youtubeUrlMiddleware = body("youtubeUrl").trim().matches(youtubeUrlRegExp).isLength({
    min: 0,
    max: 100
}).withMessage("\"youtubeUrl2 should be maxLength=100 or matched to pattern '^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$'")





export const bloggersValidation = [
    // idValidationMiddleware,
    nameValidationMiddleware,
    youtubeUrlMiddleware,
]