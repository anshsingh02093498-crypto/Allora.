import { Project, Employee, DataSource, ExtractedUpdate, HistoricalProjectTeam, RiskAnalysis, RescueOption } from '../types';

export const LOGO_SRC = "data:image/png;base64,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";

// Portfolio Level Aggregates (SIH 103: 100 Total Projects, 72 On Track, 18 At Risk, 10 Delayed)
export const PORTFOLIO_STATS = {
  totalProjects: 100,
  onTrack: 72,
  atRisk: 18,
  delayed: 10,
  averageVelocity: 88, // %
  budgetAllocated: 84500000, // ₹8.45 Cr
  budgetConsumed: 53200000, // ₹5.32 Cr
  activeEmployees: 342,
  flaggedAlertsCount: 7,
};

export const EMPLOYEES: Employee[] = [
  {
    id: "EMP-01",
    name: "Rahul Sharma",
    role: "Lead Backend Developer",
    department: "Platform Engineering",
    skills: ["Python", "FastAPI", "PostgreSQL", "Payment APIs", "Stripe", "Redis"],
    experienceYears: 6,
    pastProjectsCount: 8,
    pastProjectNames: ["E-Commerce Platform v1", "FinPay Core", "B2B Billing Hub"],
    availability: "LOW",
    workload: 135, // Overloaded
    monthlyCost: 95000,
    currentProject: "E-Commerce Platform",
    avatarBg: "from-blue-600 to-indigo-700"
  },
  {
    id: "EMP-02",
    name: "Aman Verma",
    role: "Senior Backend Developer",
    department: "Payments & Integration",
    skills: ["Python", "Django", "Microservices", "Payment Gateway", "Kafka", "SQL"],
    experienceYears: 5,
    pastProjectsCount: 6,
    pastProjectNames: ["Payment Gateway v2", "NeoBank API", "Subscription Engine"],
    availability: "MEDIUM",
    workload: 122, // Overloaded
    monthlyCost: 85000,
    currentProject: "E-Commerce Platform",
    avatarBg: "from-amber-600 to-orange-700"
  },
  {
    id: "EMP-03",
    name: "Priya Nair",
    role: "Senior UI/UX Designer",
    department: "Design Systems",
    skills: ["Figma", "Design Systems", "User Research", "Tailwind UI", "Prototyping"],
    experienceYears: 4,
    pastProjectsCount: 7,
    pastProjectNames: ["E-Commerce Mobile UX", "Hospital Portal", "Customer App"],
    availability: "HIGH",
    workload: 92,
    monthlyCost: 75000,
    currentProject: "E-Commerce Platform",
    avatarBg: "from-emerald-600 to-teal-700"
  },
  {
    id: "EMP-04",
    name: "Sana Sheikh",
    role: "Fullstack Developer",
    department: "Web Applications",
    skills: ["Python", "Flask", "React", "TypeScript", "REST APIs", "PostgreSQL"],
    experienceYears: 4,
    pastProjectsCount: 5,
    pastProjectNames: ["E-Commerce Admin", "Learning Management Portal", "Staff Directory"],
    availability: "HIGH",
    workload: 78,
    monthlyCost: 70000,
    currentProject: "Learning Management System",
    avatarBg: "from-purple-600 to-indigo-800"
  },
  {
    id: "EMP-05",
    name: "Vikram Malhotra",
    role: "Senior QA Automation Engineer",
    department: "Quality Assurance",
    skills: ["Cypress", "Selenium", "API Testing", "Load Testing", "Postman", "Jest"],
    experienceYears: 5,
    pastProjectsCount: 9,
    pastProjectNames: ["FinTech Core QA", "E-Commerce Regression", "Auth Security Audit"],
    availability: "HIGH",
    workload: 70,
    monthlyCost: 65000,
    currentProject: "Hospital Management System",
    avatarBg: "from-cyan-600 to-blue-700"
  },
  {
    id: "EMP-06",
    name: "Neha Joshi",
    role: "Security & Backend Specialist",
    department: "Security & Cloud",
    skills: ["Python", "OAuth 2.0", "Biometric Auth", "AWS", "Docker", "Kubernetes"],
    experienceYears: 6,
    pastProjectsCount: 7,
    pastProjectNames: ["Mobile Banking App", "SSO Enterprise Hub", "Identity Vault"],
    availability: "HIGH",
    workload: 85,
    monthlyCost: 90000,
    currentProject: "Mobile Banking App",
    avatarBg: "from-pink-600 to-rose-700"
  },
  {
    id: "EMP-07",
    name: "Karan Singhania",
    role: "QA & Integration Tester",
    department: "Quality Assurance",
    skills: ["Manual Testing", "TestRail", "Mobile Testing", "Postman", "Security Tests"],
    experienceYears: 3,
    pastProjectsCount: 4,
    pastProjectNames: ["Mobile Banking UPI", "Logistics API QA"],
    availability: "HIGH",
    workload: 60,
    monthlyCost: 50000,
    currentProject: "Mobile Banking App",
    avatarBg: "from-teal-600 to-emerald-700"
  },
  {
    id: "EMP-08",
    name: "Divya Pillai",
    role: "Frontend Engineer",
    department: "Web Applications",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "GraphQL"],
    experienceYears: 4,
    pastProjectsCount: 6,
    pastProjectNames: ["HR Onboarding Flow", "Analytics Dashboard v1", "Admin Portal"],
    availability: "MEDIUM",
    workload: 75,
    monthlyCost: 68000,
    currentProject: "HR Onboarding Portal",
    avatarBg: "from-violet-600 to-purple-800"
  },
  {
    id: "EMP-09",
    name: "Rohan Kulkarni",
    role: "Backend & Systems Engineer",
    department: "Platform Engineering",
    skills: ["Python", "FastAPI", "Go", "Distributed Systems", "PostgreSQL", "Redis"],
    experienceYears: 7,
    pastProjectsCount: 11,
    pastProjectNames: ["High-Throughput Orders", "E-Commerce Checkout", "Inventory Sync"],
    availability: "HIGH",
    workload: 65,
    monthlyCost: 105000,
    currentProject: "Logistics API",
    avatarBg: "from-slate-700 to-slate-900"
  },
  {
    id: "EMP-10",
    name: "Ananya Roy",
    role: "Automation Test Engineer",
    department: "Quality Assurance",
    skills: ["Playwright", "PyTest", "API Mocking", "Performance Benchmarking"],
    experienceYears: 4,
    pastProjectsCount: 5,
    pastProjectNames: ["Payment Gateway QA", "FinTech Settlement Tests"],
    availability: "HIGH",
    workload: 55,
    monthlyCost: 60000,
    currentProject: "Payment Gateway Integration",
    avatarBg: "from-emerald-700 to-teal-800"
  },
  {
    id: "EMP-11",
    name: "Kabir Mehta",
    role: "DevOps & Cloud Engineer",
    department: "Infrastructure",
    skills: ["Kubernetes", "Terraform", "CI/CD", "AWS", "Prometheus", "GCP"],
    experienceYears: 5,
    pastProjectsCount: 9,
    pastProjectNames: ["E-Commerce Cloud Deploy", "Banking Infra", "IoT Cluster"],
    availability: "MEDIUM",
    workload: 80,
    monthlyCost: 92000,
    currentProject: "IoT Fleet Monitor",
    avatarBg: "from-amber-700 to-red-800"
  },
  {
    id: "EMP-12",
    name: "Meera Sen",
    role: "AI / NLP Engineer",
    department: "Data & AI",
    skills: ["Python", "LangChain", "Gemini API", "HuggingFace", "Vector DBs"],
    experienceYears: 4,
    pastProjectsCount: 4,
    pastProjectNames: ["Customer Chatbot v1", "Ticket Summarizer", "Auto-Categorizer"],
    availability: "HIGH",
    workload: 72,
    monthlyCost: 88000,
    currentProject: "Customer Support Chatbot",
    avatarBg: "from-cyan-700 to-indigo-900"
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: "E-Commerce Platform",
    manager: "Arjun Sharma",
    progress: 68,
    expectedProgress: 82,
    deadline: "2026-10-15",
    startDate: "2026-07-01",
    budget: 1000000,
    budgetUsed: 640000,
    team: 8,
    status: "AT RISK",
    priority: "Critical",
    category: "E-Commerce",
    description: "Enterprise multi-vendor shopping platform featuring unified payments, catalog indexing, inventory synchronization and admin console.",
    lastUpdateSource: "WhatsApp Team Group",
    lastUpdateText: "Payment API is still not done, probably need 2 more days. Testing blocked on checkout flow.",
    tasks: [
      {
        id: "T-101",
        name: "UI Design & Catalog Component Library",
        assignee: "Priya Nair",
        assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces",
        status: "Deployed",
        blocked: false,
        role: "UI/UX",
        startDate: "2026-07-01",
        dueDate: "2026-07-16",
        duration: "15d",
        effortHours: 85,
        timeSpentHours: 80,
        subtasks: [
          { id: "ST-101-1", name: "Photos and high-res vector assets", assignee: "Priya Nair", status: "Deployed", duration: "4d" },
          { id: "ST-101-2", name: "GIFs and responsive animation micro-interactions", assignee: "Priya Nair", status: "Deployed", duration: "3d" },
          { id: "ST-101-3", name: "Checkout typography & color contrast audit", assignee: "Priya Nair", status: "Deployed", duration: "2d" }
        ],
        comments: [
          { id: "c1", author: "Priya Nair", text: "All Figma component tokens exported and merged into main repository.", timestamp: "Jul 15" }
        ]
      },
      {
        id: "T-102",
        name: "Backend Product Catalog & Cart Microservice",
        assignee: "Rahul Sharma",
        assigneeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
        status: "In development",
        blocked: false,
        role: "Developer",
        startDate: "2026-07-12",
        dueDate: "2026-08-28",
        duration: "45d",
        effortHours: 160,
        timeSpentHours: 135,
        subtasks: [
          { id: "ST-102-1", name: "Redis caching layer for product indexing", assignee: "Rahul Sharma", status: "Deployed", duration: "10d" },
          { id: "ST-102-2", name: "PostgreSQL inventory concurrency locks", assignee: "Rahul Sharma", status: "In development", duration: "14d" },
          { id: "ST-102-3", name: "GraphQL query batching for mobile app", assignee: "Rahul Sharma", status: "New", duration: "8d" }
        ],
        comments: [
          { id: "c2", author: "Rahul Sharma", text: "Database indexing benchmark passed 12,000 queries/sec.", timestamp: "Aug 20" }
        ]
      },
      {
        id: "T-103",
        name: "Payment Gateway Integration & Webhooks",
        assignee: "Aman Verma",
        assigneeAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
        status: "Review required",
        blocked: true,
        role: "Developer",
        startDate: "2026-08-15",
        dueDate: "2026-09-22",
        duration: "38d",
        effortHours: 120,
        timeSpentHours: 95,
        subtasks: [
          { id: "ST-103-1", name: "Stripe & Razorpay webhook listener endpoints", assignee: "Aman Verma", status: "Review required", duration: "12d" },
          { id: "ST-103-2", name: "UPI 2.0 dynamic QR code generation", assignee: "Aman Verma", status: "In development", duration: "10d" },
          { id: "ST-103-3", name: "Refund & chargeback idempotent retry logic", assignee: "Aman Verma", status: "New", duration: "9d" }
        ],
        comments: [
          { id: "c3", author: "Aman Verma", text: "Waiting on sandbox merchant secret keys from third-party vendor. Blocked for 48h.", timestamp: "Yesterday" }
        ]
      },
      {
        id: "T-104",
        name: "End-to-End Regression & Load Testing",
        assignee: "Karan Singhania",
        assigneeAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=faces",
        status: "New",
        blocked: true,
        role: "Tester",
        startDate: "2026-09-20",
        dueDate: "2026-10-08",
        duration: "18d",
        effortHours: 90,
        timeSpentHours: 12,
        subtasks: [
          { id: "ST-104-1", name: "Playwright automated checkout test suite", assignee: "Karan Singhania", status: "New", duration: "6d" },
          { id: "ST-104-2", name: "Locust 50,000 concurrent user load test", assignee: "Karan Singhania", status: "New", duration: "7d" }
        ]
      },
      {
        id: "T-105",
        name: "Production Cloud Deployment & SSL",
        assignee: "Kabir Mehta",
        assigneeAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces",
        status: "New",
        blocked: false,
        role: "DevOps",
        startDate: "2026-10-05",
        dueDate: "2026-10-15",
        duration: "10d",
        effortHours: 50,
        timeSpentHours: 0,
        subtasks: [
          { id: "ST-105-1", name: "Kubernetes pod autoscaling policy", assignee: "Kabir Mehta", status: "New", duration: "4d" },
          { id: "ST-105-2", name: "Cloudflare edge caching & DDoS rules", assignee: "Kabir Mehta", status: "New", duration: "3d" }
        ]
      },
    ],
    milestones: [
      { name: "UI/UX Wireframes & Component Specs", progress: 100, status: "Completed" },
      { name: "Backend Architecture & Core APIs", progress: 80, status: "In Progress" },
      { name: "Payment & Webhook Integration", progress: 40, status: "In Progress" },
      { name: "Security Testing & QA Certification", progress: 0, status: "Not Started" },
      { name: "Final Go-Live & Load Ramp-up", progress: 0, status: "Not Started" },
    ],
    resourceGaps: [
      { role: "Developer", required: 4, available: 3 },
      { role: "Tester", required: 3, available: 1 },
      { role: "UI Designer", required: 2, available: 2 },
    ]
  },
  {
    id: 2,
    name: "Mobile Banking App",
    manager: "Arjun Sharma",
    progress: 84,
    expectedProgress: 80,
    deadline: "2026-09-28",
    startDate: "2026-06-15",
    budget: 1500000,
    budgetUsed: 920000,
    team: 10,
    status: "ON TRACK",
    priority: "High",
    category: "FinTech",
    description: "Next-gen retail banking app with zero-knowledge biometric login, instant UPI transactions, and RBI-compliant audit vaults.",
    lastUpdateSource: "Jira Enterprise",
    lastUpdateText: "Security penetration audit completed with zero high vulnerabilities. Production readiness on schedule.",
    tasks: [
      { id: "T-201", name: "Biometric Auth & Token Vault", assignee: "Neha Joshi", status: "Completed", blocked: false, role: "Developer" },
      { id: "T-202", name: "UPI 2.0 Settlement & QR Scanner", assignee: "Karan Singhania", status: "In Progress", blocked: false, role: "Tester" },
      { id: "T-203", name: "Account Statement PDF Generator", assignee: "Neha Joshi", status: "Completed", blocked: false, role: "Developer" },
    ],
    milestones: [
      { name: "Core Banking API Adapters", progress: 95, status: "In Progress" },
      { name: "Security & Compliance Certification", progress: 85, status: "In Progress" },
      { name: "App Store & Play Store Staging", progress: 70, status: "In Progress" },
    ],
    resourceGaps: [
      { role: "Developer", required: 5, available: 5 },
      { role: "Tester", required: 3, available: 3 },
    ]
  },
  {
    id: 3,
    name: "Hospital Management System",
    manager: "Elena Rostova",
    progress: 42,
    expectedProgress: 65,
    deadline: "2026-11-20",
    startDate: "2026-07-10",
    budget: 850000,
    budgetUsed: 440000,
    team: 6,
    status: "AT RISK",
    priority: "Critical",
    category: "Healthcare",
    description: "Centralized EHR patient records, pharmacy dispatch, bed management, and medical insurance claim processing module.",
    lastUpdateSource: "Outlook Email",
    lastUpdateText: "Doctor appointment calendar sync is blocked. Insurance verification API vendor is delaying response.",
    tasks: [
      { id: "T-301", name: "Patient EHR Record Encryption", assignee: "Sana Sheikh", status: "In Progress", blocked: false, role: "Developer" },
      { id: "T-302", name: "Insurance Billing & Claim Processing", assignee: "Vikram Malhotra", status: "Not Started", blocked: true, role: "Tester" },
      { id: "T-303", name: "Doctor Scheduling Calendar Sync", assignee: "Unassigned", status: "Not Started", blocked: true, role: "Developer" },
    ],
    milestones: [
      { name: "HIPAA Compliant EHR Architecture", progress: 60, status: "In Progress" },
      { name: "Billing & Insurance Gateway", progress: 15, status: "Not Started" },
      { name: "Pharmacy & Ward Inventory Flow", progress: 20, status: "Not Started" },
    ],
    resourceGaps: [
      { role: "Developer", required: 4, available: 2 },
      { role: "Tester", required: 2, available: 1 },
    ]
  },
  {
    id: 4,
    name: "Inventory Tracker",
    manager: "Sarah Jenkins",
    progress: 92,
    expectedProgress: 88,
    deadline: "2026-09-20",
    startDate: "2026-07-01",
    budget: 400000,
    budgetUsed: 260000,
    team: 4,
    status: "ON TRACK",
    priority: "Standard",
    category: "Logistics",
    description: "Automated barcode scanning, RFID inventory verification, and multi-warehouse stock replenishment engine.",
    tasks: [],
    milestones: [
      { name: "RFID Handheld Sync", progress: 100, status: "Completed" },
      { name: "ERP Database Integration", progress: 90, status: "In Progress" },
    ],
    resourceGaps: [{ role: "Developer", required: 2, available: 2 }]
  },
  {
    id: 5,
    name: "HR Onboarding Portal",
    manager: "Elena Rostova",
    progress: 28,
    expectedProgress: 58,
    deadline: "2026-12-05",
    startDate: "2026-08-01",
    budget: 350000,
    budgetUsed: 195000,
    team: 5,
    status: "DELAYED",
    priority: "High",
    category: "Enterprise",
    description: "Employee document digitization, background check verification flow, IT asset provisioning and training roadmap tracker.",
    lastUpdateSource: "Slack Project Channel",
    lastUpdateText: "Background verification integration failing KYC checks. Developer assigned got reassigned temporarily.",
    tasks: [
      { id: "T-501", name: "Doc OCR Parsing & Digilocker", assignee: "Divya Pillai", status: "Not Started", blocked: true, role: "Developer" },
      { id: "T-502", name: "Hardware Asset Provisioning API", assignee: "Unassigned", status: "Not Started", blocked: false, role: "Developer" }
    ],
    milestones: [
      { name: "Digital Document Upload", progress: 30, status: "In Progress" },
      { name: "Automated KYC Verification", progress: 10, status: "Not Started" }
    ],
    resourceGaps: [
      { role: "Developer", required: 3, available: 1 },
      { role: "Tester", required: 2, available: 0 }
    ]
  },
  {
    id: 6,
    name: "Analytics Executive Dashboard",
    manager: "Sarah Jenkins",
    progress: 76,
    expectedProgress: 72,
    deadline: "2026-10-04",
    startDate: "2026-07-15",
    budget: 600000,
    budgetUsed: 390000,
    team: 5,
    status: "ON TRACK",
    priority: "Medium",
    category: "Enterprise",
    description: "C-suite business intelligence metrics, real-time ARR calculation, customer churn predictors and automated daily PDF digests.",
    tasks: [],
    milestones: [
      { name: "Data Warehouse ETL Pipeline", progress: 85, status: "In Progress" },
      { name: "Interactive Visual Widgets", progress: 75, status: "In Progress" }
    ],
    resourceGaps: [{ role: "Developer", required: 3, available: 3 }]
  },
  {
    id: 7,
    name: "Enterprise CRM Revamp",
    manager: "Arjun Sharma",
    progress: 56,
    expectedProgress: 68,
    deadline: "2026-10-30",
    startDate: "2026-06-20",
    budget: 700000,
    budgetUsed: 430000,
    team: 7,
    status: "AT RISK",
    priority: "High",
    category: "Enterprise",
    description: "Modernizing corporate client pipeline, automated quotation generation, WhatsApp CRM hookups and contract signatures.",
    tasks: [
      { id: "T-701", name: "Lead Kanban View & Drag-Drop", assignee: "Aman Verma", status: "In Progress", blocked: false, role: "Developer" }
    ],
    milestones: [
      { name: "Lead Pipeline Modernization", progress: 50, status: "In Progress" },
      { name: "Quotation Engine & PDF Export", progress: 40, status: "In Progress" }
    ],
    resourceGaps: [{ role: "Developer", required: 4, available: 3 }, { role: "Tester", required: 2, available: 1 }]
  },
  {
    id: 8,
    name: "Logistics Fleet API",
    manager: "Sarah Jenkins",
    progress: 89,
    expectedProgress: 82,
    deadline: "2026-09-24",
    startDate: "2026-07-05",
    budget: 450000,
    budgetUsed: 310000,
    team: 4,
    status: "ON TRACK",
    priority: "Medium",
    category: "Logistics",
    description: "High-concurrency microservice for geospatial fleet routing, ETA calculations, fuel consumption logging and driver dispatch.",
    tasks: [],
    milestones: [
      { name: "Route Optimization Engine", progress: 95, status: "In Progress" },
      { name: "Geofencing Webhook Triggers", progress: 85, status: "In Progress" }
    ],
    resourceGaps: [{ role: "Developer", required: 2, available: 2 }]
  },
  {
    id: 9,
    name: "Learning Management System",
    manager: "Elena Rostova",
    progress: 22,
    expectedProgress: 45,
    deadline: "2026-12-22",
    startDate: "2026-08-15",
    budget: 550000,
    budgetUsed: 220000,
    team: 6,
    status: "DELAYED",
    priority: "High",
    category: "Enterprise",
    description: "SCORM-compliant interactive video player, employee quiz assessment engine, proctored testing, and automated certificate issuance.",
    tasks: [
      { id: "T-901", name: "Video Stream DRM & CDN Player", assignee: "Sana Sheikh", status: "In Progress", blocked: true, role: "Developer" }
    ],
    milestones: [
      { name: "Curriculum Builder & Admin", progress: 40, status: "In Progress" },
      { name: "Interactive Video Player", progress: 10, status: "Not Started" }
    ],
    resourceGaps: [
      { role: "Developer", required: 3, available: 2 },
      { role: "Tester", required: 2, available: 0 }
    ]
  },
  {
    id: 10,
    name: "Payment Gateway v3 Engine",
    manager: "Arjun Sharma",
    progress: 96,
    expectedProgress: 92,
    deadline: "2026-09-15",
    startDate: "2026-07-01",
    budget: 300000,
    budgetUsed: 275000,
    team: 3,
    status: "ON TRACK",
    priority: "Critical",
    category: "FinTech",
    description: "PCI-DSS Level 1 compliant card tokenization engine, automated reconciliation, and instant settlement fallback webhooks.",
    tasks: [],
    milestones: [
      { name: "PCI DSS Compliance Audit", progress: 100, status: "Completed" },
      { name: "Production Traffic Cutover", progress: 95, status: "In Progress" }
    ],
    resourceGaps: [{ role: "Developer", required: 2, available: 2 }]
  },
  {
    id: 11,
    name: "IoT Telematics Hub",
    manager: "Sarah Jenkins",
    progress: 65,
    expectedProgress: 68,
    deadline: "2026-11-08",
    startDate: "2026-07-20",
    budget: 900000,
    budgetUsed: 510000,
    team: 6,
    status: "ON TRACK",
    priority: "Medium",
    category: "AI & IoT",
    description: "MQTT sensor event ingestion for 25,000 smart delivery vehicles, battery thermal monitoring, and predictive maintenance alerts.",
    tasks: [],
    milestones: [
      { name: "MQTT Broker Load Balancing", progress: 70, status: "In Progress" }
    ],
    resourceGaps: [{ role: "Developer", required: 3, available: 3 }]
  },
  {
    id: 12,
    name: "Customer Support AI Bot",
    manager: "Arjun Sharma",
    progress: 79,
    expectedProgress: 75,
    deadline: "2026-10-18",
    startDate: "2026-08-01",
    budget: 320000,
    budgetUsed: 215000,
    team: 4,
    status: "ON TRACK",
    priority: "Medium",
    category: "AI & IoT",
    description: "Conversational AI assistant utilizing RAG over corporate knowledge bases to resolve Tier-1 refund, delivery, and invoice queries.",
    tasks: [],
    milestones: [
      { name: "Knowledge Base Vector Indexing", progress: 85, status: "In Progress" }
    ],
    resourceGaps: [{ role: "Developer", required: 2, available: 2 }]
  }
];

