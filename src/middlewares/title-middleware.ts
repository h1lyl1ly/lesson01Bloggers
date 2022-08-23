import {body} from "express-validator";

export const titleValidation = body('title').trim().isLength({min:1, max: 30}).withMessage('title validation some error')
