import {body} from "express-validator";

export const nameValidationMiddleware = body("name").isString().trim().notEmpty().isLength({max: 15})
