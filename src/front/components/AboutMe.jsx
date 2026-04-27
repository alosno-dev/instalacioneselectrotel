import wallboxAc from '../assets/img/wallbox-ac.png';
import { useEffect, useRef } from 'react';
import AboutMeAnimation from '../animations/aboutMe';

export default function AboutMe() {
    const fondoRef = useRef(null);
    const textRef = useRef(null);
    const frase = "Integramos innovación y precisión técnica en cada proyecto eléctrico garantizando eficiencia, seguridad, y confianza a largo plazo";
    const words = frase.split(" ");

    useEffect(() => {
        const cleanup = AboutMeAnimation({ sectionRef: fondoRef, fondoRef, textRef: textRef });
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <section className="relative z-20 flex flex-col h-220 w-full p-8 gap-2 justify-center items-center bg-[#20438A]" ref={fondoRef}>
            <h4 className="text-2xl">SOBRE NOSOTROS</h4>
            <h2 className='text-2xl text-blue text-center font-bold w-[740px]' ref={textRef}>{words.map((word, index) => (
                <span key={`${word}-${index}`} className="inline-block mr-2">{word}</span>
            ))}</h2>
            <img
                className="my-2 w-[393px] h-auto object-cover"
                src={wallboxAc}
                alt="Wallbox AC - Cargador de vehículos eléctricos"
                loading="lazy"
            />
        </section>
    );
}