// Historical Successful Teams for Uniqueness 3: "Build a Best Team"
export const HISTORICAL_TEAMS: HistoricalProjectTeam[] = [
  {
    id: "HT-01",
    projectName: "RetailHub Omnichannel v1.0",
    category: "E-Commerce",
    completionDate: "2025-11-15",
    successRating: 4.9,
    durationMonths: 4,
    teamRoles: [
      { role: "Backend Developer", employeeName: "Rohan Kulkarni", employeeId: "EMP-09", contribution: "Built high-throughput cart & checkout engine with zero downtime." },
      { role: "Frontend Developer", employeeName: "Divya Pillai", employeeId: "EMP-08", contribution: "Delivered responsive shop UI with 99 Lighthouse performance score." },
      { role: "UI/UX Designer", employeeName: "Priya Nair", employeeId: "EMP-03", contribution: "Designed award-winning minimalist checkout flow." },
      { role: "QA Engineer", employeeName: "Ananya Roy", employeeId: "EMP-10", contribution: "Automated 450+ critical user journey tests." },
      { role: "DevOps Engineer", employeeName: "Kabir Mehta", employeeId: "EMP-11", contribution: "Architected auto-scaling Kubernetes cluster." },
    ]
  },
  {
    id: "HT-02",
    projectName: "BharatPay Micro-Transactions",
    category: "FinTech",
    completionDate: "2026-02-28",
    successRating: 4.8,
    durationMonths: 5,
    teamRoles: [
      { role: "Backend Developer", employeeName: "Neha Joshi", employeeId: "EMP-06", contribution: "Implemented AES-256 tokenization and RBI audit trails." },
      { role: "Senior Backend Developer", employeeName: "Aman Verma", employeeId: "EMP-02", contribution: "Integrated NPCI UPI 2.0 direct rails." },
      { role: "QA Tester", employeeName: "Vikram Malhotra", employeeId: "EMP-05", contribution: "Executed heavy stress testing up to 10k TPS." },
    ]
  },
  {
    id: "HT-03",
    projectName: "TeleMed Direct Consultation",
    category: "Healthcare",
    completionDate: "2025-08-10",
    successRating: 4.7,
    durationMonths: 6,
    teamRoles: [
      { role: "Fullstack Developer", employeeName: "Sana Sheikh", employeeId: "EMP-04", contribution: "Integrated WebRTC encrypted video consults." },
      { role: "UI/UX Designer", employeeName: "Priya Nair", employeeId: "EMP-03", contribution: "Designed elder-friendly accessible healthcare UI." },
      { role: "QA Engineer", employeeName: "Karan Singhania", employeeId: "EMP-07", contribution: "Validated HIPAA audit compliance standards." },
    ]
  },
  {
    id: "HT-04",
    projectName: "FastTrack Dispatch & Routing",
    category: "Logistics",
    completionDate: "2025-12-01",
    successRating: 4.9,
    durationMonths: 3,
    teamRoles: [
      { role: "Backend Developer", employeeName: "Rohan Kulkarni", employeeId: "EMP-09", contribution: "Implemented Dijkstra dynamic route optimization." },
      { role: "DevOps Engineer", employeeName: "Kabir Mehta", employeeId: "EMP-11", contribution: "Deployed edge MQTT gateways across 12 hubs." },
      { role: "QA Engineer", employeeName: "Ananya Roy", employeeId: "EMP-10", contribution: "Simulated fleet geofencing boundary alerts." },
    ]
  }
];

