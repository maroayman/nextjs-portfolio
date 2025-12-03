export function About() {
  return (
    <section id="about" className="py-12 border-t">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">About Me</h2>
        
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I'm a driven and technically adept Computer Science graduate (2023) with a passion for optimizing 
            software delivery. My core development skills in C, Python, and Java, coupled with database management 
            expertise (MySQL, SQL Server, Power BI), provide a solid foundation for DevOps and software development.
          </p>
          
          <p>
            I'm particularly keen to learn and apply DevOps methodologies to enhance system reliability, 
            automate processes, and contribute to efficient software lifecycles. Currently expanding my skills 
            through the Digital Egypt Pioneers Initiative.
          </p>
          
          <div className="pt-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">Core Focus Areas</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-medium text-foreground">Automation:</span>{" "}
                Streamlining processes through CI/CD pipelines and infrastructure automation
              </li>
              <li>
                <span className="font-medium text-foreground">Reliability:</span>{" "}
                Ensuring system stability, monitoring, and maintaining high availability
              </li>
              <li>
                <span className="font-medium text-foreground">Optimization:</span>{" "}
                Improving deployment speed, resource efficiency, and system performance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
