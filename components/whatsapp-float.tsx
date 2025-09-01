"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { MessageCircle, X, Phone, HelpCircle, ShoppingBag } from "lucide-react"
import { createWhatsAppUrl, WhatsAppMessages } from "@/lib/whatsapp"

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)

  const quickActions = [
    {
      icon: HelpCircle,
      label: "General Inquiry",
      message: WhatsAppMessages.generalInquiry(),
    },
    {
      icon: ShoppingBag,
      label: "Custom Order",
      message: WhatsAppMessages.customOrder(),
    },
    {
      icon: Phone,
      label: "Customer Support",
      message: WhatsAppMessages.customerSupport(),
    },
  ]

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <Card className="mb-4 w-80 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                WhatsApp Support
              </span>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground mb-3">How can we help you today?</p>
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-auto py-2 bg-transparent"
                asChild
              >
                <a href={createWhatsAppUrl(action.message)} target="_blank" rel="noopener noreferrer">
                  <action.icon className="h-4 w-4 mr-2" />
                  {action.label}
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
