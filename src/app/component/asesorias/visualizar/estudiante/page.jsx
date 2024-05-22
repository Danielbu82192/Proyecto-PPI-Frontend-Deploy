import React from 'react'
import Tarjetas from '@/component/asesorias/tarjetas/tarjetas'

function page() {
    return (
        <div className="ml-6 mr-6 mt-6 border   bg-white border-b flex justify-between">
            <div className='pt-8  pb-8 w-full'>
                <div className=' md:h-22 lg:h-22 xl:h-16 sm:h-22   border-b-2 sm:pl-8 flex '>
                    <h1 className='text-4xl font-bold text-center text-gray-600'>Mis citas de asesorías</h1>
                </div>
                <div className='p-10'>
                    <Tarjetas />
                </div>
            </div>
        </div>
    )
}

export default page
