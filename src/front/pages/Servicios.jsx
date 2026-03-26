import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaMapMarkerAlt } from "react-icons/fa";
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

const ServicioBlock = ({ servicio, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    }
  }, [inView]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`servicio-block ${isEven ? 'normal' : 'reverse'}`}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <img src={servicio.imagen} alt={servicio.titulo} className="servicio-img" />
      <div className="servicio-texto">
        <h2>{servicio.titulo}</h2>
        <p>{servicio.descripcion}</p>
      </div>
    </motion.div>
  );
};

export const Servicios = () => {
  return (
    <section className="servicios-section">
      {servicios.map((servicio, i) => (
        <ServicioBlock key={i} servicio={servicio} index={i} />
      ))}
    </section>
  );
};