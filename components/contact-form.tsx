"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Check } from "lucide-react"
import { toast } from 'react-toastify'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const response = await fetch('https://formspree.io/f/mqaqqnpq', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    })

    if (response.ok) {
      setIsSubmitting(false)
      setIsSubmitted(true)
      form.reset()
      toast.success("Your message has been sent successfully!")

      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } else {
      setIsSubmitting(false)
      toast.error("Something went wrong. Please try again later.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input id="name" name="name" placeholder="Your name" required disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <Input id="subject" name="subject" placeholder="How can we help you?" required disabled={isSubmitting} />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project..."
          rows={6}
          required
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting || isSubmitted}>
        {isSubmitting ? (
          <>
            Sending... <Send className="ml-2 h-4 w-4 animate-pulse" />
          </>
        ) : isSubmitted ? (
          <>
            Message Sent <Check className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Send Message <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      {isSubmitted && (
        <div className="bg-green-500/10 text-green-500 p-3 rounded-md text-center">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}
    </form>
  )
}
