/**
 * @fileoverview Work Experience Data and Utilities
 *
 * This file contains the centralized work experience data for the portfolio.
 * It supports multiple roles per company for promotion tracking.
 *
 * ## RESPONSIBILITIES DISPLAY
 * Responsibilities are displayed as stacked rounded pill chips with:
 * - Muted gray background with hover effect
 * - Collapsible list (shows first 4 items, "Show X more" for the rest)
 * - Keep each responsibility concise (aim for under 60 characters)
 *
 * @example Adding a new company with single role:
 * ```typescript
 * {
 *   id: 4,
 *   company: "New Company Name",
 *   url: "https://newcompany.com",
 *   location: "City, Country",
 *   totalPeriod: "Jan 2024 – Present",
 *   roles: [
 *     {
 *       position: "Job Title",
 *       period: "Jan 2024 – Present",
 *       description: "Brief description of responsibilities",
 *       technologies: ["Tech1", "Tech2"],
 *       responsibilities: [
 *         "Designing and implementing CI/CD pipelines",
 *         "Managing Kubernetes clusters",
 *         "Automating infrastructure with Terraform",
 *         "Mentoring junior engineers"
 *       ]
 *     }
 *   ]
 * }
 * ```
 *
 * @example Adding a company with promotion (multiple roles):
 * ```typescript
 * {
 *   id: 5,
 *   company: "Promoted Company",
 *   url: "https://promoted.com",
 *   location: "City, Country",
 *   totalPeriod: "Jan 2023 – Present",
 *   roles: [
 *     // Most recent role FIRST
 *     {
 *       position: "Senior Developer",
 *       period: "Jan 2024 – Present",
 *       description: "Current senior role description",
 *       technologies: ["React", "Node.js"],
 *       responsibilities: [
 *         "Leading architecture decisions",
 *         "Mentoring junior developers",
 *         "Code review and quality assurance"
 *       ]
 *     },
 *     // Previous role SECOND
 *     {
 *       position: "Junior Developer",
 *       period: "Jan 2023 – Dec 2023",
 *       description: "Previous junior role description",
 *       technologies: ["JavaScript", "HTML"],
 *       responsibilities: [
 *         "Developing new features",
 *         "Bug fixes and maintenance",
 *         "Writing unit tests"
 *       ]
 *     }
 *   ]
 * }
 * ```
 *
 * @example How to add to the array:
 * 1. Add new entry at the TOP of the workExperience array (most recent first)
 * 2. Update IDs sequentially (highest ID first)
 * 3. For promotions, add roles in reverse chronological order (newest first)
 * 4. Set isTemplate: true only for example/template entries
 * 5. Keep responsibilities concise - they display as pill chips
 */

/**
 * @typedef {Object} WorkExperienceRole
 * @property {string} position - Job title/position name
 * @property {string} period - Time period for this specific role (e.g., "Mar 2024 – Present")
 * @property {string} description - Brief description of the role's responsibilities
 * @property {string[]} technologies - Array of technologies/tools used in this role
 * @property {string[]} responsibilities - Array of specific responsibilities/tasks (displayed as collapsible pill chips, first 4 shown by default)
 */

/**
 * @typedef {Object} WorkExperienceEntry
 * @property {number} id - Unique sequential ID (highest for most recent entries)
 * @property {string} company - Company name
 * @property {string} url - Company website URL
 * @property {string} location - Job location (e.g., "Cairo, Egypt")
 * @property {string} totalPeriod - Total time at company across all roles (e.g., "Jan 2023 – Present")
 * @property {WorkExperienceRole[]} roles - Array of roles at this company, ordered newest first
 * @property {boolean} [isTemplate] - Optional flag to mark template/example entries (hidden from display)
 */

/**
 * Array of work experience entries, each representing a company with roles.
 * For multiple roles at the same company (promotions), add them to the roles array.
 * The UI will automatically show the timeline dots connecting them.
 * @type {WorkExperienceEntry[]}
 */
