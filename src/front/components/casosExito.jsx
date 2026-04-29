import mascara1 from '../assets/img/mascara-2.png';
import logoSVG from '../assets/img/electricista.svg';
import fondoMascara1 from '../assets/img/fondo-mascara-2.png';
import mercado from '../assets/img/mercado.jpg';
import logo from '../assets/img/ribera.png';
import heroBg from '../assets/img/hero-bg.jpg';
import CasosExitoAnimation from '../animations/casosExito';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function CasosExito() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);


    useEffect(() => {
        CasosExitoAnimation(containerRef, imageRef)
    }, []);

    return (
        <section className={`h-auto w-screen flex flex-row justify-center items-start bg-url(${heroBg}) bg-cover bg-center relative overflow-hidden`} ref={containerRef}>
            <div className="h-screen w-150 absolute left-0 flex flex-col er" ref={imageRef}>
                <h1 className='text-3xl'>CASOS DE ÉXITO</h1>
                <img src={logoSVG} alt="Imagen hombre" className="absolute h-screen left-0 w-auto z-50 filter grayscale" />
                <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>Trabaja con nosotros</button>
            </div>

            <div className='grid grid-rows-4 grid-cols-8 w-screen h-400 justify-items-center z-10 py-4 pr-8 gap-4'>
                {/*1*/}

                <div className='h-full w-full col-start-4 col-span-1 row-start-1 relative overflow-visible'>
                    <img src={logo} alt="Mercado" className='h-full w-full object-contain absolute' style={{ right: '-20%' }} />
                </div>
                <div className='h-full w-full col-start-5 col-span-4 row-start-1 '>
                    <img src={mercado} alt="Mercado" className='h-full w-full object-cover' style={{
                        WebkitMaskImage: 'linear-gradient(-123.5deg, black 80%, transparent 50%)',
                        WebkitMaskPosition: '-100% 0',
                        maskPosition: '-100% 0',
                        maskSize: '200% 100%'
                    }} />
                </div>
                {/*2*/}
                <div className='h-full w-full col-start-8 col-span-1 row-start-2 relative overflow-visible'>
                    <img src={logo} alt="Logo" className='absolute h-full w-full object-contain' style={{ left: '-20%' }} />
                </div>
                <div className='h-full w-full col-start-4 row-start-2 col-span-4 justify-self-end'>
                    <img
                        src={mercado}
                        alt="Mercado"
                        className='h-full w-full object-cover'
                        style={{
                            WebkitMaskImage: 'linear-gradient(135deg, black 80%, transparent 50%)',
                            maskImage: 'linear-gradient(123.5deg, black 80%, transparent 50%)',
                        }}
                    />
                </div>
                {/*3*/}
                <div className='h-full w-full col-start-4 col-span-1 row-start-3'>
                    <img src={logo} alt="Mercado" className='h-full w-full object-contain' />
                </div>
                <div className='h-full w-full col-start-5 row-start-3 col-span-4 justify-self-end'>
                    <img src={mercado} alt="Mercado" className='h-full w-full object-cover' style={{
                        WebkitMaskImage: 'linear-gradient(-123.5deg, black 80%, transparent 50%)',
                        WebkitMaskPosition: '-100% 0',
                        maskPosition: '-100% 0',
                        maskSize: '200% 100%'
                    }} />
                </div>
                {/*4*/}
                <div className='h-full w-full col-start-8 col-span-1 row-start-4 relative overflow-visible'>
                    <img src={logo} alt="Mercado" className='h-full w-full object-contain absolute' style={{ left: '-20%' }} />
                </div>
                <div className='h-full w-full col-start-4 row-start-4 col-span-4 justify-self-end'>
                    <img src={mercado} alt="Mercado" className='h-full w-full object-cover' style={{
                        WebkitMaskImage: 'linear-gradient(135deg, black 80%, transparent 50%)',
                        maskImage: 'linear-gradient(123.5deg, black 80%, transparent 50%)'
                    }} />
                </div>

            </div>

        </section>
    );
}