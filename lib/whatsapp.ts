// WhatsApp integration utilities
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "01622839616"

export function createWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export const WhatsAppMessages = {
  orderConfirmation: (orderId: string) =>
    `🍞 Fresh Bakery Order Confirmation\n\nOrder ID: ${orderId}\n\nPlease send your advance payment (20-50% of total) transaction ID to confirm this order.\n\nThank you for choosing Fresh Bakery! 🥖`,

  customerSupport: (orderId?: string) =>
    orderId
      ? `Hi! I need help with my order.\n\nOrder ID: ${orderId}\n\nPlease assist me.`
      : "Hi! I need help with my bakery order. Please assist me.",

  generalInquiry: () =>
    "Hello! I'm interested in your fresh bakery products. Can you help me with information about your menu and ordering process?",

  orderStatus: (orderId: string) =>
    `Hi! I would like to check the status of my order.\n\nOrder ID: ${orderId}\n\nThank you!`,

  customOrder: () =>
    "Hello! I'm interested in placing a custom order for a special occasion. Can you help me with the details and pricing?",
}
