import fondoHero from '../assets/img/fondo-hero.jpg';

export default function Hero2() {
    return (

        <div className="relative flex flex-col h-auto">
            <h1>HOLA</h1>
            <div className="relative flex">

                {// Imagen de fondo
                }
                <img className="absolute inset-0 w-full h-200 object-cover" src={fondoHero} alt="Fondo de hero" />


                {// Imagen de cabina
                }
                <img className="relative" src="path/to/your/image.jpg" alt="Description" />

            </div>

        </div>
    )
}