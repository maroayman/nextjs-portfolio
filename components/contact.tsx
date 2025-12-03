"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { HashnodeIcon } from "@/components/icons/hashnode-icon"

const GitLabIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
  </svg>
)

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    
    // Simulate sending - integrate with Formspree or similar later
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus("sent")
    setFormData({ name: "", email: "", message: "" })
    
    setTimeout(() => setStatus("idle"), 3000)
  }

  return (
    <section id="contact" className="py-12 border-t">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          I'm always open to discussing new opportunities, interesting projects, or just having a 
          conversation about DevOps and cloud technologies.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <Link href="mailto:marwanayman.shawky@gmail.com" className="hover:text-foreground transition-colors">
                marwanayman.shawky@gmail.com
              </Link>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>+201122889126</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Cairo, Egypt</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Link 
              href="https://github.com/maroayman"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link 
              href="https://gitlab.com/maroayman"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GitLabIcon className="h-5 w-5" />
            </Link>
            <Link 
              href="https://linkedin.com/in/maroayman"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link 
              href="https://hashnode.com/@maroayman"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <HashnodeIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-4 py-2 bg-foreground text-background text-sm rounded-md hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  )
}
