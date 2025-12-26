---
description: How to add a new work experience entry to the portfolio
---

# Adding Work Experience

## File Location
`lib/work-experience.ts`

## Steps

1. Open `lib/work-experience.ts`

2. Add new entry at the **TOP** of the `workExperience` array (after the template entry)

3. Use the following structure:
```typescript
{
  id: [next sequential number],
  company: "Company Name",
  url: "https://company-website.com",
  location: "City, Country",
  totalPeriod: "Start – End",
  roles: [
    {
      position: "Job Title",
      period: "Start – End",
      description: "Brief 1-2 sentence description of the role",
      technologies: ["Tech1", "Tech2", "Tech3"],
      responsibilities: [
        "First key responsibility (keep under 60 chars)",
        "Second key responsibility",
        "Third key responsibility",
        "Fourth key responsibility",
        // Add more as needed - UI shows first 4 with "Show X more" button
      ],
    },
  ],
},
```

## Responsibilities Display
- Displayed as **stacked rounded pill chips** with muted gray background
- **Collapsible**: Shows first 4 items, then "Show X more" button
- Keep each item **concise** (under 60 characters ideal)
- Start with action verbs: "Designing...", "Managing...", "Implementing..."

## For Promotions (Multiple Roles)
Add multiple objects to the `roles` array, **newest role first**:
```typescript
roles: [
  { position: "Senior Engineer", period: "2024 – Present", ... },
  { position: "Junior Engineer", period: "2023 – 2024", ... },
],
```

## Important Notes
- IDs should be sequential (highest = most recent)
- Most recent company goes at TOP of array
- Template entry has `isTemplate: true` - don't modify it
- Experience page: `app/experience/page.tsx`
