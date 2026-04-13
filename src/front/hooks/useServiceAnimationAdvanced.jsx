import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

export function useServiceAnimationAdvanced(sectionRef, currentIndex, totalSlides, onNavigate) {
    const triggerDownRef = useRef(null);   // Trigger para scroll hacia ABAJO (entrada desde arriba)
    const triggerUpRef = useRef(null);     // Trigger para scroll hacia ARRIBA (salida hacia arriba)
    const observerRef = useRef(null);
    const lastNavTimeRef = useRef(0);      // ⭐ Throttle para evitar múltiples navegaciones
    const currentIndexRef = useRef(currentIndex);  // ⭐ Ref para tener acceso actualizado al índice
    const hasScrolledRef = useRef(false);  // ⭐ Flag para evitar activar al cargar

    // Actualizar el ref cuando currentIndex cambia
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);


    useEffect(() => {
        if (!sectionRef?.current) return;

        const createTriggers = () => {
            // ⭐ LIMPIA triggers anteriores para evitar duplicados
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.id === "triggerDown") {
                    trigger.kill();
                }
            });

            // Primero crear el Observer DESHABILITADO SIN bloquear scroll
            observerRef.current = Observer.create({
                type: "wheel,touch",
                wheelSpeed: 1,
                preventDefault: false,  // ⭐ NO bloquea scroll al inicio, se habilita cuando trigger está activo
                enabled: false, // Deshabilitado al inicio
                onChange: (self) => {
                    const now = Date.now();
                    if (now - lastNavTimeRef.current < 400) {
                        return; // Throttle: evita navegación rápida
                    }

                    const deltaY = self.deltaY;

                    if (deltaY > 0) {
                        // SCROLL DOWN
                        console.log("🔽 SCROLL DOWN - currentIndex:", currentIndexRef.current, "- deltaY:", deltaY);
                        if (currentIndexRef.current === totalSlides - 1) {
                            // Última diapositiva: libera con animación suave
                            console.log("📤 Deshabilitando observer en última slide + scroll animado");
                            observerRef.current?.disable();
                            // Anima el scroll hacia abajo para salir del trigger
                            gsap.to(window, {
                                scrollTo: { y: window.scrollY + 150 },
                                duration: 0.8,
                                ease: "power2.inOut"
                            });
                        } else {
                            // Navega a siguiente
                            lastNavTimeRef.current = now;
                            onNavigate?.('next');
                        }
                    } else if (deltaY < 0) {
                        // SCROLL UP
                        console.log("🔼 SCROLL UP - currentIndex:", currentIndexRef.current, "- deltaY:", deltaY);
                        if (currentIndexRef.current === 0) {
                            // Primera diapositiva: libera con animación suave
                            console.log("📤 Deshabilitando observer en primera slide + scroll animado");
                            observerRef.current?.disable();
                            // Anima el scroll hacia arriba para salir del trigger
                            gsap.to(window, {
                                scrollTo: { y: window.scrollY - 150 },
                                duration: 0.8,
                                ease: "power2.inOut"
                            });
                        } else {
                            // Navega a anterior
                            lastNavTimeRef.current = now;
                            onNavigate?.('prev');
                        }
                    }
                }
            });

            // TRIGGER: Activa/desactiva el observer cuando entra/sale de vista
            triggerDownRef.current = ScrollTrigger.create({
                trigger: sectionRef.current,  // ⭐ Una section/ref ESPECÍFICA, no selector genérico
                start: "-30px top",  // Se activa cuando el TOP llega al 80% de la pantalla
                end: "100px top",  // Se desactiva cuando BOTTOM sale del 20% inferior
                markers: true,  // Desactiva marcadores de debug
                id: "triggerDown",
                onToggle: (self) => {
                    console.log("🔔 ScrollTrigger onToggle:", self.isActive);
                    if (self.isActive) {
                        // ENTRA en el trigger: activa el observer Y AHORA SÍ bloquea scroll
                        console.log("🟢 TRIGGER ACTIVO - Habilitando observer + preventDefault");
                        // Destruir y recrear el Observer con preventDefault: true
                        observerRef.current?.kill();
                        observerRef.current = Observer.create({
                            type: "wheel,touch",
                            wheelSpeed: 1,
                            preventDefault: true,  // ⭐ AHORA SÍ bloquea
                            enabled: true,  // Habilitado directamente
                            onChange: (self) => {
                                const now = Date.now();
                                if (now - lastNavTimeRef.current < 400) {
                                    return;
                                }
                                const deltaY = self.deltaY;
                                if (deltaY > 0) {
                                    console.log("🔽 SCROLL DOWN");
                                    if (currentIndexRef.current === totalSlides - 1) {
                                        observerRef.current?.disable();
                                        gsap.to(window, {
                                            scrollTo: { y: window.scrollY + 150 },
                                            duration: 0.8,
                                            ease: "power2.inOut"
                                        });
                                    } else {
                                        lastNavTimeRef.current = now;
                                        onNavigate?.('next');
                                    }
                                } else if (deltaY < 0) {
                                    console.log("🔼 SCROLL UP");
                                    if (currentIndexRef.current === 0) {
                                        observerRef.current?.disable();
                                        gsap.to(window, {
                                            scrollTo: { y: window.scrollY - 150 },
                                            duration: 0.8,
                                            ease: "power2.inOut"
                                        });
                                    } else {
                                        lastNavTimeRef.current = now;
                                        onNavigate?.('prev');
                                    }
                                }
                            }
                        });
                    } else {
                        // SALE del trigger: desactiva el observer y restaura preventDefault: false
                        console.log("🔴 TRIGGER INACTIVO - Deshabilitando observer");
                        observerRef.current?.kill();
                        observerRef.current = Observer.create({
                            type: "wheel,touch",
                            wheelSpeed: 1,
                            preventDefault: false,  // ⭐ Restaura comportamiento normal
                            enabled: false
                        });
                    }
                }
            });

            // ⭐ Recalcula posiciones de triggers después de que todo cargue
            ScrollTrigger.refresh();
        };

        // Espera a que la página cargue completamente (imágenes, etc)
        if (document.readyState === "complete") {
            // La página ya está cargada
            createTriggers();
        } else {
            // Espera a que cargue todo
            window.addEventListener("load", createTriggers);
        }

        // Cleanup
        return () => {
            window.removeEventListener("load", createTriggers);
            triggerDownRef.current?.kill();
            triggerUpRef.current?.kill();
            observerRef.current?.kill();
        };
    }, [sectionRef, onNavigate]);  // ⭐ sectionRef + onNavigate (ya memoizado en padre)


}