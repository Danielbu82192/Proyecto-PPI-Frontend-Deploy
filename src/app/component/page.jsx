/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { SlideBanner, SlideNewsCard } from '@/component/banner/banner'
import React, { useEffect } from 'react'

function page() {

    useEffect(() => {
        const traerSesion = async () => {
            const response = await fetch('https://td-g-production.up.railway.app/usuario/ExisteSesion');
            if (response.ok) {
                const data = await response.json();
                console.log(data)
            }
        }
    }, []);
    return (
        <div className='flex flex-col bg-white justify-center content-center items-center m-4 h-[95vh] w-[95%]'>
            <div className='md:flex flex-col justify-center content-center items-center min-w-[95%] max-w-[95%] hidden min-h-[45%] max-h-[45%] hidden'>
                <SlideBanner />
            </div>
            <div className='md:flex flex-col justify-center content-center items-center min-w-[95%] max-w-[95%] hidden min-h-[45%] max-h-[45%] hidden'>
                <SlideNewsCard />
            </div>
        </div >
    )
}

export default page