import VisualizarCoordinador from '@/component/asesorias/coordinador/visualizar/visualizarCoordinador'
import React from 'react'

function page() {
    return (
        <div className="ml-6 mr-6 mt-6 border   bg-white border-b flex justify-between">
            <div className='pt-8  pb-8 w-full'> 
                <div className='w-full border-b-2 flex flex-col sm:flex-row items-center sm:items-start justify-between sm:pl-8 sm:h-22 sm:pr-5 pb-5 text-center sm:text-left'>
                        <h1 className='text-4xl font-bold text-gray-600 mb-2 sm:mb-0'>Citas de asesorías</h1>
                    </div>
                <div className='p-10'> 
                <VisualizarCoordinador/>
                </div>
            </div>
        </div>
    )
}

export default page
