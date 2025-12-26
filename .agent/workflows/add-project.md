---
description: How to add a new project entry to the portfolio
---

# Adding Projects

## File Location
`app/projects/page.tsx`

## Steps

1. Open `app/projects/page.tsx`

2. Add new entry to either `personalProjects` or `academicProjects` array

3. Use the following structure:
```typescript
{
  title: "Project Title",
  description: "Brief 1-2 sentence description of the project",
  technologies: ["Tech1", "Tech2", "Tech3"],
  features: [
    "First key feature (keep concise)",
    "Second key feature",
    "Third key feature",
    "Fourth key feature",
    // Add more as needed - UI shows first 4 with "Show X more" button
  ],
  github: "https://github.com/username/repo", // or null
  demo: "https://demo-url.com", // or null
  duration: "2 weeks", // optional, for personal projects
},
```

## Features Display
- Displayed as **stacked rounded pill chips** with muted gray background
- **Collapsible**: Shows first 4 items, then "Show X more" button
- Keep each item **concise** (under 60 characters ideal)
- Start with descriptive phrases: "Built with...", "Automated...", "Full CRUD..."

## Project Types
- **Personal Projects**: Include `duration` field
- **Academic Projects**: No `duration` field needed

## Important Notes
- `github` and `demo` can be `null` if not available
- Most significant projects should be listed first
- Projects page component: `app/projects/page.tsx`
