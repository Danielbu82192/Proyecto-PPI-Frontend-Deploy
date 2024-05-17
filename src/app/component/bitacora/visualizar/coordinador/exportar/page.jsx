/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";




function page() {

    const [equipo, setEquipo] = useState([])
    const [selectExport, setSelectExport] = useState([])
    const router = useRouter(); 
    const exportarBitacora = async () => {
        const response = await fetch('http://localhost:3002/equipo-ppi/exportar/' + selectExport);
        const filePath = await response.text()
        const baseUrl = 'http://localhost:3002';
        const fileUrl = new URL(filePath.replace('/public', ''), baseUrl).href;
        const newWindow = window.open(fileUrl, '_blank');

        if (newWindow) {
            setTimeout(() => {
                newWindow.close();
            }, 2000);
        } else { 
            console.error('No se pudo abrir la ventana para descargar el archivo.');
        }

    }

    const exportarCitasAsesores = async () => {
        const response = await fetch('http://localhost:3002/equipo-ppi/exportar/' + selectExport);
        const filePath = await response.text()
        const baseUrl = 'http://localhost:3002';
        const fileUrl = new URL(filePath.replace('/public', ''), baseUrl).href;
        const newWindow = window.open(fileUrl, '_blank');

        if (newWindow) {
            setTimeout(() => {
                newWindow.close();
            }, 2000);
        } else {
            // Si no se pudo abrir la ventana, mostrar un mensaje de error
            console.error('No se pudo abrir la ventana para descargar el archivo.');
        }

    }
    useEffect(() => {
        const cargarEquipo = async () => {
            const response = await fetch(`http://localhost:3002/equipo-ppi`);
            const data = await response.json();
            if (response.ok) {
                console.log(data)
                setEquipo(data);
            }
        }

        cargarEquipo()
    }, []);


    return (
        <div className="ml-6 mr-6 mt-6 border   bg-white border-b flex justify-between">
            <div className='pt-8  pb-8 w-full'>
                <div className='md:h-22 lg:h-22 xl:h-22 sm:h-22 border-b-2 pl-8 pb-5 pr-52 flex justify-between items-center'>
                    <div>
                        <h1 className='text-4xl font-bold text-gray-600'>Exportaciones</h1>
                    </div>
                </div>
                <div className='p-10'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-600'>Exportar bitacora</h1>
                    </div>
                    <div className="text-center grid grid-cols-2 mt-5">
                        <div>
                            <h1 className="text-2xl sm:text-xl font-bold text-gray-600">Seleccione el grupo para exportar:</h1>
                        </div>
                        <div>
                            <select onChange={(e) => { setSelectExport(e.target.value) }} name="" id="" className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm">
                                <option value="0" selected disabled>Seleccione un grupo</option>
                                <option value="-1" >Todos</option>
                                {equipo.map((item) => (
                                    <option key={item.ok} value={item.ok} >{item.codigoEquipo}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => { exportarBitacora() }} className="mt-6 text-white py-2 px-4 w-full rounded bg-green-400 hover:bg-green-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 mr-2' viewBox="0,0,256,256">
                                <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(5.12,5.12)"><path d="M28.8125,0.03125l-28,5.3125c-0.47266,0.08984 -0.8125,0.51953 -0.8125,1v37.3125c0,0.48047 0.33984,0.91016 0.8125,1l28,5.3125c0.0625,0.01172 0.125,0.03125 0.1875,0.03125c0.23047,0 0.44531,-0.07031 0.625,-0.21875c0.23047,-0.19141 0.375,-0.48437 0.375,-0.78125v-48c0,-0.29687 -0.14453,-0.58984 -0.375,-0.78125c-0.23047,-0.19141 -0.51953,-0.24219 -0.8125,-0.1875zM32,6v7h2v2h-2v5h2v2h-2v5h2v2h-2v6h2v2h-2v7h15c1.10156,0 2,-0.89844 2,-2v-34c0,-1.10156 -0.89844,-2 -2,-2zM36,13h8v2h-8zM6.6875,15.6875h5.125l2.6875,5.59375c0.21094,0.44141 0.39844,0.98438 0.5625,1.59375h0.03125c0.10547,-0.36328 0.30859,-0.93359 0.59375,-1.65625l2.96875,-5.53125h4.6875l-5.59375,9.25l5.75,9.4375h-4.96875l-3.25,-6.09375c-0.12109,-0.22656 -0.24609,-0.64453 -0.375,-1.25h-0.03125c-0.0625,0.28516 -0.21094,0.73047 -0.4375,1.3125l-3.25,6.03125h-5l5.96875,-9.34375zM36,20h8v2h-8zM36,27h8v2h-8zM36,35h8v2h-8z"></path></g></g>
                            </svg>
                            Exportar bitacora
                        </button>


                    </div>
                    <div className='mt-5'> 
                        <div>
                            <h1 className='text-3xl font-bold text-gray-600'>Exportar Citas Asesores</h1>
                        </div>
                        <div>
                            <button onClick={() => { exportarCitasAsesores() }} className="mt-6 text-white py-2 px-4 w-full rounded bg-green-400 hover:bg-green-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 mr-2' viewBox="0,0,256,256">
                                    <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(5.12,5.12)"><path d="M28.8125,0.03125l-28,5.3125c-0.47266,0.08984 -0.8125,0.51953 -0.8125,1v37.3125c0,0.48047 0.33984,0.91016 0.8125,1l28,5.3125c0.0625,0.01172 0.125,0.03125 0.1875,0.03125c0.23047,0 0.44531,-0.07031 0.625,-0.21875c0.23047,-0.19141 0.375,-0.48437 0.375,-0.78125v-48c0,-0.29687 -0.14453,-0.58984 -0.375,-0.78125c-0.23047,-0.19141 -0.51953,-0.24219 -0.8125,-0.1875zM32,6v7h2v2h-2v5h2v2h-2v5h2v2h-2v6h2v2h-2v7h15c1.10156,0 2,-0.89844 2,-2v-34c0,-1.10156 -0.89844,-2 -2,-2zM36,13h8v2h-8zM6.6875,15.6875h5.125l2.6875,5.59375c0.21094,0.44141 0.39844,0.98438 0.5625,1.59375h0.03125c0.10547,-0.36328 0.30859,-0.93359 0.59375,-1.65625l2.96875,-5.53125h4.6875l-5.59375,9.25l5.75,9.4375h-4.96875l-3.25,-6.09375c-0.12109,-0.22656 -0.24609,-0.64453 -0.375,-1.25h-0.03125c-0.0625,0.28516 -0.21094,0.73047 -0.4375,1.3125l-3.25,6.03125h-5l5.96875,-9.34375zM36,20h8v2h-8zM36,27h8v2h-8zM36,35h8v2h-8z"></path></g></g>
                                </svg>
                                Exportar Citas Asesores
                            </button> 
                        </div>
                    </div> 
                </div>
            </div>

        </div>
    )
}

export default page