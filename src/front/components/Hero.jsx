import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { slideUpLeft } from '../animations';
import heroBg from '../assets/img/hero-bg.jpg';
import fondoHero from '../assets/img/fondo-hero.jpg';
import paloElectrico from '../assets/img/palo-electrico.png';
import './hero.css';

export default function Hero() {
    const fondoRef = useRef(null);

    useEffect(() => {
        slideUpLeft(fondoRef.current);
    }, []);
    return (
        <section
            id="hero-section"
            className="relative w-full h-auto flex flex-col justify-center items-center text-center p-4 gap-4 z-40"
            style={{
                backgroundImage: `url(${heroBg})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <div id="hero-content" className="flex flex-col mt-10 w-full lg:h-screen lg:justify-between justify-center items-center text-center p-4 ">
                <div className="flex flex-col gap-6 w-full lg:w-[calc(100%-3rem)] lg:justify-start lg:mx-5 lg:mt-5 justify-center items-center lg:items-start lg:text-start" >
                    <div className="flex flex-row justify-center mb-2 gap-2">
                        <FaMapMarkerAlt className="text-blue-600 mr-2" size={24} aria-hidden="true" />
                        <h3 className="text-[16px] md:text-xl">El Puerto de Santa maria</h3>
                    </div>
                    <h1 className="text-[36px] md:text-[90px] text-gray-950 leading-none lg:max-w-500 max-w-250 font-ultra">SOLUCIONES ELÉCTRICAS PROFESIONALES</h1>
                    <h2 className="text-[16px] md:text-[24px] max-w-250">Desarrollamos e implementamos proyectos eléctricos confiables para hogares, comercios e industria, garantizando resultados duraderos y seguros.</h2>
                    <div className="flex flex-row justify-center lg:justify-start mt-6 gap-15">
                        <a
                            href="#contacto"
                            className="flex items-center w-fit text-[42px] h-11 font-bold justify-start transform transition-colors duration-200 hover:bg-blue-50 hover:border-blue-700"
                        >
                            CONTÁCTANOS
                        </a>
                        <a
                            href="/presupuesto"
                            className="flex w-full md:w-full text-[42px] h-10 lg:justify-start p-4 bg-gray-900 text-amber-50 font-bold justify-center items-center transform transition-colors duration-200 hover:-rotate-3 hover:bg-blue-700"
                        >
                            PRESUPUESTO ONLINE
                        </a>
                    </div>
                </div>


                <div className="relative h-120 w-full lg:w-screen flex justify-center items-center" style={{ clipPath: 'inset(-1000px 0 0 0)' }}>
                    {// Imagen abajo de los botones
                    }
                    <img ref={fondoRef} className="absolute w-full h-full object-cover" src={fondoHero} alt="Fondo de hero" />

                    {// Imagen de cabina
                    }
                    <img className="absolute right-50 h-300" src={paloElectrico} alt="Palo eléctrico" />

                </div>



            </div>
        </section>
    );
}