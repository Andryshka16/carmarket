import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Transmission, Type, ImagesInput } from './components'
import { createCarQuery } from 'Api/cars'
import { Car } from 'types'
import Loader from 'ui/Loader'
import useCarsStore from 'store/cars'
import { useNavigate } from 'react-router-dom'

type Data = Omit<Car, 'type' | 'transmission' | 'images' | 'id' | 'seller'>

const CreateListing = () => {
    const navigate = useNavigate()
    const { createCar } = useCarsStore()

    const [transmission, setTransmission] = useState('Automatic')
    const [type, setType] = useState('Fuel')
    const [images, setImages] = useState<File[]>([])

    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Data>()

    const submit = async (data: Data) => {
        try {
            setLoading(true)

            const { model, price, power, year, description } = data

            const car = {
                model,
                power,
                year: +year,
                price: +price,
                type,
                transmission,
                description
            }

            const formData = new FormData()
            formData.append('car', JSON.stringify(car))

            images.forEach((item) => {
                formData.append(`image`, item)
            })

            const created = await createCarQuery(formData)
            createCar(created)

            navigate('/')
        } catch (error) {
            setLoading(false)
            console.log('An error occured')
        }
    }

    return (
        <div className='m-auto my-5 flex h-full w-full items-center justify-center'>
            {loading ? (
                <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center md:w-[770px]'>
                    <Loader />
                </div>
            ) : (
                <form
                    className='scrollbar h-fit w-11/12 rounded-lg bg-neutral-700 px-8 py-5 text-white md:w-[770px] md:px-28 md:py-10'
                    onSubmit={handleSubmit(submit)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div>
                        <input
                            type='text'
                            {...register('model', { required: true })}
                            className={`h-12 w-full rounded border-2 bg-transparent text-center font-semibold transition duration-200 focus:outline-none ${
                                errors['model'] ? 'border-red-500' : 'border-[#858585]'
                            }`}
                        />
                        <h3 className='mt-1 text-center text-sm font-bold text-[#858585]'>Make & Model</h3>
                    </div>

                    <div className='mt-2 flex w-full justify-between'>
                        <div className='w-[45%]'>
                            <input
                                type='number'
                                {...register('year', { required: true })}
                                className={`h-12 w-full rounded border-2 bg-transparent text-center font-semibold transition duration-200 focus:outline-none ${
                                    errors['year'] ? 'border-red-500' : 'border-[#858585]'
                                }`}
                            />
                            <h3 className='mt-1 text-center text-sm font-bold text-[#858585]'>Year</h3>
                        </div>
                        <div className='w-[45%]'>
                            <input
                                type='text'
                                {...register('power', { required: true })}
                                className={`h-12 w-full rounded border-2 bg-transparent text-center font-semibold transition duration-200 focus:outline-none ${
                                    errors['power'] ? 'border-red-500' : 'border-[#858585]'
                                }`}
                            />
                            <h3 className='mt-1 text-center text-sm font-bold text-[#858585]'>Power</h3>
                        </div>
                    </div>

                    <Transmission transmission={transmission} switchTransmission={setTransmission} />
                    <Type type={type} switchType={setType} />

                    <div className='mt-5'>
                        <input
                            type='number'
                            {...register('price', { required: true })}
                            className={`h-12 w-full rounded border-2 bg-transparent text-center font-semibold transition duration-200 focus:outline-none ${
                                errors['price'] ? 'border-red-500' : 'border-[#858585]'
                            }`}
                        />
                        <h3 className='mt-1 text-center text-sm font-bold text-[#858585]'>Price ($)</h3>
                    </div>

                    <div className='mt-3'>
                        <textarea
                            {...register('description', { required: true })}
                            className={`h-36 w-full rounded border-2 bg-transparent px-2 py-1 transition duration-200 focus:outline-none ${
                                errors['description'] ? 'border-red-500' : 'border-[#858585]'
                            }`}
                        />
                        <h3 className='text-center text-sm font-bold text-[#858585]'>Description</h3>
                    </div>

                    <ImagesInput images={images} setImages={setImages} />

                    <button
                        className='m-auto mt-5 block h-12 w-56 rounded-md bg-green-600 font-semibold transition duration-200 hover:bg-opacity-90 sm:w-72'
                        type='submit'
                    >
                        Create listing
                    </button>
                </form>
            )}
        </div>
    )
}

export default CreateListing