// Connected Data Sources with Scoped Permission (Section 5)
export const DATA_SOURCES: DataSource[] = [
  {
    id: "SRC-EMAIL",
    name: "Corporate Email (Exchange / Gmail)",
    category: "Communication",
    icon: "Mail",
    connected: true,
    scopedPermissions: ["Project Alpha tag only", "E-Commerce Vendor correspondence", "No personal emails"],
    allowedCount: 3,
    totalCount: 42,
    lastSync: "4 mins ago",
    isBrand: false
  },
  {
    id: "SRC-WHATSAPP",
    name: "WhatsApp Project Groups",
    category: "Team Chat",
    icon: "MessageSquare",
    connected: true,
    scopedPermissions: ["Group: #ecommerce-dev-core", "Group: #mobile-banking-leads", "Personal chats strictly blocked"],
    allowedCount: 2,
    totalCount: 18,
    lastSync: "Just now",
    isBrand: true
  },
  {
    id: "SRC-JIRA",
    name: "Jira Issue & Sprint Tracker",
    category: "Issue Tracking",
    icon: "CheckSquare",
    connected: true,
    scopedPermissions: ["Boards: PRJ-ECOM, PRJ-FIN", "Sync sprint deadlines and blocked tags"],
    allowedCount: 5,
    totalCount: 5,
    lastSync: "12 mins ago",
    isBrand: true
  },
  {
    id: "SRC-SLACK",
    name: "Slack Workspaces",
    category: "Team Chat",
    icon: "Hash",
    connected: false,
    scopedPermissions: ["Channel: #hospital-system-updates", "Channel: #dev-alerts"],
    allowedCount: 0,
    totalCount: 14,
    lastSync: "Never",
    isBrand: true
  },
  {
    id: "SRC-EXCEL",
    name: "Excel & Google Sheets Budgets",
    category: "Spreadsheets",
    icon: "FileSpreadsheet",
    connected: true,
    scopedPermissions: ["File: Q3_Project_Budgets_v4.xlsx (Read Only)", "Column: Allocated / Consumed"],
    allowedCount: 4,
    totalCount: 12,
    lastSync: "1 hour ago",
    isBrand: false
  },
  {
    id: "SRC-DRIVE",
    name: "Google Drive / SharePoint Docs",
    category: "Documentation",
    icon: "FolderGit2",
    connected: false,
    scopedPermissions: ["Folder: /Product-Specs/2026/ (Read Only)"],
    allowedCount: 0,
    totalCount: 8,
    lastSync: "Never",
    isBrand: true
  }
];

