import React, { useState, useEffect, useRef } from "react";
import EmblaCarousel from "embla-carousel";
import TarjetaGrid from "./TarjetaGrid";
import cuadro from "../assets/img/cuadro-empresas.jpg";
import puntoRecarga from "../assets/img/punto-recarga.jpeg";
import suministros from "../assets/img/suministros-electricos.jpg";

export default function Carousel() {
    const emblaRef = useRef(null);
    const [emblaApi, setEmblaApi] = useState(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // nuevo: flex-basis responsivo para mostrar "parte" del siguiente slide
    const [basis, setBasis] = useState("calc(100% / 3.5)");

    useEffect(() => {
        const updateBasis = () => {
            const w = window.innerWidth;
            // Tailwind: sm >= 640, md >= 768
            if (w >= 768) {
                // md+ : mostrar ~3.5 slides
                setBasis("calc(100% / 3.5)");
            } else if (w >= 640) {
                // sm : mostrar 2 y un poco de la 3ª
                setBasis("calc(100% / 2.2)");
            } else {
                // móvil : mostrar 1 y un poco de la 2ª
                setBasis("calc(100% / 1.15)");
            }
        };

        updateBasis();
        window.addEventListener("resize", updateBasis);
        return () => window.removeEventListener("resize", updateBasis);
    }, []);

    useEffect(() => {
        if (!emblaRef.current) return;

        const embla = EmblaCarousel(emblaRef.current, { loop: true, align: 'start', containScroll: 'trimSnaps' });
        setEmblaApi(embla);

        const onSelect = () => {
            setCanScrollPrev(embla.canScrollPrev());
            setCanScrollNext(embla.canScrollNext());
        };

        embla.on("select", onSelect);
        embla.on("dragStart", () => setIsDragging(true));
        embla.on("dragEnd", () => setIsDragging(false));
        onSelect();

        return () => {
            embla.destroy();
        };
    }, []);

    const slides = [
        {
            url: cuadro,
            text: "Instalaciones eléctricas",
        },
        {
            url: puntoRecarga,
            text: "Instalacion de puntos de recarga de vehiculo electrico",
        },
        {
            url: suministros,
            text: "Nuevos suministros electricos y acometidas",
        },
        {
            url: cuadro,
            text: "Planificacion de obras,memorias tecnicas de diseño y nuevos certificados electricos",
        },
        {
            url: puntoRecarga,
            text: "Porteros automaticos y videoporteros",
        },
        {
            url: suministros,
            text: "Reformas y nuevas instalaciones en viviendas empresas y locales comerciales",
        },
    ];

    return (
        <div className="w-full py-8">
            <div className={`overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            // usa la variable responsiva 'basis'
                            style={{ flex: `0 0 ${basis}` }}
                            className="min-w-0 mr-4"
                        >
                            <TarjetaGrid
                                url={slide.url}
                                text={slide.text}
                                className="w-full h-80 rounded-lg shadow-lg overflow-hidden"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}