import Link from "next/link"
import { NavigationSidebar } from "@/components/navigation-sidebar"

const workExperience = [
  {
    id: 1,
    position: "DevOps Trainee",
    company: "Digital Egypt Pioneers Initiative",
    url: "https://depi.gov.eg",
    period: "Jun 2025 – Dec 2025",
    location: "Cairo, Egypt",
    description: "Undergoing structured training in DevOps, cloud computing, and Linux administration.",
    technologies: ["Linux", "Kubernetes", "Terraform", "Ansible", "Docker", "Jenkins"],
  },
  {
    id: 2,
    position: "DevOps Intern",
    company: "Ghaymah Cloud Solutions",
    url: "https://ghaymah.systems",
    period: "Sep 2025 – Oct 2025",
    location: "Remote, Saudi Arabia",
    description: "Working on cloud automation, CI/CD pipelines, and infrastructure provisioning.",
    technologies: ["Docker", "CI/CD", "Cloud Automation", "API", "Cloud Deployment"],
  },
]

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />

      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Experience</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            My professional journey in DevOps and cloud engineering.
          </p>

          <div className="space-y-10">
            {workExperience.map((job) => (
              <article key={job.id}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <h2 className="font-semibold text-lg">{job.position}</h2>
                  <span className="text-sm text-muted-foreground">{job.period}</span>
                </div>
                <p className="text-muted-foreground mb-3">
                  <Link href={job.url} target="_blank" className="hover:underline">
                    {job.company}
                  </Link>
                  {" · "}{job.location}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {job.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
