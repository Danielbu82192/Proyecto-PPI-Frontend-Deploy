"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import Calendario from '@/component/calendario/calendario'
import CryptoJS from 'crypto-js';

function page() {

    const [fechaPruebas, setFechaPruebas] = useState(new Date());
    const [semanaSeleccionada, setSemanaSeleccionada] = useState([])

    const [usuarioActivo, setUsuarioActivo] = useState([])
    const monthIndex = fechaPruebas.getMonth();
    const numeroDia = fechaPruebas.getDate();  // Obtiene el índice del mes actual (0-11)
    const options = { month: 'long' }; // Opciones para formatear el nombre del mes
    const monthName = new Date(2000, monthIndex).toLocaleString('es-ES', options); // Cambia 'es-ES' por tu localización si es diferente

    useEffect(() => {

        const cargarsemana = async () => {
            const response = await fetch(`https://td-g-production.up.railway.app/semanas`);
            const data = await response.json();
            if (response.ok) {
                let fechaSelec = []
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    const fecha = fechaPruebas
                    const fechaInicio = new Date(element.fechaInicio)
                    const fechaFin = new Date(element.fechaFin)
                    if (fechaInicio <= fecha && fechaFin >= fecha) {
                        fechaSelec = element
                        setSemanaSeleccionada(element)
                    }
                }
            }
        }
        const cargarUsuarioActivo = () => {
            const usuarioNest = localStorage.getItem('U2FsdGVkX1');
            const bytes = CryptoJS.AES.decrypt(usuarioNest, 'PPIITYTPIJC');
            const usuarioN = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
            setUsuarioActivo(usuarioN) 
        }
        cargarUsuarioActivo()
        cargarsemana()
    }, []);

    return (
        <div className="ml-6 mr-6 mt-6 border   bg-white border-b flex justify-between">
            <div className='pt-8  pb-8 w-full'>
                <div className='md:h-22 lg:h-22 xl:h-22 sm:h-22 border-b-2 pl-8 pb-5 pr-52 flex justify-between items-center'>
                    <div>
                        <h1 className='text-4xl font-bold text-gray-600'>Crear citas de asesorías</h1>
                    </div>
                    <div className='text-4xl   text-gray-600'>Semana {semanaSeleccionada.numeroSemana} {monthName.charAt(0).toUpperCase() + monthName.slice(1)} {numeroDia}</div>
                </div>
                <div className='p-10'>
                    <Calendario />
                </div>
            </div>
        </div>
    )
}

export default page