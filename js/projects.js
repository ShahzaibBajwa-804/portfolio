/* Content data: projects + skills. No invented metrics, users or revenue.
   All projects are my own AI-assisted development (Claude Code): I direct the work, review the code and test it. */
window.PROJECTS = [
  {
    id: "noozaib", name: "Noozaib Fragrances", category: "E-commerce / Full-Stack Development",
    kind: "AI-assisted full-stack project", accent: "#5b8cff",
    summary: "A fragrance e-commerce platform for the Pakistani market with storefront, accounts and an admin area.",
    description: "Noozaib Fragrances is a Flask web application covering the purchase journey: a categorised catalog, local or Google sign-in, cart, checkout and order tracking, with admin tools for products, orders, coupons and reviews. I developed it with AI assistance and spent significant effort on security hardening and automated tests.",
    features: [
      "Product catalog and categories",
      "Accounts with local and Google sign-in",
      "Shopping cart and checkout",
      "Admin area: products, orders, coupons, reviews",
      "Discount and coupon functionality",
      "Input validation, rate limiting and session invalidation",
      "Automated test suite (pytest)",
      "Database migrations (Alembic)"
    ],
    stack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "JavaScript", "HTML", "CSS"],
    note: "Developed with AI assistance (Claude Code)."
  },
  {
    id: "shoeadda", name: "ShoeAdda", category: "E-commerce / Web Development",
    kind: "AI-assisted web project (in progress)", accent: "#8b5cf6",
    summary: "An online footwear store concept focused on the Pakistani market.",
    description: "ShoeAdda is built around how people in Pakistan shop online: browse shoes by category and size, then order via WhatsApp with Cash on Delivery. The Flask backend uses SQLAlchemy models for catalog, orders, reviews and users. The project is still in development.",
    features: [
      "Product catalog with categories and sizes",
      "User accounts and login",
      "Reviews and contact form",
      "WhatsApp ordering workflow",
      "Cash on Delivery orders",
      "Database migrations (Alembic)"
    ],
    stack: ["Python", "Flask", "SQLAlchemy", "SQLite", "JavaScript", "HTML", "CSS"],
    note: "In development. Built with AI assistance (Claude Code)."
  },
  {
    id: "goldai", name: "GoldAI_Bot", category: "Python / AI / Trading Research",
    kind: "Personal research project", accent: "#e0b84f",
    summary: "A Python gold-market analysis and decision-support experiment using MT5 data and paper trading.",
    description: "GoldAI_Bot reads market data from MetaTrader 5, analyses it and feeds a decision engine that records paper-trade outcomes and validates them against history. It is a learning project built with AI assistance.",
    features: [
      "Python-based architecture",
      "MetaTrader 5 data integration",
      "Market analysis and decision engine",
      "Trade logging and paper outcome tracking",
      "Historical validation"
    ],
    stack: ["Python", "pandas", "MetaTrader 5"],
    note: "Research and education only. It does not execute live trades and makes no claim of profit. Built with AI assistance."
  },
  {
    id: "youtube", name: "YouTube Agent", category: "AI Automation / Personal Project",
    kind: "AI-assisted personal project", accent: "#34d3a5",
    summary: "A personal Flask dashboard for researching content niches and organising a content workflow.",
    description: "YouTube Agent is a personal tool that helps research content niches and organise the steps of a content pipeline. A Flask dashboard keeps everything in one place, with approval steps so a human stays in control. I built it with AI assistance (Claude Code).",
    features: [
      "Niche research workflow",
      "Content pipeline organisation",
      "Flask dashboard",
      "Database migrations",
      "Approval workflows"
    ],
    stack: ["Python", "Flask", "SQLite"],
    note: "A personal project for my own use, not a commercial product. Built with AI assistance."
  }
];

/* "p" lists project ids that use the skill; others are labelled by origin. */
window.SKILLS = [
  { group: "Programming Languages", icon: "code", items: [
    { n: "Python", p: ["noozaib", "shoeadda", "goldai", "youtube"] },
    { n: "JavaScript", p: ["noozaib", "shoeadda"] },
    { n: "HTML", p: ["noozaib", "shoeadda"] },
    { n: "CSS", p: ["noozaib", "shoeadda"] },
    { n: "Java", p: [], b: "Coursework" },
    { n: "C++", p: [], b: "Coursework" }
  ]},
  { group: "Core Concepts", icon: "layers", items: [
    { n: "Object-Oriented Programming", p: [], b: "Coursework" },
    { n: "Data Structures & Algorithms", p: [], b: "Coursework" },
    { n: "Database Management Systems", p: ["noozaib", "shoeadda"] },
    { n: "Operating Systems", p: [], b: "Coursework" },
    { n: "Software Design & Architecture", p: [], b: "Coursework" },
    { n: "Artificial Intelligence", p: [], b: "Coursework" }
  ]},
  { group: "Backend & Data", icon: "db", items: [
    { n: "Flask", p: ["noozaib", "shoeadda", "youtube"] },
    { n: "SQLAlchemy", p: ["noozaib", "shoeadda"] },
    { n: "PostgreSQL", p: ["noozaib"] },
    { n: "SQLite", p: ["shoeadda", "youtube"] }
  ]},
  { group: "Tools & Workflow", icon: "tool", items: [
    { n: "Git", p: [], b: "Practice" },
    { n: "VS Code", p: [], b: "Daily use" },
    { n: "Claude Code (AI-assisted development)", p: [], b: "Daily use" },
    { n: "pytest", p: ["noozaib"] }
  ]}
];
