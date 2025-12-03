export function Footer() {
  return (
    <footer className="py-12 border-t">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Marwan Ayman Shawky. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