// Ingested Real-Time Messages & NLP Structured Parsing (Section 6 & 7)
export const INITIAL_EXTRACTED_UPDATES: ExtractedUpdate[] = [
  {
    id: "LOG-01",
    source: "WhatsApp Group",
    channel: "#ecommerce-dev-core",
    rawMessage: "Guys payment API is still not done, probably need 2 more days. Testing blocked on checkout flow.",
    extractedProject: "E-Commerce Platform",
    extractedTask: "Payment API Integration",
    extractedStatus: "Blocked",
    estimatedDelay: "2 days",
    riskImpact: "HIGH",
    timestamp: "10:14 AM Today",
    senderRole: "Lead Developer"
  },
  {
    id: "LOG-02",
    source: "Outlook Email",
    channel: "Subject: Daily QA Digest - Build 402",
    rawMessage: "Testing has started. 5 of 20 test cases failed in biometric settlement fallback.",
    extractedProject: "Mobile Banking App",
    extractedTask: "Biometric Settlement Tests",
    extractedStatus: "In Progress",
    estimatedDelay: "1 day",
    riskImpact: "MEDIUM",
    timestamp: "09:45 AM Today",
    senderRole: "QA Lead"
  },
  {
    id: "LOG-03",
    source: "Jira Webhook",
    channel: "Ticket: HOSP-302",
    rawMessage: "Third-party insurance verification sandbox returned 504 Gateway Timeout. Integration blocked.",
    extractedProject: "Hospital Management System",
    extractedTask: "Insurance Billing Integration",
    extractedStatus: "Blocked",
    estimatedDelay: "4 days",
    riskImpact: "HIGH",
    timestamp: "Yesterday, 4:30 PM",
    senderRole: "Backend Dev"
  },
  {
    id: "LOG-04",
    source: "Slack Project Channel",
    channel: "#logistics-api",
    rawMessage: "Redis caching latency optimized down to 12ms. Route calculator ready for load testing.",
    extractedProject: "Logistics Fleet API",
    extractedTask: "Route Optimization Engine",
    extractedStatus: "Completed",
    estimatedDelay: "0 days",
    riskImpact: "LOW",
    timestamp: "Yesterday, 2:15 PM",
    senderRole: "DevOps Engineer"
  }
];

