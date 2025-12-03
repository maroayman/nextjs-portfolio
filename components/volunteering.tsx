import Link from "next/link"

export function Volunteering() {
  return (
    <section id="volunteering" className="py-12 border-t">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 className="text-2xl font-bold mb-8">Volunteering</h2>
        
        <div>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
            <h3 className="font-semibold">Group Leader Volunteer</h3>
            <span className="text-sm text-muted-foreground">Jun 2025 – Dec 2025</span>
          </div>
          <p className="text-muted-foreground mb-3">
            <Link href="https://depi.gov.eg" target="_blank" className="hover:underline">
              Digital Egypt Pioneers Initiative
            </Link>
            {" · "}Cairo, Egypt
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
            <li>• Guided and supported a peer group of 20 DEPI participants, fostering a collaborative learning environment</li>
            <li>• Established and maintained a Google Drive repository, enhancing accessibility of external resources</li>
            <li>• Coordinated online and in-person study sessions to reinforce core Cloud and DevOps concepts</li>
            <li>• Mentored junior participants, helping them overcome project and technical challenges</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
