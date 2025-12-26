/**
 * @fileoverview Projects Data and Utilities
 *
 * This file contains the centralized projects data for the portfolio.
 * Projects are separated into personal and academic categories.
 *
 * ## FEATURES DISPLAY
 * Features are displayed as collapsible bullet points:
 * - First 4 items visible, rest hidden with "Show X more" button
 * - Keep each feature concise (under 60 characters ideal)
 *
 * @example Adding a new personal project:
 * ```typescript
 * {
 *   title: "Project Title",
 *   description: "Brief 1-2 sentence description",
 *   technologies: ["Tech1", "Tech2", "Tech3"],
 *   features: [
 *     "First key feature",
 *     "Second key feature",
 *     "Third key feature",
 *     "Fourth key feature",
 *   ],
 *   github: "https://github.com/username/repo",  // or null
 *   demo: "https://demo-url.com",                // or null
 *   duration: "2 weeks",                         // personal projects only
 * }
 * ```
 *
 * @example How to add to the arrays:
 * 1. Add new entry to personalProjects or academicProjects array
 * 2. Most significant projects should be listed first
 * 3. Personal projects include duration field, academic projects don't
 */

/**
 * @typedef {Object} Project
 * @property {string} title - Project title
 * @property {string} description - Brief description of the project
 * @property {string[]} technologies - Array of technologies used
 * @property {string[]} features - Array of key features (first 4 visible, rest collapsible)
 * @property {string|null} github - GitHub repository URL or null
 * @property {string|null} demo - Demo URL or null
 * @property {string} [duration] - Optional duration (for personal projects)
 */

/**
 * Personal/DevOps projects array
 * @type {Project[]}
 */
export const personalProjects = [
    {
        title: "3-Tier GitOps App on EKS",
        description:
            "A complete 3-tier notes application with GitOps CI/CD pipeline using GitHub Actions, Terraform, Ansible, Helm, and ArgoCD on AWS EKS",
        technologies: ["AWS EKS", "Terraform", "ArgoCD", "Helm", "Ansible", "GitHub Actions", "Docker", "Flask", "MySQL"],
        features: [
            "Complete GitOps workflow with 4 separate pipelines",
            "Infrastructure as Code with Terraform for EKS cluster provisioning",
            "ArgoCD for continuous deployment and GitOps monitoring",
            "3-tier architecture: Nginx reverse proxy, Flask API, MySQL database",
            "Prometheus metrics and health check endpoints",
        ],
        github: "https://github.com/maroayman/depi-notes-app-gitops",
        demo: null,
        duration: "3 weeks",
    },
    {
        title: "Highly Available AWS Infrastructure",
        description:
            "A highly available, scalable web application infrastructure on AWS with ALB, Auto Scaling Group, and secure multi-AZ network architecture",
        technologies: ["Terraform", "AWS", "ALB", "Auto Scaling", "VPC", "NAT Gateway", "S3"],
        features: [
            "Multi-AZ deployment across us-east-1a and us-east-1b",
            "Application Load Balancer with health checks",
            "Auto Scaling Group (1-3 instances) based on demand",
            "Secure bastion host for SSH access to private instances",
            "NAT Gateway for private subnet internet access",
        ],
        github: "https://github.com/maroayman/depi-project-5",
        demo: null,
        duration: "2 weeks",
    },
    {
        title: "Terraform EC2 Monitoring Stack",
        description:
            "A production-ready Terraform project that automates the deployment of secure EC2 instances on AWS with real-time monitoring",
        technologies: ["Terraform", "AWS EC2", "VPC", "Security Groups"],
        features: [
            "Automated EC2 instance provisioning with Terraform",
            "SSH key generation and secure access configuration",
            "Real-time monitoring dashboard for instance performance",
            "5-minute quick deployment with terraform apply",
        ],
        github: "https://github.com/maroayman/depi-project-4",
        demo: null,
        duration: "1 week",
    },
    {
        title: "Dockerized Flask Production Stack",
        description:
            "A complete end-to-end web application deployed on AWS EC2 with production-ready features and monitoring",
        technologies: ["Flask", "MySQL", "Docker", "AWS EC2", "Nginx", "Prometheus"],
        features: [
            "Flask-based notes app with full CRUD operations",
            "Nginx reverse proxy for production traffic",
            "MySQL database with SQLAlchemy ORM",
            "Multi-stage Docker builds for optimization",
            "Prometheus metrics endpoint for monitoring",
        ],
        github: "https://github.com/maroayman/depi-project-3",
        demo: null,
        duration: "2 weeks",
    },
    {
        title: "Ansible-Managed Go Web App",
        description: "A Go-based web application for note management with Ansible automation and scheduled tasks",
        technologies: ["Go", "SQLite", "Ansible", "Cron"],
        features: [
            "Built with Go for high performance",
            "SQLite database for lightweight storage",
            "Cron jobs for scheduled tasks",
            "Ansible automation for deployment",
        ],
        github: "https://github.com/maroayman/depi-project-2/",
        demo: null,
        duration: "1.5 weeks",
    },
    {
        title: "Flask App with Persistent AWS Storage",
        description: "A full-stack web application for note-taking deployed on AWS infrastructure with EBS backup",
        technologies: ["Python", "Flask", "MariaDB", "AWS EC2", "AWS EBS"],
        features: [
            "Deployed on AWS EC2 with scalable infrastructure",
            "Backup system using AWS EBS mounted volumes",
            "MariaDB database integration through SQLAlchemy ORM",
            "Full CRUD operations for note management",
        ],
        github: "https://github.com/maroayman/depi-project-1/",
        demo: null,
        duration: "1 week",
    },
];

