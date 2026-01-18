import { useState, useRef } from "react"
import { Smartphone, Send } from "lucide-react"
import "./components.css"

const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null)
  const [status, setStatus] = useState<"idle" | "enviando" | "exito" | "error">("idle")

  const sendForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("enviando")

    if (!form.current) return

    const formData = new FormData(form.current)

    const data = {
      name: formData.get("user_name"),
      email: formData.get("user_email"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Error al enviar")

      setStatus("exito")
      form.current.reset()
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="shadow-2xl shadow-black py-20 px-4 bg-white">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Contacto</h2>

        <form ref={form} onSubmit={sendForm} className="space-y-4">
          <input
            type="text"
            name="user_name"
            placeholder="Tu Nombre"
            required
            className="w-full border rounded-xl p-3"
          />

          <input
            type="email"
            name="user_email"
            placeholder="Tu Email"
            required
            className="w-full border rounded-xl p-3"
          />

          <textarea
            name="message"
            placeholder="Tu Mensaje"
            rows={4}
            required
            className="w-full border rounded-xl p-3"
          />

          <button
            type="submit"
            disabled={status === "enviando"}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl"
          >
            {status === "enviando" ? "Enviando..." : <><Send size={18} /> Enviar</>}
          </button>

          {status === "exito" && (
            <p className="text-green-600">Mensaje enviado correctamente</p>
          )}
          {status === "error" && (
            <p className="text-red-600">Ocurrió un error</p>
          )}
        </form>

        <a
          href="https://wa.me/3424483534"
          target="_blank"
          className="inline-flex mt-6 items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl"
        >
          <Smartphone size={18} /> WhatsApp
        </a>
      </div>
    </section>
  )
}

export default Contact
