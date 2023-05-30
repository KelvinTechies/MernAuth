import express from 'express'
import dotenv from 'dotenv'
import UserRoute from './Routes/UserRoute.js'
import {notFound, errorHandler} from './Middleware/ErrorMiddleware.js'
import ConnectDB from './Config/config.js'
import cookieParser from 'cookie-parser'
import path from 'path'
dotenv.config()
ConnectDB()

const port =process.env.PORT|| 5000;

const app = express()
app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, 'client/dist')))
    app.get('*', req, res){
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    }
} else {
    app.get('/', (req, res)=>{
        console.log(`The server is ready for use`);
        
    })
}
// app.use(notFound)
app.use(errorHandler)

app.use(express.urlencoded({extended:true}))

app.use('/api/users', UserRoute)

app.listen(port,()=>console.log(`App is running  on port ${port}`))