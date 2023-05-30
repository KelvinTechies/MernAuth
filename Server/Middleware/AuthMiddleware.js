import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'
import User from '../Models/models.js'


const Protect = AsyncHandler(async (req, res, nxt) => {
    let token;

    token = req.cookies.jwt

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decode.UserId).select('-password')
            nxt()
        } catch (error) {
            res.status(401)
            throw new Error('You are not Authorized for this Route, InValid token')
        }
    } else {
        res.status(401)
        throw new Error('You are not Authorized for this Route, No token Provided')
    }
})

export { Protect }