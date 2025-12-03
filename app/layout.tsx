import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

const siteUrl = "https://maroayman.vercel.app" // Update this to your actual domain

export const metadata: Metadata = {
  title: {
    default: "Marwan Ayman - DevOps & Cloud Engineer",
    template: "%s | Marwan Ayman",
  },
  description:
    "Portfolio of Marwan Ayman, a DevOps & Cloud Engineer passionate about building scalable infrastructure, automating deployments, and optimizing system performance. Expert in Kubernetes, Docker, Terraform, AWS, and CI/CD pipelines.",
  keywords: [
    "DevOps Engineer",
    "Cloud Engineer",
    "Marwan Ayman",
    "Kubernetes",
    "Docker",
    "Terraform",
    "AWS",
    "GCP",
    "CI/CD",
    "Infrastructure as Code",
    "Automation",
    "Linux",
    "Jenkins",
    "Ansible",
    "Portfolio",
  ],
  authors: [{ name: "Marwan Ayman Shawky", url: siteUrl }],
  creator: "Marwan Ayman Shawky",
  publisher: "Marwan Ayman Shawky",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Marwan Ayman - DevOps & Cloud Engineer",
    title: "Marwan Ayman - DevOps & Cloud Engineer",
    description:
      "DevOps & Cloud Engineer passionate about building scalable infrastructure, automating deployments, and optimizing system performance.",
    images: [
      {
        url: "/og-image.png", // Create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "Marwan Ayman - DevOps & Cloud Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marwan Ayman - DevOps & Cloud Engineer",
    description:
      "DevOps & Cloud Engineer passionate about building scalable infrastructure and automating deployments.",
    images: ["/og-image.png"],
    // creator: "@yourtwitter", // Add your Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // Add if you have Google Search Console
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={jetbrainsMono.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
