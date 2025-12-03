export function Education() {
  return (
    <section id="education" className="py-12 border-t">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 className="text-2xl font-bold mb-8">Education</h2>
        
        <div>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
            <h3 className="font-semibold">Helwan University</h3>
            <span className="text-sm text-muted-foreground">Sep 2018 – Jan 2023</span>
          </div>
          <p className="text-muted-foreground mb-2">Bachelor's Degree</p>
          <p className="text-sm text-muted-foreground">
            Major: Information Systems · Minor: Computer Science
          </p>
        </div>
      </div>
    </section>
  )
}
