import mascara1 from '../assets/img/mascara-1.png';
import mercado from '../assets/img/mercado.jpg';
export default function CasosExito() {
    return (
        <section className="h-screen flex flex-col justify-center items-center bg-amber-200">
            <div className="flex flex-row w-full gap-8 justify-center items-center">
                <h2 className='w-full'>ppepep</h2>
                <div
                    className="h-screen w-[2000px] bg-center bg-cover scale-150"
                    style={{
                        backgroundImage: `url(${mercado})`,
                        WebkitMaskImage: `url(${mascara1})`,
                        maskImage: `url(${mascara1})`,
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                    }}
                    role="img"
                    aria-label="Máscara 1"
                />

            </div>
        </section>
    );
}