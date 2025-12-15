export function About() {
  return (
    <section id="about" className="py-12 border-t">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">About Me</h2>

        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Junior DevOps / Cloud Engineer with hands-on experience in cloud infrastructure,
            containerization, and CI/CD pipelines.
          </p>

          <ul className="space-y-2 list-disc list-inside">
            <li><span className="font-medium text-foreground">Cloud Platforms:</span> AWS, GCP, Azure, Huawei Cloud</li>
            <li><span className="font-medium text-foreground">Containers & Orchestration:</span> Docker, Kubernetes, Argo CD</li>
            <li><span className="font-medium text-foreground">Infrastructure as Code:</span> Terraform, Ansible</li>
            <li><span className="font-medium text-foreground">CI/CD:</span> Jenkins, GitHub Actions</li>
            <li><span className="font-medium text-foreground">OS & Networking:</span> Linux, REST APIs</li>
          </ul>

          <p>
            Experience includes infrastructure automation, GitOps workflows,
            Kubernetes deployments, and cloud-based application delivery.
          </p>
        </div>
      </div>
    </section>
  )
}
