/* Content data: projects and skills. Descriptions are based on each project's source code. */
window.PROJECTS = [
  {
    id: "noozaib", name: "Noozaib Fragrances", category: "E-commerce / Full-Stack Development",
    kind: "Pre-launch", accent: "#5b8cff", shot: "assets/shots/noozaib-home.jpg",
    summary: "A fragrance e-commerce application for the Pakistani market with a storefront, customer accounts and an admin area.",
    description: "Noozaib Fragrances covers the path from browsing a categorised catalogue to placing and tracking an order, with admin tools for running the shop. Much of the work went into the parts that make a shop safe to launch: input validation, rate limiting, session handling and a thorough automated test suite.",
    features: [
      "Catalogue with categories, customer accounts, cart and checkout",
      "Email and Google sign-in, email verification and password reset",
      "Admin area for products, orders, coupons, reviews and users",
      "Coupons, welcome discount and order stock handling",
      "Rate limiting, session invalidation, CSV export safety and push-URL (SSRF) checks",
      "Web push notifications and a health-check endpoint",
      "Alembic migrations with SQLite-to-PostgreSQL copy tooling",
      "pytest suite of about twenty test modules"
    ],
    stack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "Alembic", "Jinja2", "JavaScript", "pytest"],
    status: "Pre-launch. Production hardening is done and covered by tests. Deployment planning, launch checklist and backup runbooks are written.",
    contribution: "Developed the application end to end: data model, storefront, authentication, admin area, security hardening and tests.",
    note: "The live demo uses sample products and a throw-away database, and it runs on free hosting, so the first page can take a few seconds to load."
  },
  {
    id: "shoeadda", name: "ShoeAdda", category: "E-commerce / Web Development",
    kind: "Early development", accent: "#8b5cf6",
    summary: "An online footwear store for the Pakistani market, built around ordering by WhatsApp and cash on delivery.",
    description: "ShoeAdda is designed around how people in Pakistan shop online: choose a pair, confirm the order over WhatsApp and pay on delivery. I am building it in phases. The back end, customer accounts and the site shell are finished, and the catalogue, cart and checkout pages are the planned next stages.",
    features: [
      "Data models for catalogue, orders, reviews, contact messages and users",
      "Registration and login with CSRF protection and rate limiting",
      "Shared site layout with navigation, footer, WhatsApp button and error pages",
      "WhatsApp order-message service and a Cash on Delivery order model",
      "Alembic migrations",
      "Check scripts that build the real app for each development phase"
    ],
    stack: ["Python", "Flask", "SQLAlchemy", "Alembic", "SQLite"],
    status: "Early development. Back end and customer accounts are working; catalogue and checkout pages are still to be built.",
    contribution: "Designed the data model and back end and wrote the phase check scripts.",
    note: ""
  },
  {
    id: "goldai", name: "GoldAI_Bot", category: "Python / Market Research",
    kind: "Research prototype", accent: "#e0b84f",
    summary: "A gold-market analysis tool that uses MetaTrader 5 data and records what a rule-based decision engine would have done.",
    description: "GoldAI_Bot reads market data from MetaTrader 5, analyses it and passes it to a decision engine. Every decision is logged and later scored as a hypothetical (paper) position, so the rules can be checked against real history instead of being taken on trust.",
    features: [
      "Market data, multi-timeframe and market-structure analysis",
      "Economic-calendar, news and FOMC reaction analysis",
      "Decision engine returning BUY, SELL or WAIT with reference levels",
      "Classifier that records why the engine chose WAIT",
      "Paper outcome tracking and historical validation",
      "Safety-gated paper-observation cycle runner, with unit tests"
    ],
    stack: ["Python", "pandas", "MetaTrader 5 API"],
    status: "Research prototype running paper observation only.",
    contribution: "Designed and built the analysis pipeline, decision logic, validation tools and tests.",
    note: "For research and learning only. The code places no broker orders and the project makes no claim of profit."
  },
  {
    id: "youtube", name: "YouTube Agent", category: "Workflow Automation / Dashboard",
    kind: "Local prototype", accent: "#34d3a5",
    summary: "A local dashboard for planning a YouTube channel, with a human approval step before any external action.",
    description: "YouTube Agent keeps research, tasks and video planning in one place. Its main design rule is that nothing that could touch an external account runs unless a matching, unexpired approval exists, and that rule is enforced in code rather than left to convention.",
    features: [
      "Niche-research workspace with sources, evidence and comparison criteria",
      "Video projects that move through defined stages and are archived, not deleted",
      "Code-enforced approval gate for actions",
      "Task tracking, activity log, CSRF protection and input validation",
      "Alembic-managed database"
    ],
    stack: ["Python", "Flask", "SQLite", "Alembic"],
    status: "Working local prototype. Single user, runs on one machine, not production-ready and not security-audited.",
    contribution: "Designed the architecture and built the dashboard, workflow stages and approval gate.",
    note: ""
  }
];

/* "p" lists the project ids that use a skill; the rest are labelled by origin. */
window.SKILLS = [
  { group: "Programming Languages", icon: "code", items: [
    { n: "Python", p: ["noozaib", "shoeadda", "goldai", "youtube"] },
    { n: "JavaScript", p: ["noozaib"] },
    { n: "HTML", p: ["noozaib"] },
    { n: "CSS", p: ["noozaib"] },
    { n: "Java", p: [], b: "Coursework" },
    { n: "C++", p: [], b: "Coursework" }
  ]},
  { group: "Core Concepts", icon: "layers", items: [
    { n: "Object-Oriented Programming", p: [], b: "Coursework" },
    { n: "Data Structures & Algorithms", p: [], b: "Coursework" },
    { n: "Database Management Systems", p: ["noozaib", "shoeadda", "youtube"] },
    { n: "Operating Systems", p: [], b: "Coursework" },
    { n: "Software Design & Architecture", p: [], b: "Coursework" },
    { n: "Requirements Engineering", p: [], b: "Coursework" },
    { n: "Artificial Intelligence", p: [], b: "Coursework" }
  ]},
  { group: "Backend & Data", icon: "db", items: [
    { n: "Flask", p: ["noozaib", "shoeadda", "youtube"] },
    { n: "SQLAlchemy", p: ["noozaib", "shoeadda"] },
    { n: "Alembic migrations", p: ["noozaib", "shoeadda", "youtube"] },
    { n: "PostgreSQL", p: ["noozaib"] },
    { n: "SQLite", p: ["shoeadda", "youtube"] }
  ]},
  { group: "Tools & Workflow", icon: "tool", items: [
    { n: "Git", p: [], b: "Practice" },
    { n: "VS Code", p: [], b: "Daily use" },
    { n: "pytest", p: ["noozaib", "goldai"] }
  ]}
];
