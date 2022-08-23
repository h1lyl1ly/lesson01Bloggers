import {body} from "express-validator";

export const shortDescriptionValidation = body('shortDescription').trim().isLength({min: 1, max: 100}).withMessage('shortDescription validation some error')



