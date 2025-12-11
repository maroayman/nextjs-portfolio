import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getLatestRolesForMainPage } from "@/lib/work-experience"

/**
 * Professional Development section component for the main page.
 * Displays only the latest 2 roles from the most recent companies for brevity.
 * Full experience details are available on the dedicated /experience page.
 * @returns {JSX.Element} The rendered section
 */
export function ProfessionalDevelopment() {
  const latestRoles = getLatestRolesForMainPage();
  return (
    <section id="experience" className="py-12 border-t">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <Link
            href="/experience"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-8">
          {latestRoles.map((job, index) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <h3 className="font-semibold">{job.position}</h3>
                <span className="text-sm text-muted-foreground">{job.period}</span>
              </div>
              <p className="text-muted-foreground mb-2">
                <Link href={job.url} target="_blank" className="hover:underline">
                  {job.company}
                </Link>
                {" · "}{job.location}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {job.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {job.technologies.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
