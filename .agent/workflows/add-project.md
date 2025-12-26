---
description: How to add a new project entry to the portfolio
---

# Adding Projects

## File Location
`lib/projects.ts`

## Steps

1. Open `lib/projects.ts`

2. Add new entry to either `personalProjects` or `academicProjects` array

3. Use the following structure:
```typescript
{
  title: "Project Title",
  description: "Brief 1-2 sentence description of the project",
  technologies: ["Tech1", "Tech2", "Tech3"],
  features: [
    "First key feature",
    "Second key feature",
    "Third key feature",
    "Fourth key feature",
    // First 4 items visible, rest collapsed with "Show X more"
  ],
  github: "https://github.com/username/repo", // or null
  demo: "https://demo-url.com", // or null
  duration: "2 weeks", // optional, for personal projects only
},
```

## Features Display
- Displayed as **simple bullet points** with primary-colored dots
- **Collapsible**: First 4 items visible, "Show X more" button reveals the rest
- Keep items concise and descriptive
- Component: `FeaturesList` in `app/projects/page.tsx`

## Project Types
- **Personal Projects**: Include `duration` field
- **Academic Projects**: No `duration` field needed

## Important Notes
- `github` and `demo` can be `null` if not available
- Most significant projects should be listed first
- Data file: `lib/projects.ts`
- Page component: `app/projects/page.tsx`
