/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function visualizarCoordinador() {

    const [citas, setCitas] = useState([])
    const [auxCitas, setAuxCitas] = useState([])
    const [auxCitas2, setAuxCitas2] = useState([])
    const [filtroRadio, setFiltroRario] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [seleccionada, setSeleccionada] = useState([])

    useEffect(() => {
        const cargarCitas = async () => {
            const response = await fetch(`https://td-g-production.up.railway.app/citas-asesoria-ppi/`);
            const data = await response.json();
            if (response.ok) {
                const response2 = await fetch(`https://td-g-production.up.railway.app/equipo-usuarios/Estudiantes/`);
                const data2 = await response2.json();
                if (response2.ok) {
                    for (const element of data) {
                        const equipo = element.equipocita
                        if (equipo != null) {
                            element.equipo = data2[equipo.codigoEquipo]
                        }
                    }
                    setAuxCitas(data);
                    setCitas(data);
                }
            }
        }

        const cargarsemana = async () => {
            const response = await fetch(`https://td-g-production.up.railway.app/semanas`);
            const data = await response.json();
            if (response.ok) {
                setSeleccionada(data)
            }
        }

        cargarsemana()
        cargarCitas()
    }, []);

    const filtrarInput = (valor) => {
        if (valor === "" || valor.length === 0) {
            if (filtroRadio) {
                setAuxCitas(auxCitas2)
            }
            else {
                setAuxCitas(citas);
            }
        } else {
            const resultadosFiltrados = auxCitas.filter(dato => {
                const buscarEnObjeto = (objeto, termino) => {
                    for (const clave in objeto) {
                        if (typeof objeto[clave] === "object") {
                            if (buscarEnObjeto(objeto[clave], termino)) {
                                return true;
                            }
                        } else if (typeof objeto[clave] === "string") {
                            if (objeto[clave].toLowerCase().includes(termino.toLowerCase())) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                return buscarEnObjeto(dato, valor.toLowerCase());
            });
            setAuxCitas(resultadosFiltrados);
        }
    }
    const filtrarInput2 = (valor) => {
        if (valor === "" || valor.length === 0) {
            setAuxCitas(auxCitas2);
        } else {
            const resultadosFiltrados = auxCitas.filter(dato => {
                const buscarEnObjeto = (objeto, termino) => {
                    for (const clave in objeto) {
                        if (typeof objeto[clave] === "object") {
                            if (buscarEnObjeto(objeto[clave], termino)) {
                                return true;
                            }
                        } else if (typeof objeto[clave] === "string") {
                            if (objeto[clave].toLowerCase().includes(termino.toLowerCase())) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                return buscarEnObjeto(dato, valor.toLowerCase());
            });
            setAuxCitas(resultadosFiltrados);
        }
    }

    const goToPage = (page) => {
        if (page == Math.ceil(auxCitas.length / 10))
            return

        if (page == -1)
            return
        setCurrentPage(page);
    };

    const filtroRadioOp = (valor) => {
        if (valor == 0) {
            setAuxCitas(citas)
        } else if (valor == 1) {
            const auxiliar = []
            for (const element of citas) {
                if (element.estadoCita.id != null && element.estadoCita.id == 1) {
                    auxiliar.push(element)
                }
            } setAuxCitas(auxiliar)
            setAuxCitas2(auxiliar)
        } else if (valor == 2) {
            const auxiliar = []
            for (const element of citas) {
                if (element.estadoCita.id != null && element.estadoCita.id == 2) {
                    auxiliar.push(element)
                }
            } setAuxCitas(auxiliar)
            setAuxCitas2(auxiliar)
        } else if (valor == 3) {
            const auxiliar = []
            for (const element of citas) {
                if (element.estadoCita.id != null && element.estadoCita.id == 3) {
                    auxiliar.push(element)
                }
            } setAuxCitas(auxiliar)
            setAuxCitas2(auxiliar)
        } else if (valor == 4 || valor == 5) {
            const auxiliar = []
            for (const element of citas) {
                if (element.estadoCita.id != null && (element.estadoCita.id == 4 || element.estadoCita.id == 5)) {
                    auxiliar.push(element)
                }
            } setAuxCitas(auxiliar)
            setAuxCitas2(auxiliar)
        } else if (valor == 6) {
            const auxiliar = []
            for (const element of citas) {
                if (element.estadoCita.id != null && element.estadoCita.id == 6) {
                    auxiliar.push(element)
                }
            } setAuxCitas(auxiliar)
            setAuxCitas2(auxiliar)
        }


    }

    const buscarSemana = (data) => {
        const fechaCita = new Date(data)
        fechaCita.setHours(0, 0, 0, 0)
        for (let i = 0; i < seleccionada.length; i++) {
            const rango = seleccionada[i];
            const fechaInicio = new Date(rango.fechaInicio);
            const fechaFin = new Date(rango.fechaFin);
            fechaInicio.setHours(0, 0, 0, 0)
            fechaFin.setHours(0, 0, 0, 0)
            if (fechaCita >= fechaInicio && fechaCita <= fechaFin) {
                return rango.numeroSemana;
            }
        }
    }

    return (
        <div>
            <div className="flex items-center w-full">
                <div onClick={() => { setFiltroRario(!filtroRadio); setAuxCitas(citas); setAuxCitas2(citas) }} className={`cursor-pointer  flex justify-center items-center border-2 rounded-md  p-1.5 ${filtroRadio ? ('bg-red-400 border-red-400') : ('border-gray-300')}`}>
                    {filtroRadio ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                    </svg>)}
                </div>

                <div className="relative flex items-center flex-grow ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-3" style={{ fill: 'rgb(75 85 99)' }}>
                        <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
                    </svg>
                    <input
                        type="email"
                        onChange={(e) => { if (filtroRadio) { filtrarInput2(e.target.value) } else { filtrarInput(e.target.value) } }}
                        id="UserEmail"
                        placeholder="Buscar"
                        className="pl-10 pr-4 py-2 w-full border-2 rounded-md border-gray-300 shadow-sm sm:text-sm"
                    />
                </div>
            </div>
            {
                filtroRadio ? (
                    <div className='flex flex-wrap  gap-3 mt-2'>
                        <div className='sm:pt-0 pt-2 sm:py-4'>
                            <input defaultChecked type="radio" onChange={() => { filtroRadioOp(0) }} id='Todos' name="FiltroRadio" className=" peer hidden" />
                            <label htmlFor='Todos' className=" cursor-pointer rounded-lg border-2 text-sm border-gray-500 py-2 px-5 font-bold text-slate-950 transition-colors duration-200 ease-in-out peer-checked:bg-slate-950 peer-checked:text-white peer-checked:border-slate-950">Todos</label>
                        </div>

                        <div className='sm:pt-0 pt-2 sm:py-4'>
                            <input type="radio" id='Disponible' onChange={() => { filtroRadioOp(1) }} name="FiltroRadio" className=" peer hidden" />
                            <label htmlFor='Disponible' className=" cursor-pointer rounded-lg text-sm border-2 border-gray-500 py-2 px-5 font-bold text-gray-500 transition-colors duration-200 ease-in-out peer-checked:bg-gray-500 peer-checked:text-white peer-checked:border-gray-500">Disponible</label>
                        </div>
                        <div className='sm:pt-0 pt-2 sm:py-4'>
                            <input type="radio" id='Reservado' name="FiltroRadio" onChange={() => { filtroRadioOp(2) }} className=" peer hidden" />
                            <label htmlFor='Reservado' className=" cursor-pointer rounded-md text-sm border-2 border-emerald-500 py-2 px-5    font-bold text-emerald-500 transition-colors duration-200 ease-in-out peer-checked:bg-emerald-500 peer-checked:text-white peer-checked:border-emerald-500">Reservado</label>
                        </div>
                        <div className='sm:pt-0 pt-2 sm:py-4'>
                            <input type="radio" id='Cumplida' name="FiltroRadio" onChange={() => { filtroRadioOp(3) }} className=" peer hidden" />
                            <label htmlFor='Cumplida' className=" cursor-pointer rounded-md text-sm border-2 border-indigo-500 py-2 px-5    font-bold text-indigo-500 transition-colors duration-200 ease-in-out peer-checked:bg-indigo-500 peer-checked:text-white peer-checked:border-indigo-500">Cumplida</label>
                        </div>
                        <div className='sm:pt-0 pt-2 sm:py-4'>
                            <input type="radio" id='Cancelada' name="FiltroRadio" onChange={() => { filtroRadioOp(4) }} className=" peer hidden" />
                            <label htmlFor='Cancelada' className=" cursor-pointer rounded-md text-sm border-2 border-red-500 py-2 px-5    font-bold text-red-500 transition-colors duration-200 ease-in-out peer-checked:bg-red-500 peer-checked:text-white peer-checked:border-red-500">Cancelada</label>
                        </div>
                        <div className='sm:pt-0 pt-2 sm:py-4'>
                            <input type="radio" id='Pendiente' name="FiltroRadio" onChange={() => { filtroRadioOp(6) }} className=" peer hidden" />
                            <label htmlFor='Pendiente' className=" cursor-pointer rounded-md text-sm border-2 border-amber-500 py-2 px-5    font-bold text-amber-500 transition-colors duration-200 ease-in-out peer-checked:bg-amber-500 peer-checked:text-white peer-checked:border-amber-500">Pendiente</label>
                        </div>
                    </div>) : (null)
            }

            <div className="mt-5 w-full border-t border-gray-400">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 border-b-2 border-gray-400 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th class=" px-4 py-2 font-bold text-gray-600">Semana</th>
                                <th class="whitespace-nowrap px-4 py-2 font-bold text-gray-600">Fecha</th>
                                <th class="whitespace-nowrap px-4 py-2 font-bold text-gray-600">Hora</th>
                                <th class="whitespace-nowrap px-4 py-2 font-bold text-gray-600">Asesor</th>
                                <th class="whitespace-nowrap px-4 py-2 font-bold text-gray-600">Estudiantes</th>
                                <th class="whitespace-nowrap px-4 py-2 font-bold text-gray-600">Estado</th>
                                <th class="whitespace-nowrap px-4 py-2 font-bold text-gray-600">Bitácora</th>
                                <th class="whitespace-nowrap px-4 py-2 font-bold text-gray-600">Visualizar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {auxCitas.map((item, index) => {
                                const equipo = item.equipo
                                if (index >= currentPage * 10 && index < (currentPage + 1) * 10) {

                                    return (
                                        <tr key={item.id}>
                                            <td className="whitespace-nowrap px-4 py-2 font-semibold text-center text-gray-500">{buscarSemana(item.fecha)}</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-semibold text-center text-gray-500">{format(item.fecha, 'EEEE dd', { locale: es })}</td>
                                            <td className="whitespace-normal text-center font-semibold px-4 py-2 text-gray-500">{item.hora.split(':')[0]}:{item.hora.split(':')[1]} </td>
                                            <td className="whitespace-normal px-4 py-2 font-semibold text-center text-gray-500">{item.usuariocitaequipo.nombre}</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-semibold text-gray-400 text-center">
                                                {equipo != null ?
                                                    (equipo.map((item) => (
                                                        <>{item.nombre}<br /></>
                                                    ))) : (<span className='font-semibold text-gray-400'>No resgistrado</span>)
                                                }
                                            </td>
                                            <td className="whitespace-normal text-center font-semibold px-4 py-2 text-gray-500">
                                                <span className={`py-2 px-8 rounded-xl text-white ${item.estadoCita.id === 1 ? 'bg-gray-500' : item.estadoCita.id === 2 ? 'bg-emerald-500' : item.estadoCita.id === 3 ? 'bg-indigo-500' : item.estadoCita.id === 6 ? 'bg-orange-500' : 'bg-red-500'}`}>{item.estadoCita.nombre}</span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-semibold text-center text-gray-500">
                                                {item.equipocita != null ? (
                                                    <a href={'/component/bitacora/visualizar/asesor/' + item.equipocita.id} className=' flex items-center justify-center'>
                                                        <div className='p-3 rounded-full bg-gray-600'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                                                                <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd" />
                                                                <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                                                            </svg>

                                                        </div>
                                                    </a>
                                                ) : (null)
                                                }

                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-semibold text-center text-gray-400">

                                                <a href={'/component/asesorias/visualizar/coordinador/' + item.id} className=' flex items-center justify-center'>
                                                    <div className='p-3 rounded-full bg-gray-600'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg>


                                                    </div>
                                                </a>

                                            </td>
                                        </tr>
                                    )
                                } else {
                                    return null;
                                }
                            })}



                        </tbody>
                    </table>

                    <div class="inline-flex justify-center gap-1">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span class="sr-only">Prev Page</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>

                        <div>
                            <label for="PaginationPage" class="sr-only">Page</label>

                            <input
                                type="number"
                                class="h-8 w-12 rounded border border-gray-100 bg-white p-0 text-center text-xs font-medium text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                min="1"
                                value={currentPage + 1}
                                id="PaginationPage"
                            />
                        </div>

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span class="sr-only">Next Page</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default visualizarCoordinador
