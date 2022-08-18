import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) =>  {
    const authorization = req.header('authorization')
    const mockHashPassword =  Buffer.from('admin:qwerty').toString('base64')
    if (authorization !== `Basic ${mockHashPassword}`) {
        return res.status(401).send()
    }
    next()
}

// Buffer.from(hashedPassword, 'base64')
//     .toString('ascii')