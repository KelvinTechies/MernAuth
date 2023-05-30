import jwt from 'jsonwebtoken'

const generateToken=(res, UserId)=>{
    const token = jwt.sign({UserId}, process.env.JWT_SECRET, {
        expiresIn:'2d'
    })

    res.cookie('jwt', token, {
        httpOnly:true,
        secure:process.env.NODE_ENV !=='development',
        sameSite:'strict',
        maxAge:2 * 24 * 60 * 60 * 1000
    })
}

export default generateToken