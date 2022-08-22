import {body} from "express-validator";

// export const nameValidationMiddleware = body("name").isString().trim().isLength({min: 1, max: 15})


export const nameValidationMiddleware = body("name").trim().isLength({
    min: 1,
    max: 15
}).withMessage("Name must be >1 and <15 characters.")
