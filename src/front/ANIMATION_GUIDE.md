# Guía de Animaciones GSAP para Servicios

## 📋 Descripción General

Se han creado dos hooks de animación para la sección de servicios:

1. **useServiceAnimation** - Hook básico y recomendado
2. **useServiceAnimationAdvanced** - Hook avanzado con efectos adicionales

Ambos animan el movimiento del bloque de texto hacia el lado contrario mientras revelan la imagen debajo.

---

## 🎨 Hook Básico: `useServiceAnimation`

### Implementación Actual (usado en Servicios.jsx)

```jsx
import { useServiceAnimation } from "../hooks/useServiceAnimation";

const ServicioBlock = ({ servicio, index }) => {
  const serviciRef = useRef(null);
  const isEven = index % 2 === 0;

  useServiceAnimation(serviciRef, isEven);

  return (
    <div
      ref={serviciRef}
      className={`servicio-block ${isEven ? "normal" : "reverse"}`}
    >
      <img
        src={servicio.imagen}
        alt={servicio.titulo}
        className="servicio-img"
      />
      <div className="servicio-texto">
        <h2>{servicio.titulo}</h2>
        <p>{servicio.descripcion}</p>
      </div>
    </div>
  );
};
```

### Opciones Personalizables

```jsx
// Parámetros y opciones
useServiceAnimation(ref, isEven, {
  revealDistance: 300, // Distancia que se mueve el texto (px)
  scrubAmount: 1, // Suavidad (0-3, donde 1 = suave)
  startTrigger: "top center", // Punto donde inicia la animación
  endTrigger: "center center", // Punto donde termina la animación
});
```

### Ejemplo Personalizado

```jsx
// Animación más agresiva
useServiceAnimation(serviciRef, isEven, {
  revealDistance: 500,
  scrubAmount: 2,
  startTrigger: "top 80%",
  endTrigger: "top 20%",
});

// Animación más suave y lenta
useServiceAnimation(serviciRef, isEven, {
  revealDistance: 150,
  scrubAmount: 0.5,
});
```

---

## ⚡ Hook Avanzado: `useServiceAnimationAdvanced`

Para usar el hook avanzado, reemplaza el import:

```jsx
import { useServiceAnimationAdvanced } from "../hooks/useServiceAnimationAdvanced";

const ServicioBlock = ({ servicio, index }) => {
  const serviciRef = useRef(null);
  const isEven = index % 2 === 0;

  useServiceAnimationAdvanced(serviciRef, isEven, {
    enableParallax: true,
    enableTilt: false,
  });

  // ... resto del código
};
```

### Opciones del Hook Avanzado

```jsx
useServiceAnimationAdvanced(ref, isEven, {
  revealDistance: 300, // Distancia de movimiento
  scrubAmount: 1, // Suavidad del scroll
  enableParallax: false, // Efecto parallax en la imagen
  enableTilt: false, // Efecto tilt al pasar el mouse
});
```

### Ejemplos de Uso

**Con Parallax:**

```jsx
useServiceAnimationAdvanced(serviciRef, isEven, {
  revealDistance: 300,
  enableParallax: true,
  enableTilt: false,
});
```

**Con Tilt (effect 3D al pasar mouse):**

```jsx
useServiceAnimationAdvanced(serviciRef, isEven, {
  revealDistance: 300,
  enableParallax: false,
  enableTilt: true,
});
```

**Combinado (todas las características):**

```jsx
useServiceAnimationAdvanced(serviciRef, isEven, {
  revealDistance: 300,
  enableParallax: true,
  enableTilt: true,
  scrubAmount: 1.5,
});
```

---

## 🎬 Qué Hace la Animación

### Flujo Visual

1. **Estado Inicial**: El texto es totalmente opaco (opacity: 1) y la imagen está semi-transparente (opacity: 0.5)
2. **Durante el Scroll**:
   - El bloque de texto se mueve hacia el lado contrario (derecha si es par, izquierda si es impar)
   - El texto se desvanece gradualmente
   - La imagen se vuelve más opaca y se revela
3. **Estado Final**: El texto está completamente escondido y la imagen es totalmente visible

### Dirección del Movimiento

- **Bloques Pares** (índice 0, 2, 4...): El texto se mueve hacia la **derecha**
- **Bloques Impares** (índice 1, 3, 5...): El texto se mueve hacia la **izquierda**

---

## 🛠️ Customización CSS

Los estilos principales están en `index.css`:

```css
.servicio-texto {
  max-width: 600px;
  margin-left: 20px;
  position: relative;
  z-index: 10;
  will-change: transform, opacity; /* Optimización de rendimiento */
}

.servicio-img {
  max-width: 100%;
  height: 580px;
  flex-shrink: 0;
}
```

### Cambiar Distancia/Opacidad Base

Modifica en `index.css`:

```css
.servicio-img {
  opacity: 0.5; /* Cambiar opacidad inicial */
  height: 580px;
}
```

---

## 📊 ScrollTrigger - Puntos de Activación

La animación se activa basada en ScrollTrigger. Puedes ajustar:

```jsx
// Valores por defecto
start: "top center"; // Inicia cuando el top del elemento está en el center de la viewport
end: "center center"; // Termina cuando el center del elemento está en el center de la viewport
```

### Otras opciones comunes:

```jsx
// Animación rápida (muy sensible)
start: "top 80%";
end: "top 20%";

// Animación lenta (más distancia de scroll)
start: "top bottom";
end: "center top";

// Animación suave en todo el viewport
start: "top bottom";
end: "bottom top";
```

---

## ⚙️ Control del Scrub

El parámetro `scrub` controla qué tan "pegada" está la animación al scroll:

- **scrub: 0** - No hay retraso (animación instantánea con el scroll)
- **scrub: 0.5** - Pequeño retraso suave
- **scrub: 1** - Balance perfecto (recomendado) ✅
- **scrub: 2** - Más retraso (efecto más fluido pero lento)
- **scrub: 3** - Mucho retraso (efecto muy suave pero puede sentirse lento)

---

## 🚀 Mejoras Futuras Posibles

1. **Click para cambiar servicio**: Agregar navegación entre servicios con click
2. **Keyboard navigation**: Navegar con flechas del teclado
3. **Animación de transición**: Animar cuando se cambia entre servicios
4. **Efectos adicionales**: Blur, color shift, o scale en la imagen
5. **Respuesta al hover**: Agregar interactividad al pasar el mouse

---

## 🐛 Debug

Para ver los marcadores de ScrollTrigger (útil para entender cuándo se activa):

En el hook, cambia `markers: false` a `markers: true`:

```jsx
scrollTrigger: {
  trigger: servicio,
  start: "top center",
  end: "center center",
  markers: true, // Verás líneas de debug en la página
  scrub: 1,
}
```

---

## 📱 Responsive

La animación funciona en mobile, pero considera ajustar:

```jsx
// En mobiles
useServiceAnimation(serviciRef, isEven, {
  revealDistance: 150, // Menos distancia en móvil
  scrubAmount: 0.8,
});
```

Puedes detectar el tamaño de viewport:

```jsx
const isMobile = window.innerWidth < 768;
const distance = isMobile ? 150 : 300;

useServiceAnimation(serviciRef, isEven, {
  revealDistance: distance,
});
```

---

## 📝 Archivos Modificados

- `src/front/pages/Servicios.jsx` - Componente principal actualizado
- `src/front/hooks/useServiceAnimation.jsx` - Hook básico (NUEVO)
- `src/front/hooks/useServiceAnimationAdvanced.jsx` - Hook avanzado (NUEVO)
- `src/front/index.css` - Estilos optimizados
