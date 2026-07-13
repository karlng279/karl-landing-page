import Hero from "@/components/Hero";
import Section from "@/components/Section";
import WorkCard from "@/components/WorkCard";
import WorkFlow from "@/components/WorkFlow";
import ProjectCard from "@/components/ProjectCard";
import FlagshipProject from "@/components/FlagshipProject";
import WritingList from "@/components/WritingList";
import Connect from "@/components/Connect";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://karl-nguyen.com";

// Structured data — makes Karl entity-discoverable to search + LLM crawlers.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Karl Nguyen",
  url: SITE_URL,
  image: `${SITE_URL}/images/og-default.png`,
  jobTitle: "Product Manager — Container Shipping & Logistics Systems",
  description:
    "Product Manager specialized in Container Shipping & Logistics Systems — Booking, SI/BL, and Shipment Visibility.",
  knowsAbout: [
    "Container Shipping",
    "Logistics Systems",
    "Shipping Documentation",
    "Shipment Visibility",
    "Product Management",
    "AI-Augmented Product Development",
  ],
  sameAs: ["https://www.linkedin.com/in/huynhnq94/"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Karl Nguyen",
  url: SITE_URL,
  author: { "@type": "Person", name: "Karl Nguyen" },
};

// Icons for What I Work On section
const ProductStrategyIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const TechnicalPMIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const AIBuilderIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

// Flagship — the shipped, inspectable artifact that demonstrates end-to-end PM work.
const flagshipProject = {
  badge: "Live · Open Source",
  title: "AI-Ready Product Workflow v2",
  context:
    "Product methodology lives in people's heads and scattered templates. AI agents have no structured methodology to work from, so their output is generic and untraceable.",
  description:
    "A four-framework knowledge base that gives AI agents methodology for every stage of product development — PM strategy, PO pipeline, design, and code — with a traceable artifact chain from strategy through to test cases.",
  impact: [
    "4 frameworks, 16 skills, 5 pipeline commands — installable in one command (npx)",
    "Covers the full arc: strategy & OKRs → discovery (OST/JTBD) → PRD → story map → acceptance criteria → UAT → wireframes → component specs → code",
    "Agent-agnostic: works with Claude Code, Codex, Gemini, and Cursor",
    "Every artifact traceable end-to-end: PM-STRATEGY → PRD-XXX → USM-XXX → ST-XXX → AC-XXX → TC-XXX → WF-XXX → COMP-XXX",
  ],
  pipeline: ["PM Strategy", "PO Pipeline", "Design", "Code", "Validate"],
  links: [
    {
      label: "View live",
      href: "https://karlng279.github.io/ai-ready-product-workflow-v2/",
      primary: true,
    },
    {
      label: "View on GitHub",
      href: "https://github.com/karlng279/ai-ready-product-workflow-v2",
    },
  ],
};

// Enterprise Projects (carrier-side, on-message — main grid)
const enterpriseProjects = [
  {
    title: "Express Booking Flow (Container Shipments)",
    context:
      "Traditional booking flows are complex and require excessive upfront input, creating friction and drop-offs.",
    description:
      "Designed a simplified, guided booking experience with reduced input complexity and improved workflow structure.",
    impact: [
      "Increased booking auto-confirmation conversion by ~20%",
      "Reduced user friction and time-to-book",
      "Improved usability across user segments",
    ],
    isEnterprise: true,
  },
  {
    title: "End-to-End Shipment Overview Dashboard",
    context:
      "Shipment data was fragmented across booking, documentation, and tracking systems, forcing users to navigate multiple interfaces.",
    description:
      "Built a centralized dashboard consolidating shipment status, milestones, and document visibility into a single interface.",
    impact: [
      "Drove ~30% adoption increase following platform UX redesign",
      "Reduced manual checks and email coordination by ~40% through system integration",
      "Enabled real-time shipment visibility and self-service",
    ],
    isEnterprise: true,
  },
];

// Shipping / compliance-domain product work — main grid
const vxProjects = [
  {
    title: "Document Management System (Shipping)",
    link: "https://vxsolutions.tech/showcases/container-shipping/document-management-system",
    context:
      "Critical shipment documents are scattered across emails, PDFs, and shared folders.",
    description:
      "Built a centralized document system with structured metadata, search, and access control.",
    impact: [
      "Cut document retrieval from a multi-hour email and folder hunt to a single keyword search",
      "Improved visibility and collaboration across teams",
      "Reduced risk of missed renewals and compliance gaps",
    ],
  },
  {
    title: "Smart Compliance Hub",
    context:
      "Compliance requirements are fragmented across shipment lifecycle and difficult to track.",
    description:
      "Designed a rule-driven system mapping compliance requirements, document templates, and workflows.",
    impact: [
      "Reduced errors from missing compliance steps",
      "Made regulatory requirements structured and searchable",
      "Enabled foundation for AI-assisted compliance guidance",
    ],
  },
];

// Side Projects — secondary SME/eCommerce work, kept but visually subordinate.
const sideProjects = [
  {
    title: "Smart Profit & Expense Tracker",
    link: "https://vxsolutions.tech/showcases/container-e-commerce/smart-profit-expense-tracker",
    description:
      "Cost, margin, and financial-performance tracking that gives eCommerce sellers visibility into true profitability beyond revenue.",
  },
  {
    title: "Smart Inventory Management",
    link: "https://vxsolutions.tech/showcases/container-e-commerce/smart-inventory-management",
    description:
      "A unified inventory system with alerts, tracking, and replenishment logic to reduce overselling and stock emergencies.",
  },
];

