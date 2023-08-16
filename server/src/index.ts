import path from 'path'
import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { passport } from 'middleware'
import cookieParser from 'cookie-parser'
import { carsRouter, authRouter } from 'routes'

dotenv.config()

const PORT = process.env.PORT || 4000
const CLIENT_URL = process.env.CLIENT_URL

const app = express()

app.use(json())
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))

app.use(passport.initialize())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/cars', carsRouter)
app.use('/auth', authRouter)

app.use('/', (req, res) => {
    res.send('<h1>Hello, world!</h1>')
})

app.listen(PORT, () => {
    console.log('Server is working!')
})