/**
 * Academic projects array
 * @type {Project[]}
 */
export const academicProjects = [
    {
        title: "2D Platformer Game",
        description: "A 2D platformer game built with Unity and C#, featuring collaborative development and asset integration",
        technologies: ["Unity", "C#"],
        features: [
            "Built with Unity game engine and C# scripting",
            "Collaborative team development",
            "Integrated free licensed sounds and assets",
            "Game physics, player controls, and level design",
        ],
        github: "https://github.com/maroayman/unity-game",
        demo: null,
    },
    {
        title: "Football Analytics Dashboard",
        description: "Interactive data visualization dashboard built with Microsoft Power BI for football analytics",
        technologies: ["Power BI", "Excel", "Data Analysis"],
        features: [
            "Comprehensive data visualization from Kaggle dataset",
            "Team history including goals scored and conceded",
            "Interactive filters and drill-down capabilities",
        ],
        github: null,
        demo: null,
    },
    {
        title: "Linux File Link Utility",
        description: "A C-based terminal utility for creating and managing file links in Linux environments",
        technologies: ["C", "Linux"],
        features: [
            "Creation of symbolic and hard links",
            "Linux environment compatibility (Ubuntu)",
            "Proper error handling and user feedback",
        ],
        github: "https://github.com/maroayman/Operating-System-FCIH-College-Task-",
        demo: null,
    },
    {
        title: "File Encryption Tool",
        description: "A Python-based security application implementing encryption and decryption techniques",
        technologies: ["Python", "Cryptography"],
        features: [
            "Robust encryption using hashing algorithms",
            "Data integrity and protection",
            "User-friendly interface for file security",
        ],
        github: null,
        demo: null,
    },
    {
        title: "Learning Management System",
        description: "A Java-based LMS with role-based access control for educational institutions",
        technologies: ["Java", "OOP", "JDBC", "SQLite"],
        features: [
            "Teachers can log in and update student grades",
            "Students have read-only access to records",
            "Role-based access control for security",
        ],
        github: "https://github.com/maroayman/Learning-System",
        demo: null,
    },
    {
        title: "E-Commerce Platform",
        description: "Graduation project - A comprehensive e-commerce platform with YouTube integration for product recommendations",
        technologies: ["Angular", "ASP.NET", "SQL Server", "Bootstrap"],
        features: [
            "Full shopping functionality",
            "YouTube video recommendations for products",
            "Responsive UI with Bootstrap",
            "SQL Server database management",
        ],
        github: null,
        demo: null,
    },
];

/**
 * Get all projects (personal + academic)
 * @returns {{ personal: Project[], academic: Project[] }}
 */
export function getProjects() {
    return {
        personal: personalProjects,
        academic: academicProjects,
    };
}

/**
 * Get total projects count
 * @returns {number}
 */
export function getProjectsCount() {
    return personalProjects.length + academicProjects.length;
}
