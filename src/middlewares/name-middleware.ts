import {body} from "express-validator";

export const nameValidationMiddleware = body("name").isString().trim().isLength({min: 1, max: 15})