export const workExperience = [
  // ============================================================
  // TEMPLATE ENTRY: Copy and modify this when adding a real job with promotions
  // INSTRUCTIONS FOR LLMs:
  // 1. Copy this entire object
  // 2. Change id to next sequential number (highest first)
  // 3. Update company, url, location, totalPeriod
  // 4. Modify roles array: keep newest role first, add previous roles below
  // 5. Remove isTemplate: true
  // 6. Add the new entry at the TOP of the workExperience array
  // ============================================================
  /**
   * @template Example work experience entry showing a promotion scenario.
   * This is a complete example of how to structure a company with multiple roles.
   * When using: Remove @template tag, update all fields, remove isTemplate property.
   * @example
   * // To use this template:
   * // 1. Copy the entire object
   * // 2. Update id, company, url, location, totalPeriod
   * // 3. Modify roles with real data (newest first)
   * // 4. Remove isTemplate: true
   * // 5. Place at top of workExperience array
   */
  {
    id: 1,
    company: "Example Tech Company",
    url: "https://example.com",
    location: "Cairo, Egypt",
    totalPeriod: "Jan 2023 – Present",  // Total time at company
    isTemplate: true, // Mark as template to hide from display
    roles: [
      // MOST RECENT ROLE FIRST - This shows the current/promoted position
      {
        position: "Senior DevOps Engineer",
        period: "Mar 2024 – Present",
        description: "Promoted to lead infrastructure initiatives and mentor junior team members.",
        technologies: ["AWS", "Kubernetes", "Terraform", "ArgoCD", "GitHub Actions", "Prometheus"],
        responsibilities: [
          "Lead the design and implementation of cloud-native architecture for microservices",
          "Mentor and guide junior engineers on DevOps best practices and tooling",
          "Architect CI/CD pipelines reducing deployment time by 60%",
          "Implement observability stack with Prometheus, Grafana, and alerting systems",
        ],
      },
      // PREVIOUS ROLE SECOND - This shows the role before promotion
      {
        position: "Junior DevOps Engineer",
        period: "Jan 2023 – Feb 2024",
        description: "Started as a junior engineer, focusing on automation and infrastructure management.",
        technologies: ["Docker", "Linux", "Jenkins", "Ansible", "AWS", "Python"],
        responsibilities: [
          "Automated deployment workflows using Jenkins and Ansible",
          "Managed and maintained Linux servers across multiple environments",
          "Containerized legacy applications using Docker",
          "Collaborated with development teams to improve CI/CD processes",
        ],
      },
    ],
  },
  // ============================================================
  // END TEMPLATE - Real entries below
  // ============================================================

  // REAL WORK EXPERIENCE ENTRIES
  // Add new companies at the TOP of this section (most recent first)
  // Update IDs sequentially starting from the highest number
  // For promotions: add multiple roles per company, newest role first

  {
    id: 2,
    company: "Digital Egypt Pioneers Initiative",
    url: "https://depi.gov.eg",
    location: "Cairo, Egypt",
    totalPeriod: "Jun 2025 – Dec 2025",
    roles: [
      {
        position: "DevOps Trainee",
        period: "Jun 2025 – Dec 2025",
        description: "Undergoing structured training in DevOps, cloud computing, and Linux administration.",
        technologies: ["Linux", "Kubernetes", "Terraform", "Ansible", "Docker", "Jenkins"],
        responsibilities: [
          "Designing and implementing CI/CD pipelines with Jenkins and GitHub Actions",
          "Managing Kubernetes clusters for container orchestration",
          "Automating infrastructure provisioning using Terraform",
          "Configuring and maintaining Linux servers",
          "Implementing monitoring solutions with Prometheus and Grafana",
          "Writing Ansible playbooks for configuration management",
          "Containerizing applications with Docker",
        ],
      },
    ],
  },
  {
    id: 3,
    company: "Ghaymah Cloud Solutions",
    url: "https://ghaymah.systems",
    location: "Remote, Saudi Arabia",
    totalPeriod: "Sep 2025 – Oct 2025",
    roles: [
      {
        position: "DevOps Intern",
        period: "Sep 2025 – Oct 2025",
        description: "Working on cloud automation, CI/CD pipelines, and infrastructure provisioning.",
        technologies: ["Docker", "CI/CD", "Cloud Automation", "API", "Cloud Deployment"],
        responsibilities: [
          "Building and maintaining CI/CD pipelines for automated deployments",
          "Containerizing applications using Docker",
          "Automating cloud infrastructure provisioning",
          "Integrating APIs for cloud service automation",
          "Deploying and managing cloud-based applications",
        ],
      },
    ],
  },
];

/**
 * Get the latest 2 roles from the most recent companies for main page display.
 * This function filters out template entries and returns simplified role objects.
 *
 * @function getLatestRolesForMainPage
 * @returns {Array<{position: string, company: string, url: string, period: string, location: string, description: string, technologies: string[]}>}
 * Array of simplified role objects for main page display, showing latest 2 real entries
 *
 * @example
 * const roles = getLatestRolesForMainPage();
 * // Returns: [{position: "DevOps Trainee", company: "DEPI", ...}, {position: "DevOps Intern", company: "Ghaymah", ...}]
 */
export function getLatestRolesForMainPage() {
  const realCompanies = workExperience.filter(company => !company.isTemplate); // Skip templates
  const latestCompanies = realCompanies.slice(0, 2); // Get first 2 real companies (most recent)
  return latestCompanies.map(company => {
    const latestRole = company.roles[0]; // First role is the most recent
    return {
      position: latestRole.position,
      company: company.company,
      url: company.url,
      period: latestRole.period,
      location: company.location,
      description: latestRole.description,
      technologies: latestRole.technologies,
    };
  });
}
