import {body} from "express-validator";

export const titleValidation = body('title').isString().trim().notEmpty().isLength({min:1, max: 30})
