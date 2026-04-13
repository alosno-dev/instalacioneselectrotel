import { useRef, useState, useCallback } from "react";
import { useServiceAnimationAdvanced } from "../hooks/useServiceAnimationAdvanced";
import imagen1 from "../assets/img/1.png";
import imagen2 from "../assets/img/2.png";
import imagen3 from "../assets/img/3.png";
import imagen4 from "../assets/img/4.png";
import imagen5 from "../assets/img/5.png";

const servicios = [
  {
    titulo: "Instalaciones y Renovaciones Eléctricas",
    descripcion: "Obras en viviendas, locales comerciales y comunidades (nuevas acometidas, reformas integrales y actualizaciones).",
    imagen: imagen1,
  },
  {
    titulo: "Cuadros, Boletines y Certificaciones",
    descripcion: "Cambio o renovación de cuadros eléctricos, emisión de boletines y certificados oficiales para legalización.",
    imagen: imagen2,
  },
  {
    titulo: "Iluminación y Domótica",
    descripcion: "Proyectos LED de interior y exterior, así como sistemas inteligentes de automatización del hogar.",
    imagen: imagen3,
  },
  {
    titulo: "Control de Acceso y Seguridad",
    descripcion: "Instalación de porteros automáticos, videoporteros y soluciones integrales de accesos.",
    imagen: imagen4,
  },
  {
    titulo: "Movilidad Eléctrica y Servicios para Comunidades",
    descripcion: "Puntos de carga para vehículos eléctricos y mantenimiento eléctrico especializado para comunidades de vecinos.",
    imagen: imagen5,
  },
];

const ServicioBlock = ({ servicio, index, isEven, currentIndex }) => {
  const isCurrentBlock = index === currentIndex;

  return (
    <div
      className={`servicio-block ${isEven ? 'normal' : 'reverse'}`}
      style={{
        opacity: isCurrentBlock ? 1 : 0,
        pointerEvents: isCurrentBlock ? 'auto' : 'none',
        transition: 'opacity 0.6s ease',
      }}
    >
      <img src={servicio.imagen} alt={servicio.titulo} className="servicio-img" />
      <div className="servicio-texto">
        <h2>{servicio.titulo}</h2>
        <p>{servicio.descripcion}</p>
      </div>
    </div>
  );
};

export const Servicios = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  const handleNavigate = useCallback((direction) => {
    if (direction === 'next') {
      setCurrentIndex((prev) => Math.min(prev + 1, servicios.length - 1));
    } else if (direction === 'prev') {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  }, []);  // ⭐ No necesita dependencias, handleNavigate nunca cambia

  // Hook que controla scroll + rueda para navegar slides
  useServiceAnimationAdvanced(sectionRef, currentIndex, servicios.length, handleNavigate);

  return (
    <section ref={sectionRef} className="servicios-section">
      {servicios.map((servicio, i) => (
        <ServicioBlock
          key={i}
          servicio={servicio}
          index={i}
          isEven={i % 2 === 0}
          currentIndex={currentIndex}
        />
      ))}
    </section>
  );
};