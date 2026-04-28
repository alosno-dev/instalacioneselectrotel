import wallboxAc from '../assets/img/wallbox-ac.png';
import { useEffect, useRef } from 'react';
import AboutMeAnimation from '../animations/aboutMe';

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
            <section className="h-100 gap-2 bg-[#20438A] flex flex-col justify-center items-center">
                <h4 className="text-6xl font-extrabold text-white opacity-0" ref={tituloRef}>SOBRE NOSOTROS</h4>

                <h2 className='text-4xl text-white font-bold flex items-center justify-start w-screen h-auto gap-4' ref={textRef}>{words.map((word, index) => (
                    <span className="whitespace-nowrap flex-shrink-0" key={`${word}-${index}`}>{word}</span>
                ))}</h2>


                <h2 className='text-3xl text-white font-bold flex items-center justify-start w-screen h-auto gap-4 opacity-0' ref={text2Ref}>{words2.map((word, index) => (
                    <span key={`${word}-${index}`} className="inline-block mr-2">{word}</span>
                ))}</h2>

                <img
                    className="my-2 w-[393px] h-auto object-cover opacity-0"
                    src={wallboxAc}
                    alt="Wallbox AC - Cargador de vehículos eléctricos"
                    loading="lazy"
                />
            </section>
        </section>
    );
}