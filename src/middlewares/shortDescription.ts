import {body} from "express-validator";

export const shortDescriptionValidation = body('shortDescription').isString().trim().notEmpty().isLength({min:3, max: 100})
