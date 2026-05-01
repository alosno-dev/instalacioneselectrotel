import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import contactoFoto from "../assets/img/contacto-foto.jpg"

export const ContactoHome = () => {
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEnviado(false);

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Error al enviar el mensaje.");
      setEnviado(true);
      setForm({ nombre: "", telefono: "", email: "", mensaje: "" });
    } catch (err) {
      setError("Hubo un problema al enviar tu mensaje. Intenta más tarde.");
    }
  };

  return (
    <section className="contacto-home" id="contacto">

      <div className="w-full h-auto flex flex-col gap-5 lg:gap-0 lg:flex-row">
        <img src={contactoFoto} alt="Imagen electricista trabajando" className="fotoContacto max-w-200 object-cover min-w-10 lg:min-w-150" />

        <form onSubmit={handleSubmit} className="contacto-form static flex flex-col lg:h-full h-full flex-1">
          <h2>Contáctanos</h2>
          <input name="nombre" type="text" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} required />
          <input name="telefono" type="tel" placeholder="Tu teléfono" value={form.telefono} onChange={handleChange} />
          <input name="email" type="email" placeholder="Tu correo electrónico" value={form.email} onChange={handleChange} required />
          <textarea name="mensaje" placeholder="Tu mensaje" value={form.mensaje} onChange={handleChange} required />
          {error && <p className="form-error">{error}</p>}
          {enviado && <p className="form-success">¡Mensaje enviado correctamente!</p>}
          <button type="submit" className="btn-enviar flex flex-row justify-center items-center gap-1 h-10">
            <FaPaperPlane className="me-2" /> Enviar
          </button>
        </form>
      </div>

    </section>
  );
};
