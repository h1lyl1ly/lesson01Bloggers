import {body} from "express-validator";

export const bloggerIdValidation = body('bloggerId').isNumeric().withMessage('body.bloggerId must be Int')

// const bloggerIdBodyRegExp2 = /^\d+$/i
// export const bloggerIdValidation = body('bloggerId').matches(bloggerIdBodyRegExp2).withMessage('body.bloggerId must be Int')