// Skills data
const skillsData = {
  productDelivery: [
    "Value creation",
    "Product discovery",
    "Backlog management",
    "Roadmapping",
    "Discovery frameworks",
    "Stakeholder alignment",
  ],
  designCollaboration: [
    "Wireframes",
    "Journey maps",
    "Service blueprints",
    "UX collaboration",
    "Domain expertise integration",
  ],
  technical: [
    "API design discussions",
    "Data modeling",
    "Prototype building",
    "Production data analysis",
    "Engineering collaboration",
  ],
};

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <JsonLd data={personJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <Header />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <Hero />

      {/* My Domain Expertise Section */}
      <Section
        id="domain"
        title="My Domain Expertise"
        subtitle="I can talk both languages — carrier rules and shipping docs, or services, APIs, and data models"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Container Shipping */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Container Shipping
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Container Booking Systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Shipping Documentation (SI, BL, VGM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Shipment Tracking & Visibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>eCommerce Platforms for Carriers</span>
                </li>
              </ul>
            </div>

            {/* Applied Product Domains */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Applied Product Domains
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Logistics Documentation & Compliance Systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Inventory & Operations Management</span>
                </li>
              </ul>
            </div>
          </div>

          {/* VX Solutions Note */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-200/50 dark:border-primary-700/30">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                <svg
                  className="w-5 h-5 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  Currently Building
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Tools that let forwarders, local offices, and small shippers get answers about
                  their cargo without an email thread — structured data and rule-based systems as
                  the foundation for practical AI use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* What I Work On Section */}
      <Section
        id="work"
        title="What I Work On"
        subtitle="I sit in the middle of product strategy, technical implementation, and AI-augmented workflows"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <WorkCard
            icon={<ProductStrategyIcon />}
            title="Product Strategy & Execution"
            description="Define product direction from problem framing to delivery, balancing immediate outcomes with long-term platform scalability."
            items={[
              "Frame problems clearly before jumping to solutions",
              "Balance short-term delivery with long-term platform health",
              "Obsess over end-to-end journeys: booking → documentation → execution",
            ]}
          />
          <WorkCard
            icon={<TechnicalPMIcon />}
            title="Technical Product Management"
            description="Design workflows across booking, documentation, and tracking. Define system logic, validation rules, and data structures to support real-world operations."
            items={[
              "Think in architecture, APIs, data flows, and trade-offs",
              "Define validation rules and system logic grounded in domain knowledge",
              "Bridge the gap between business needs and technical reality",
            ]}
          />
          <WorkCard
            icon={<AIBuilderIcon />}
            title="AI-Augmented Product Thinking"
            description="Apply structured data and rule-based systems as a foundation for practical AI use cases — including compliance guidance, document validation, and workflow automation."
            items={[
              "Build rule catalogs and structured data as AI foundations",
              "Apply AI to compliance checks, document validation, and query answering",
              "Use AI daily for research, prototyping, and validation",
            ]}
          />
        </div>
      </Section>

      {/* Product Work Section */}
      <Section
        id="product-work"
        title="Product Work"
        subtitle="Enterprise-scale product work at a global ocean carrier, plus systems I've shipped end-to-end across shipping and logistics."
        className="bg-slate-50/50 dark:bg-slate-900/30"
      >
        {/* Flagship — most prominent */}
        <FlagshipProject
          badge={flagshipProject.badge}
          title={flagshipProject.title}
          context={flagshipProject.context}
          description={flagshipProject.description}
          impact={flagshipProject.impact}
          pipeline={flagshipProject.pipeline}
          links={flagshipProject.links}
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {enterpriseProjects.map((project, index) => (
            <ProjectCard
              key={`enterprise-${index}`}
              title={project.title}
              context={project.context}
              description={project.description}
              impact={project.impact}
              isEnterprise={project.isEnterprise}
            />
          ))}
          {vxProjects.map((project, index) => (
            <ProjectCard
              key={`vx-${index}`}
              title={project.title}
              context={project.context}
              description={project.description}
              impact={project.impact}
              link={project.link}
            />
          ))}
        </div>

        {/* Side Projects — secondary strip */}
        <div className="max-w-5xl mx-auto mt-12">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center mb-5">
            Side Projects
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {sideProjects.map((project, index) => (
              <a
                key={`side-${index}`}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — view case study`}
                className="group flex items-start justify-between gap-4 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 px-5 py-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                    {project.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {project.description}
                  </p>
                  <span className="inline-block mt-2 text-xs font-medium text-primary-600 dark:text-primary-400">
                    View case study →
                  </span>
                </div>
                <svg
                  className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5 group-hover:text-primary-500 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* Writing Section */}
      <Section
        id="writing"
        title="Writing"
        subtitle="Field notes from inside container-shipping product work."
      >
        <WritingList posts={recentPosts} />
      </Section>

      {/* How I Work Section */}
      <Section
        id="how-i-work"
        title="How I Work"
        subtitle="From strategy and discovery through to shipped features and monitored outcomes — with AI compressing the busywork at every stage."
        className="bg-slate-50/50 dark:bg-slate-900/30"
      >
        <WorkFlow />
      </Section>

      {/* Tools & Skills Section */}
      <Section
        id="tools"
        title="Tools & Comfort Zone"
        subtitle="Where I feel most comfortable operating"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Product & Delivery */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  Product & Delivery
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.productDelivery.map((skill, index) => (
                  <span key={index} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Design Collaboration */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-accent-600 dark:text-accent-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  Design Collaboration
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.designCollaboration.map((skill, index) => (
                  <span key={index} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  Technical
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.technical.map((skill, index) => (
                  <span key={index} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Note about hands-on */}
          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            I build my own prototypes (scripts, demo apps) and query production-like data to
            uncover insights. Enough hands-on to collaborate effectively with engineers without
            doing full implementation work.
          </p>
        </div>
      </Section>

      {/* Connect Section (Footer) */}
      <Connect />
    </main>
    </>
  );
}
