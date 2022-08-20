import {body} from "express-validator";

export const contentValidation = body('content').isString().trim().notEmpty().isLength({min:1, max: 1000})
