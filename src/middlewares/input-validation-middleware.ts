import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const resultErrors = errors.array({onlyFirstError: true}).map((error) => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        res.status(400).send(resultErrors)
    } else {
        next()
    }
}
