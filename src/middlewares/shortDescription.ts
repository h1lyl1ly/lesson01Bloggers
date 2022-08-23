import {body} from "express-validator";

export const shortDescriptionValidation = body('shortDescription').isString().trim().isLength({min: 1, max: 100})



