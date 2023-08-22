import { Request, Response } from 'express'
import { createCar } from 'database/queries/cars'
import { createImage } from 'database/queries/images'
import { User } from 'types'
import dotenv from 'dotenv'

dotenv.config()

const SERVER_URL = process.env.SERVER_URL

const handleCreateCar = async (req: Request, res: Response) => {
    try {
        const user_id = (req.user as User).id
        const car = JSON.parse(req.body.car)

        const car_id = await createCar(car, user_id)

        const images: { name: string; url: string }[] = []

        if (Array.isArray(req.files)) {
            req.files.forEach((image) => {
                const name = image.originalname
                const url = `${SERVER_URL}/images/${image.filename}`
                images.push({ name, url })
            })
        }

        const promises: Promise<void>[] = []

        images.forEach(({ name, url }) => {
            promises.push(createImage(name, url, car_id))
        })

        await Promise.all(promises)

        const created = { ...car, id: car_id, user: req.user, images }

        res.status(200).json(created)
    } catch (error) {
        res.status(400).json('Error while creating car')
        console.log(error)
    }
}

export default handleCreateCar
