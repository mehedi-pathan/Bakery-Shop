import { Button } from "./ui/button"
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react"
import { createWhatsAppUrl, WhatsAppMessages } from "@/lib/whatsapp"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-muted/50 via-muted/30 to-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">01622839616</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">hello@freshbakery.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">123 Bakery Street, Food City</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-medium">6:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium">7:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium">8:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">Get instant support and place orders via WhatsApp</p>
            <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
              <a href={createWhatsAppUrl(WhatsAppMessages.customerSupport())} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Support
              </a>
            </Button>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Fresh Bakery Shop. All rights reserved. Made with love for fresh food lovers.
          </p>
          <p className="text-xs text-muted-foreground">
            Developed by{" "}
            <a
              href="https://mehedipathan.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Mehedi Pathan
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
