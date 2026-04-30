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
        const cleanup = CasosExitoAnimation(containerRef, imageRef);
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <section className={`h-auto w-screen flex flex-row items-start bg-url(${heroBg}) bg-cover bg-center relative overflow-hidden`} ref={containerRef}>
            <div className="h-screen w-150 absolute left-0 flex flex-col justify-center items-center" ref={imageRef}>
                <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0">
                    <defs>
                        <path
                            id="circlePath"
                            d="M 0, 200 m -180, 0 a 180,180 0 1,1 360,0 a 180,180 0 1,1 -360,0"
                            fill="none"
                        />
                    </defs>
                    <g id="textGroup">
                        <text fontSize="28" fontWeight="bold" fill="currentColor">
                            <textPath id='text1' href="#circlePath" startOffset="0%" textAnchor="middle">
                                CONFIAN EN NOSOTROS
                            </textPath>
                            <textPath id='text2' href="#circlePath" startOffset="0%" textAnchor="middle">
                                HAZLO POSIBLE CON ELECTROTEL
                            </textPath>
                        </text>
                    </g>
                </svg>
                <a href='/mi-enlace' className="logoIzquierda absolute right-140 h-full w-full z-10 ">
                    <img src={logoSVG} alt="Imagen logo" className=" h-full w-full object-contain filter grayscale hover:pointer" />
                </a>
            </div>

            <div className='grid grid-rows-4 grid-cols-8 w-screen h-400 justify-items-center z-10 py-4 pr-8 gap-4'>
                {/*1*/}

                <div className='h-full w-full col-start-4 col-span-1 row-start-1 relative overflow-visible'>
                    <img src={logo} alt="Mercado" className='h-full w-full object-contain absolute z-10' style={{ right: '-25%' }} />
                </div>
                <div className='h-full w-full col-start-5 col-span-4 row-start-1 relative'>
                    <img src={mercado} alt="Mercado" className='h-full w-full object-cover' />
                    <div className='absolute inset-0 pointer-events-none' style={{
                        background: 'linear-gradient(-105.5deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 80%)',
                    }} />
                </div>
                {/*2*/}
                <div className='h-full w-full col-start-8 col-span-1 row-start-2 relative overflow-visible z-10'>
                    <img src={logo} alt="Logo" className='absolute h-full w-full object-contain z-10' style={{ left: '-25%' }} />
                </div>
                <div className='h-full w-full col-start-4 row-start-2 col-span-4 justify-self-end relative'>
                    <img
                        src={mercado}
                        alt="Mercado"
                        className='h-full w-full object-cover'
                    />
                    <div className='absolute inset-0 pointer-events-none' style={{
                        background: 'linear-gradient(105deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 80%)',
                    }} />
                </div>
                {/*3*/}
                <div className='h-full w-full col-start-4 col-span-1 row-start-3 relative' style={{ right: '-25%' }}>
                    <img src={logo} alt="Mercado" className='h-full w-full object-contain z-10 absolute' />
                </div>
                <div className='h-full w-full col-start-5 row-start-3 col-span-4 justify-self-end relative'>
                    <img src={mercado} alt="Mercado" className='h-full w-full object-cover' />
                    <div className='absolute inset-0 pointer-events-none' style={{
                        background: 'linear-gradient(-105.5deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 80%)',
                    }} />
                </div>
                {/*4*/}
                <div className='h-full w-full col-start-8 col-span-1 row-start-4 relative overflow-visible z-10'>
                    <img src={logo} alt="Mercado" className='h-full w-full object-contain absolute' style={{ left: '-25%' }} />
                </div>
                <div className='h-full w-full col-start-4 row-start-4 col-span-4 justify-self-end relative'>
                    <img src={mercado} alt="Mercado" className='h-full w-full object-cover' />
                    <div className='absolute inset-0 pointer-events-none' style={{
                        background: 'linear-gradient(105deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 80%)'
                    }} />
                </div>

            </div>

        </section>
    );
}