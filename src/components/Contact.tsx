import { useState, useRef } from "react";
import { Smartphone, Send} from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef<any>(null);
  const [status, setStatus] = useState(""); // para mostrar mensajes de éxito/error

  const sendEmail = (e: any) => {
    e.preventDefault();
    setStatus("enviando");

    emailjs
      .sendForm(
        "service_k6mfsms", // Reemplaza con el tuyo
        "template_i600op7", // Reemplaza con el tuyo
        form.current,
        "0Oe9gArHX0PqdAKsvGaR1" // Reemplaza con el tuyo
      )
      .then(
        () => {
          setStatus("exito");
          form.current.reset(); // Limpia el formulario
        },
        (error) => {
          setStatus("error");
          console.log("Fallo...", error.text);
        }
      );
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-500/5 blur-3xl pointer-events-none rounded-full"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Contacto
        </h2>
        {/* Formulario mejorado */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="max-w-md mx-auto space-y-4 mb-12"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Tu Nombre"
            required
            className="w-full bg-gray-100 border border-slate-700 rounded-xl p-3 text-black focus:outline-none transition-colors"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Tu Email"
            required
            className="w-full bg-gray-100 border border-slate-700 rounded-xl p-3 text-black focus:outline-none transition-colors"
          />
          <textarea
            name="message"
            placeholder="Tu Mensaje ( Puedes dejar tu numero aqui o contactarme por whatsapp y te respondere lo antes posible )"
            required
            // @ts-ignore
            rows="4"
            className="w-full bg-gray-100 border border-slate-700 rounded-xl p-3 text-black focus:outline-none transition-colors"
          />

          <button
            type="submit"
            disabled={status === "enviando"}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {status === "enviando" ? (
              "Enviando..."
            ) : (
              <>
                <Send size={20} /> Enviar Mensaje
              </>
            )}
          </button>

          {status === "exito" && (
            <p className="text-green-400 mt-2">¡Mensaje enviado con éxito!</p>
          )}
          {status === "error" && (
            <p className="text-red-400 mt-2">
              Hubo un error, intenta de nuevo.
            </p>
          )}
        </form>

        {/* Tus enlaces originales como respaldo */}
        <div className="flex flex-wrap justify-center gap-4 max-w-lg mx-auto">
          <a
            href="https://wa.me/3424483534"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            <Smartphone size={20} /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
