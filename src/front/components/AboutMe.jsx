import { useEffect, useRef } from 'react';
import AboutMeAnimation from '../animations/aboutMe';
import videFondo from '../assets/video/Bombilla.mp4';
export default function AboutMe() {
    const fondoRef = useRef(null);
    const textRef = useRef(null);
    const text2Ref = useRef(null);
    const frase = "Garantizamos eficiencia, seguridad y confianza a largo plazo";
    const frase2 = "Energía segura. Instalaciones precisas. Confianza que perdura";
    const words = ["Garantizamos eficiencia,", "seguridad", "y confianza a largo plazo"];
    const words2 = ["Energía segura.", "Instalaciones precisas.", "Confianza que perdura."]; // Dividimos la frase en palabras para animarlas individualmente
    const tituloRef = useRef(null);

    useEffect(() => {
        const cleanup = AboutMeAnimation({ sectionRef: fondoRef, fondoRef, textRef: textRef, text2Ref: text2Ref, tituloRef: tituloRef });
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <section className="relative z-20 flex flex-col h-220 w-full p-8 gap-2 justify-center items-center" ref={fondoRef}>
            <section className="seccionFondo relative h-screen gap-2 flex flex-col justify-center items-center overflow-hidden">
                {/* Video de fondo */}
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={videFondo} type="video/mp4" />
                    Tu navegador no soporta videos HTML5
                </video>

                {/* Overlay oscuro opcional para mejor legibilidad */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                {/* Contenido superpuesto */}
                <div className="relative z-10 flex flex-col justify-center items-center w-full h-full gap-4">
                    <h4 className="text-6xl font-extrabold text-white opacity-0" ref={tituloRef}>SOBRE NOSOTROS</h4>

                    <h2 className='lg:text-4xl text-xl text-white font-bold flex items-center justify-start w-screen h-auto gap-4 opacity-0' ref={textRef}>{words.map((word, index) => (
                        <span className="whitespace-nowrap flex-shrink-0" key={`${word}-${index}`}>{word}</span>
                    ))}</h2>


                    <h2 className='text-3xl text-white font-bold flex items-center justify-start w-screen h-auto gap-4 opacity-0' ref={text2Ref}>{words2.map((word, index) => (
                        <span key={`${word}-${index}`} className="inline-block mr-2">{word}</span>
                    ))}</h2>


                </div>
            </section>
        </section>
    );
}