import {body} from "express-validator";

export const shortDescriptionValidation = body('shortDescription').isString().trim().isLength({min: 0, max: 100})



