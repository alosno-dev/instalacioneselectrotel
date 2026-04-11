import { FaMapMarkerAlt } from "react-icons/fa";
import heroBg from '../assets/img/hero-bg.jpg';
import fondoHero from '../assets/img/fondo-hero.jpg';
import paloElectrico from '../assets/img/palo-electrico.png';

export default function Hero() {
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
            <div id="hero-content" className="flex flex-col justify-center items-center text-center p-4 gap-4">
                <div className="flex flex-row">
                    <FaMapMarkerAlt className="text-blue-600 mr-2" size={24} aria-hidden="true" />
                    <h3 className="text-[16px] md:text-xl">El Puerto de Santa maria</h3>
                </div>
                <h1 className="text-[36px] md:text-[44px] text-gray-950 leading-none max-w-250 font-ultra">SOLUCIONES ELECTRICAS PROFESIONALES</h1>
                <h2 className="text-[16px] md:text-[24px] max-w-250">Desarrollamos e implementamos proyectos eléctricos confiables para hogares, comercios e industria, garantizando resultados duraderos y seguros.</h2>
                <div className="relative mx-4 h-150 flex justify-center items-center overflow-hidden" style={{ width: '80vw' }}>
                    {// Imagen abajo de los botones
                    }
                    <img className="absolute w-full h-full object-cover overflow-hidden" src={fondoHero} alt="Fondo de hero" />

                    {// Imagen de cabina
                    }
                    <img className="absolute top-20 right-60 h-170" src={paloElectrico} alt="Palo eléctrico" />

                </div>


                <div className="flex flex-row gap-4 mt-4">
                    <a
                        href="#contacto"
                        className="flex w-30 md:w-50 h-10 border-2 border-blue-600 justify-center items-center transform transition-colors duration-200 hover:bg-blue-50 hover:border-blue-700"
                    >
                        Contáctanos
                    </a>
                    <a
                        href="/presupuesto"
                        className="flex w-50 h-10 bg-blue-600 text-amber-50 justify-center items-center transform transition-colors duration-200 hover:-rotate-3 hover:bg-blue-700"
                    >
                        Presupuesto online
                    </a>
                </div>
            </div>
        </section>
    );
}