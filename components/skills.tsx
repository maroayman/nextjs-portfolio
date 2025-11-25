"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const CodeIcon = () => (
  <svg
    className="h-5 w-5 text-primary"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const DevOpsIcon = () => (
  <svg
    className="h-5 w-5 text-primary"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const ServerIcon = () => (
  <svg
    className="h-5 w-5 text-primary"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
)

const ChartIcon = () => (
  <svg
    className="h-5 w-5 text-primary"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const CloudIcon = () => (
  <svg
    className="h-5 w-5 text-primary"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
)

const DatabaseIcon = () => (
  <svg
    className="h-5 w-5 text-primary"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
)

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["C", "Python", "Java", "Go"],
    icon: CodeIcon,
  },
  {
    title: "DevOps",
    skills: ["Docker", "Kubernetes", "Ansible", "Terraform"],
    icon: DevOpsIcon,
  },
  {
    title: "Operating Systems",
    skills: ["Windows", "Linux"],
    icon: ServerIcon,
  },
  {
    title: "Data Analysis",
    skills: ["PowerBI", "Excel"],
    icon: ChartIcon,
  },
  {
    title: "Cloud Platforms",
    skills: ["Huawei Cloud", "Amazon Web Services", "Microsoft Azure", "Google Cloud Platform"],
    icon: CloudIcon,
  },
  {
    title: "Databases",
    skills: ["SQL Server", "MySQL", "MariaDB", "SQLite"],
    icon: DatabaseIcon,
  },
]

export function Skills() {
  const [openCategories, setOpenCategories] = useState<{ [key: number]: boolean }>({})

  const toggleCategory = (index: number) => {
    setOpenCategories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <section id="skills" className="py-12 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-primary">
            Technical Skills
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                  <Collapsible open={openCategories[index]} onOpenChange={() => toggleCategory(index)}>
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="flex flex-row items-center justify-between py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center gap-2">
                          <IconComponent />
                          <CardTitle className="text-xs sm:text-base lg:text-lg text-left leading-tight">
                            {category.title}
                          </CardTitle>
                        </div>
                        <ChevronDown
                          className={`h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 ml-1 transition-transform ${openCategories[index] ? "rotate-180" : ""}`}
                        />
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0 px-3 sm:px-6 pb-3 sm:pb-4">
                        <div className="text-[10px] sm:text-sm text-muted-foreground">
                          {category.skills.join(" • ")}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