export const EXTRACTED_UPDATES: ExtractedUpdate[] = INITIAL_EXTRACTED_UPDATES;

/* ================== RISK ENGINE (Mathematical, Explainable & ported from risk_engine.py) ================== */
export function daysRemaining(deadlineStr: string): number {
  const d = new Date(deadlineStr);
  const today = new Date("2026-09-18"); // Current environment date
  return Math.max(0, Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
}

export function calculateRisk(p: Project): RiskAnalysis {
  const factors: { label: string; detail: string; weight: number }[] = [];
  let score = 0;

  // 1. Progress Gap Factor
  const progressGap = Math.max(0, p.expectedProgress - p.progress);
  const progressComponent = Math.min(32, progressGap * 1.6);
  if (progressGap > 0) {
    factors.push({
      label: "Progress Deficit",
      detail: `Current progress (${p.progress}%) is ${progressGap}% below expected milestone velocity (${p.expectedProgress}%).`,
      weight: Math.round(progressComponent)
    });
  }
  score += progressComponent;

  // 2. Resource Shortage Factor
  const totalRequired = p.resourceGaps.reduce((s, r) => s + r.required, 0) || 1;
  const totalGap = p.resourceGaps.reduce((s, r) => s + Math.max(0, r.required - r.available), 0);
  const shortageRatio = totalGap / totalRequired;
  const shortageComponent = Math.min(30, shortageRatio * 60);
  if (totalGap > 0) {
    factors.push({
      label: "Resource Shortage",
      detail: `${totalGap} critical role position(s) are unfulfilled across team staffing allocations.`,
      weight: Math.round(shortageComponent)
    });
  }
  score += shortageComponent;

  // 3. Blocked / Single-Point-of-Failure Tasks
  const blockedTasks = p.tasks.filter(t => t.blocked);
  const dependencyComponent = Math.min(25, blockedTasks.length * 12);
  if (blockedTasks.length > 0) {
    factors.push({
      label: "Task Bottlenecks",
      detail: `${blockedTasks.length} critical path task(s) are strictly blocked by external or technical blockers.`,
      weight: Math.round(dependencyComponent)
    });
  }
  score += dependencyComponent;

  // 4. Testing Delays
  const testingTasks = p.tasks.filter(t => t.name.toLowerCase().includes("test") || t.role === "Tester");
  let testingComponent = 0;
  if (testingTasks.length > 0 && testingTasks.every(t => t.status === "Not Started")) {
    testingComponent = 16;
    factors.push({
      label: "Testing Phase Lag",
      detail: "Testing and QA certification has not commenced despite the project nearing final release window.",
      weight: testingComponent
    });
  }
  score += testingComponent;

  // 5. Schedule Compression
  const daysLeft = daysRemaining(p.deadline);
  const remainingWork = 100 - p.progress;
  let scheduleComponent = 0;
  if (daysLeft < remainingWork * 0.45) {
    scheduleComponent = 12;
    factors.push({
      label: "Schedule Compression",
      detail: `Only ${daysLeft} days remain to complete ${remainingWork}% of incomplete milestone scope.`,
      weight: scheduleComponent
    });
  }
  score += scheduleComponent;

  // 6. Budget Burn Discrepancy
  const budgetUsedPct = p.budget ? (p.budgetUsed / p.budget) * 100 : 0;
  if (budgetUsedPct - p.progress > 14) {
    const budgetComponent = 8;
    factors.push({
      label: "Budget Burn Rate",
      detail: `Financial burn (${Math.round(budgetUsedPct)}%) is outpacing actual physical progress (${p.progress}%).`,
      weight: budgetComponent
    });
    score += budgetComponent;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  const level = score >= 70 ? "HIGH" : score >= 40 ? "MEDIUM" : "LOW";
  const predictedDelay = Math.max(0, Math.round((score / 100) * 14 + blockedTasks.length * 1.6 + progressGap * 0.12));

  const totalWeight = factors.reduce((s, f) => s + f.weight, 0) || 1;
  const normalizedFactors = factors.map(f => ({
    ...f,
    percent: Math.round((f.weight / totalWeight) * 100)
  }));

  return {
    riskScore: score,
    riskLevel: level,
    predictedDelay,
    factors: normalizedFactors
  };
}

export function generateRescuePlans(p: Project, risk: RiskAnalysis): { options: RescueOption[]; recommendation: RescueOption } {
  const devGap = Math.max(1, (p.resourceGaps.find(r => r.role === "Developer")?.required || 1) - (p.resourceGaps.find(r => r.role === "Developer")?.available || 0));
  const testerGap = Math.max(1, (p.resourceGaps.find(r => r.role === "Tester")?.required || 1) - (p.resourceGaps.find(r => r.role === "Tester")?.available || 0));
  const riskScore = risk.riskScore;
  const delay = risk.predictedDelay;

  const options: RescueOption[] = [
    {
      id: 1,
      title: "Internal Talent Reallocation",
      description: `Reassign ${devGap} skilled developer(s) from lower-priority internal projects for 10 sprint days.`,
      riskBefore: riskScore,
      riskAfter: Math.max(5, Math.round(riskScore * 0.54)),
      delayBefore: delay,
      delayAfter: Math.max(0, Math.round(delay * 0.40)),
      cost: 0
    },
    {
      id: 2,
      title: "Specialist Augmentation & Overtime",
      description: `Engage ${devGap} Python contractor(s) and ${testerGap} QA automation specialist(s) on immediate reserve.`,
      riskBefore: riskScore,
      riskAfter: Math.max(5, Math.round(riskScore * 0.28)),
      delayBefore: delay,
      delayAfter: Math.max(0, Math.round(delay * 0.15)),
      cost: devGap * 60000 + testerGap * 35000
    },
    {
      id: 3,
      title: "Scope Pruning (De-scope Non-Criticals)",
      description: "Defer secondary catalog filters and batch reporting to release v1.1 to safeguard the hard release date.",
      riskBefore: riskScore,
      riskAfter: Math.max(5, Math.round(riskScore * 0.42)),
      delayBefore: delay,
      delayAfter: Math.max(0, Math.round(delay * 0.25)),
      cost: 0
    }
  ];

  const recommendation: RescueOption = {
    id: 99,
    title: "Hybrid Strategy (Talent Reallocation + Scope Pruning)",
    description: "Reassign 1 experienced internal developer from Logistics API and defer non-critical analytics to v1.1. Optimal zero-cost recovery trajectory.",
    riskBefore: riskScore,
    riskAfter: Math.max(5, Math.round(riskScore * 0.31)),
    delayBefore: delay,
    delayAfter: Math.max(0, Math.round(delay * 0.16)),
    cost: 0
  };

  return { options, recommendation };
}

export function simulate(
  baseRisk: number,
  baseDelay: number,
  extraDevs: number,
  extraTesters: number,
  budgetIncrease: number,
  removeLowPriority: boolean,
  deadlineExtension: number
): { risk: number; delay: number; cost: number } {
  let risk = baseRisk;
  let delay = baseDelay;

  for (let i = 0; i < extraDevs; i++) {
    risk -= Math.max(5, 18 - i * 4);
    delay -= Math.max(1, 4 - i);
  }
  for (let i = 0; i < extraTesters; i++) {
    risk -= Math.max(4, 11 - i * 3);
    delay -= Math.max(0.5, 2.5 - i * 0.5);
  }
  if (removeLowPriority) {
    risk -= 14;
    delay -= 3.5;
  }
  if (budgetIncrease > 0) {
    risk -= Math.min(10, budgetIncrease / 40000);
  }
  if (deadlineExtension > 0) {
    delay -= deadlineExtension;
    risk -= Math.min(12, deadlineExtension * 1.5);
  }

  risk = Math.max(3, Math.min(100, Math.round(risk)));
  delay = Math.max(0, Math.round(delay));
  const cost = extraDevs * 60000 + extraTesters * 35000 + Math.max(0, budgetIncrease);

  return { risk, delay, cost };
}

export function formatCurrency(amount: number): string {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

/* ================== WRIKE-INSPIRED APPS & INTEGRATIONS DIRECTORY ================== */
export const INTEGRATION_PILLS = [
  { name: "Microsoft", category: "Productivity", icon: "Grid" },
  { name: "Google", category: "Productivity", icon: "Chrome" },
  { name: "Adobe", category: "Digital Asset Management", icon: "Palette" },
  { name: "Salesforce", category: "Customer Relations", icon: "Cloud" },
  { name: "Zoom", category: "Collaboration", icon: "Video" },
  { name: "Tableau", category: "Analytics", icon: "BarChart3" },
  { name: "MS Teams", category: "Collaboration", icon: "Users" },
  { name: "Klaxoon", category: "Collaboration", icon: "Zap" },
  { name: "OneLogin", category: "IT", icon: "Shield" },
  { name: "OneDrive", category: "Productivity", icon: "HardDrive" },
  { name: "Tenovos", category: "Digital Asset Management", icon: "Layers" },
  { name: "GitHub", category: "Developer", icon: "GitBranch" },
  { name: "Gmail", category: "Productivity", icon: "Mail" },
  { name: "Google Calendar", category: "Productivity", icon: "Calendar" },
  { name: "Outlook", category: "Productivity", icon: "Mail" },
  { name: "Excel", category: "Finance", icon: "FileSpreadsheet" },
  { name: "Jira", category: "Project Management", icon: "CheckSquare" },
  { name: "NetSuite", category: "Finance", icon: "DollarSign" },
  { name: "Microsoft Copilot", category: "Artificial Intelligence", icon: "Sparkles" },
  { name: "Google Gemini", category: "Artificial Intelligence", icon: "Sparkles" },
  { name: "Claude", category: "Artificial Intelligence", icon: "Bot" },
  { name: "Claude Code", category: "Artificial Intelligence", icon: "Code2" },
  { name: "Wrike MCP", category: "Artificial Intelligence", icon: "Cpu" },
  { name: "Box", category: "Productivity", icon: "Box" },
  { name: "DocuSign", category: "Productivity", icon: "FileText" },
  { name: "Dropbox", category: "Productivity", icon: "Folder" },
  { name: "Miro", category: "Collaboration", icon: "Layout" }
];

export interface IntegrationCardItem {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  description: string;
  iconName: string;
  planBadge: 'Business' | 'Add-on' | 'All plans' | 'Team';
  connected: boolean;
  type: 'integrate' | 'sync' | 'api';
  allowedScopes: string;
  lastSync?: string;
}

export const EXPANDED_INTEGRATIONS: IntegrationCardItem[] = [
  {
    id: "box",
    name: "Box via Allora Integrate",
    category: "Productivity",
    description: "Automate your multi-app workflows and sync asset approvals directly with project deliverables.",
    iconName: "Box",
    planBadge: "Business",
    connected: true,
    type: "integrate",
    allowedScopes: "Folder: /Approved-Deliverables (Read Only)",
    lastSync: "12m ago"
  },
  {
    id: "docusign",
    name: "DocuSign via Allora Integrate",
    category: "Productivity",
    description: "Automate vendor agreements, statements of work (SOWs), and milestone sign-offs.",
    iconName: "FileText",
    planBadge: "Business",
    connected: false,
    type: "integrate",
    allowedScopes: "Envelope status webhooks"
  },
  {
    id: "dropbox",
    name: "Dropbox via Allora Integrate",
    category: "Productivity",
    description: "Automate multi-app workflows, share mockups, and trigger design reviews automatically.",
    iconName: "Folder",
    planBadge: "Business",
    connected: false,
    type: "integrate",
    allowedScopes: "Files: /Design-Assets"
  },
  {
    id: "excel",
    name: "Excel via Allora Sync",
    category: "Finance",
    description: "Do more than set 1-way triggers with a real-time 2-way sync that turns spreadsheets into active tasks.",
    iconName: "FileSpreadsheet",
    planBadge: "Business",
    connected: true,
    type: "sync",
    allowedScopes: "File: Q3_Project_Budgets.xlsx",
    lastSync: "1h ago"
  },
  {
    id: "gmail",
    name: "Gmail via Allora Integrate",
    category: "Productivity",
    description: "Extract project blocker signals, vendor updates, and timeline risks safely with zero personal scraping.",
    iconName: "Mail",
    planBadge: "Business",
    connected: true,
    type: "integrate",
    allowedScopes: "Tagged emails: [Project Alpha]",
    lastSync: "4m ago"
  },
  {
    id: "gcal",
    name: "Google Calendar Automation",
    category: "Productivity",
    description: "Instantly generate milestone calendar events whenever sprint deadlines change.",
    iconName: "Calendar",
    planBadge: "Team",
    connected: true,
    type: "integrate",
    allowedScopes: "Calendar: Project Release Dates",
    lastSync: "25m ago"
  },
  {
    id: "gdrive",
    name: "Google Drive via Allora Integrate",
    category: "Productivity",
    description: "Automate your multi-app workflows, link requirements docs, and maintain an audit trail.",
    iconName: "HardDrive",
    planBadge: "Business",
    connected: true,
    type: "integrate",
    allowedScopes: "Folder: /Specs-2026",
    lastSync: "2h ago"
  },
  {
    id: "teams",
    name: "MS Teams",
    category: "Collaboration",
    description: "Collaborate on tasks and manage project alerts directly in Microsoft Teams channels.",
    iconName: "Users",
    planBadge: "All plans",
    connected: true,
    type: "integrate",
    allowedScopes: "Channel: #project-alerts",
    lastSync: "Just now"
  },
  {
    id: "miro",
    name: "Miro via Allora Sync",
    category: "Collaboration",
    description: "Connect Miro visual sprint boards to Allora projects with live 2-way updates.",
    iconName: "Layout",
    planBadge: "Business",
    connected: false,
    type: "sync",
    allowedScopes: "Board: Sprint 14 Retrospective"
  },
  {
    id: "jira",
    name: "Jira Agile & Sprint Sync",
    category: "Project Management",
    description: "Bi-directional sprint ticket synchronization, blocker extraction, and burndown telemetry.",
    iconName: "CheckSquare",
    planBadge: "Business",
    connected: true,
    type: "sync",
    allowedScopes: "Boards: PRJ-ECOM, PRJ-FIN",
    lastSync: "Just now"
  },
  {
    id: "gemini",
    name: "Google Gemini 2.5 Pro Agent",
    category: "Artificial Intelligence",
    description: "Deep reasoning engine powering conversational project manager Q&A, predictive risk, and root-cause analysis.",
    iconName: "Sparkles",
    planBadge: "Business",
    connected: true,
    type: "api",
    allowedScopes: "Zero-data retention sandbox",
    lastSync: "Active"
  },
  {
    id: "claude",
    name: "Claude Code & MCP Bridge",
    category: "Artificial Intelligence",
    description: "Natural language query interface and model context protocol bridge for enterprise project auditing.",
    iconName: "Bot",
    planBadge: "Business",
    connected: true,
    type: "api",
    allowedScopes: "Read-only workspace schema",
    lastSync: "Active"
  },
  {
    id: "github",
    name: "GitHub Repositories & CI/CD",
    category: "Developer",
    description: "Monitor deployment rollouts, pull request velocity, build failures, and automated regression test status.",
    iconName: "GitBranch",
    planBadge: "All plans",
    connected: true,
    type: "integrate",
    allowedScopes: "Repos: allora/ecom-core, allora/mobile-banking",
    lastSync: "3m ago"
  },
  {
    id: "whatsapp",
    name: "WhatsApp Scoped Group Ingestion",
    category: "Collaboration",
    description: "Permission-bound group chat monitor for real-time project sentiment and delay detection.",
    iconName: "MessageSquare",
    planBadge: "Team",
    connected: true,
    type: "integrate",
    allowedScopes: "Group: #ecommerce-dev-core",
    lastSync: "Just now"
  }
];

/* ================== AUTOMATION RULES ("WHEN THIS HAPPENS -> THEN DO THAT") ================== */
export const DEFAULT_AUTOMATION_RULES = [
  {
    id: "auto-1",
    title: "Review Required Mention",
    trigger: "When status changes to 'Review required'",
    action: "Add comment & notify @QA_Lead and @DeliveryManager to review deliverable",
    active: true,
    category: "Status" as const
  },
  {
    id: "auto-2",
    title: "Critical Risk Talent Mobility Trigger",
    trigger: "When AI Risk Score exceeds 70% or schedule slips > 3 days",
    action: "Auto-generate Internal Talent Reallocation suggestions from underutilized projects",
    active: true,
    category: "Risk" as const
  },
  {
    id: "auto-3",
    title: "Sprint Compression Alert (Boost Mode)",
    trigger: "When critical path task is blocked > 48 hours",
    action: "Prompt manager to authorize sprint acceleration (+2 Devs, +1 QA) within contingency budget",
    active: true,
    category: "Talent" as const
  },
  {
    id: "auto-4",
    title: "Deployment Verification Automation",
    trigger: "When status changes to 'Deployed'",
    action: "Trigger automated smoke tests on staging and notify release channel",
    active: false,
    category: "Status" as const
  },
  {
    id: "auto-5",
    title: "Ingested Communication Risk Escalation",
    trigger: "When WhatsApp / Jira NLP flags 'HIGH' delay severity",
    action: "Instantly update project status to 'AT RISK' and generate root-cause breakdown",
    active: true,
    category: "Integration" as const
  }
];

/* ================== OKR & BUDGET OVERVIEW DATA ================== */
export const OKR_PORTFOLIO_DATA = {
  totalActualCosts: 423100, // $423.1K
  totalPlannedBudget: 687400, // $687.4K
  roiPercentage: 62.5,
  remainingBudget: 264300, // $264.3K
  budgetByOkrs: [
    { name: "KR1: Zero Downtime Deployments", share: 58, amount: 251000, color: "#10b981" },
    { name: "KR2: Unified Multi-Vendor Cart", share: 20, amount: 80000, color: "#38bdf8" },
    { name: "KR3: Sub-200ms UPI Settlement", share: 11, amount: 47000, color: "#fbbf24" },
    { name: "KR4: RBI Biometric Compliance", share: 6, amount: 25000, color: "#f87171" },
    { name: "KR5: Mobile App Store Rating 4.8", share: 5, amount: 20000, color: "#c084fc" }
  ],
  actualSpendByOkrs: [
    { okr: "KR1", actual: 70.5, planned: 80, fill: "#10b981" },
    { okr: "KR2", actual: 40.0, planned: 55, fill: "#38bdf8" },
    { okr: "KR3", actual: 15.7, planned: 30, fill: "#fbbf24" },
    { okr: "KR4", actual: 22.5, planned: 25, fill: "#f87171" },
    { okr: "KR5", actual: 22.5, planned: 20, fill: "#c084fc" }
  ],
  sampleOkrProjects: [
    { id: 1, title: "Cornwall United E-Commerce", status: "Preparing", progress: 50, budget: 140000, actualCost: 82000 },
    { id: 2, title: "Doublehow Banking Core", status: "Preparing", progress: 27, budget: 180000, actualCost: 65000 },
    { id: 3, title: "E-zentone Logistics Gateway", status: "Preparing", progress: 45, budget: 110000, actualCost: 49000 },
    { id: 4, title: "Omnichannel Pay Engine", status: "In Progress", progress: 78, budget: 220000, actualCost: 172000 },
    { id: 5, title: "TeleMed Health Vault", status: "Completed", progress: 100, budget: 95000, actualCost: 91000 }
  ]
};

