import {body} from "express-validator";

export const bloggerIdValidation = body('bloggerId').isNumeric()
