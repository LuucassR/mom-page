/**
 * Mensajes personalizados de WhatsApp según el tipo de seguro
 */

export const whatsappMessages: Record<string, string> = {
  Auto: "Hola! 👋 Me gustaría cotizar un seguro para mi auto. ¿Cuáles son las opciones disponibles? 🚗",
  Moto: "Hola! 👋 Necesito información sobre seguros para moto. ¿Qué coberturas tienen? 🏍️",
  Bicicleta: "Hola! 👋 Me interesa cotizar un seguro para bicicleta. ¿Cuáles son los planes? 🚴",
  Transporte: "Hola! 👋 Requiero información sobre seguros de transporte. ¿Cuáles son las opciones? 🚚",
  Hogar: "Hola! 👋 Me gustaría cotizar un seguro para mi hogar. ¿Qué cobertura tienen? 🏠",
  Vida: "Hola! 👋 Necesito información sobre seguros de vida. ¿Cuáles son los beneficios? 💪",
  ART: "Hola! 👋 Me interesa cotizar un seguro ART (Accidentes y Enfermedades de Trabajo). ¿Cuáles son los detalles? 🛡️",
  Comercio: "Hola! 👋 Requiero información sobre seguros para comercio. ¿Qué opciones tienen disponibles? 🏪",
  General: "Hola! 👋 Me gustaría conocer más sobre sus seguros y obtener una cotización. ¿Pueden ayudarme? 🛡️",
};

/**
 * Genera un mensaje personalizado de WhatsApp codificado para URL
 * @param type - Tipo de seguro seleccionado
 * @param customMessage - Mensaje personalizado opcional
 * @returns URL de WhatsApp codificada
 */
export const generateWhatsappLink = (type: string, customMessage?: string): string => {
  const message = customMessage || whatsappMessages[type] || whatsappMessages["General"];
  const encodedMessage = encodeURIComponent(message);
  // Reemplaza el número con tu número de WhatsApp
  return `https://wa.me/3424483534?text=${encodedMessage}`;
};

/**
 * Abre un chat de WhatsApp con mensaje personalizado
 * @param type - Tipo de seguro
 * @param phoneNumber - Número de WhatsApp (sin caracteres especiales)
 */
export const openWhatsappChat = (type: string, phoneNumber: string = "3424483534") => {
  const message = whatsappMessages[type] || whatsappMessages["General"];
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};
