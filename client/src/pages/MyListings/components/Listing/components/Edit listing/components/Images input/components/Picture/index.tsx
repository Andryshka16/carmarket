import { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Image } from 'types'

interface Props {
    image: File | Image
    removeImage: () => void
}

const Picture = ({ image, removeImage }: Props) => {
    const [isHovering, setIsHovering] = useState(false)

    const source = image instanceof File ? URL.createObjectURL(image) : image.url
    const name = image.name

    return (
        <div
            className='relative aspect-video w-full overflow-hidden rounded-lg'
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <img
                src={source}
                className='h-full w-full object-cover'
            />
            <div
                className={`absolute left-0 top-0 h-full w-full bg-neutral-900 opacity-0 transition duration-200 ${
                    isHovering ? 'opacity-100' : 'pointer-events-none'
                }`}
            >
                <div className='flex h-full w-full flex-col justify-center'>
                    <h3 className='mx-auto text-sm font-semibold md:text-lg'>
                        {name.length <= 10 ? name : name.slice(0, 10) + '...'}
                    </h3>
                    <AiOutlineCloseCircle
                        className='mx-auto mt-0.5 h-2/5 w-2/5 text-red-500 transition duration-200 hover:scale-110'
                        onClick={removeImage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Picture
