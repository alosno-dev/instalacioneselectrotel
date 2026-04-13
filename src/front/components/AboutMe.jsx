import wallboxAc from '../assets/img/wallbox-ac.png';

export default function AboutMe() {
    return (
        <section className="flex flex-col h-auto w-full p-8 gap-2 justify-center items-center bg-gray-100">
            <h4>Sobre nosotros</h4>
            <h2 className='text-2xl text-blue text-center font-bold w-[740px]'>Integramos innovación y precisión técnica en cada proyecto eléctrico garantizando eficiencia, seguridad, y confianza a largo plazo</h2>
            <img
                className="my-2 w-[393px] h-auto aspect-square object-cover"
                src={wallboxAc}
                alt="Wallbox AC - Cargador de vehículos eléctricos"
                loading="lazy"
            />
        </section>
    );
}