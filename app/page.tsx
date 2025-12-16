import Hero from "@/components/Hero";
import Section from "@/components/Section";
import WorkCard from "@/components/WorkCard";
import WorkFlow from "@/components/WorkFlow";
import ProjectCard from "@/components/ProjectCard";
import Connect from "@/components/Connect";

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

// VX Solutions Projects
const vxProjects = [
  {
    title: "Document Management System for Shipping Documents",
    link: "https://vxsolutions.tech/showcases/container-shipping/document-management-system",
    context:
      "Freight and logistics companies still rely heavily on scattered PDFs, email attachments, and shared folders for critical documents.",
    description:
      "Defined a cloud-based document system tailored to logistics workflows. Identified the most painful steps in finding, sharing, and keeping documents compliant. Designed features like expiring document alerts, structured metadata, role-based access, and integration points.",
    impact: [
      "Key shipment documents became searchable and shareable in seconds",
      "Reduced risk of missed renewals",
      "Foundation for AI-powered document recognition & search",
    ],
  },
  {
    title: "Smart Compliance Hub",
    context:
      "Exporters, forwarders, and logistics teams face a growing web of regulations, document rules, and carrier-specific requirements.",
    description:
      "Defined the vision for a central rule and compliance repository. Mapped compliance touchpoints across the shipment lifecycle. Designed rule catalogs, document templates, guided workflows, and future AI validation points.",
    impact: [
      "Reduced human error from missing compliance steps",
      "Made rules discoverable and maintainable",
      'Foundation for AI-assisted "What do I need for this shipment?" queries',
    ],
  },
  {
    title: "Smart Profit & Expense Tracker",
    link: "https://vxsolutions.tech/showcases/container-e-commerce/smart-profit-expense-tracker",
    context:
      "Many eCommerce sellers only see revenue — not true profit after ads, supplier cost, and shipping fees.",
    description:
      "Designed a profitability dashboard focused on net margins, not vanity metrics. Defined logic for expense categorization, multi-channel cost inputs, and tax summaries. Built visual insights and simple onboarding for non-technical sellers.",
    impact: [
      "Helped sellers track real profit, not just top-line revenue",
      "Reduced reliance on tangled spreadsheets",
      "Space for future AI-driven margin optimization insights",
    ],
  },
  {
    title: "Smart Inventory Management",
    link: "https://vxsolutions.tech/showcases/container-e-commerce/smart-inventory-management",
    context:
      "Growing sellers struggle with overselling, stockouts, and manual inventory reconciliation across marketplaces.",
    description:
      "Defined a unified inventory health dashboard across warehouses and channels. Designed logic for automated reordering, batch tracking, and anomaly detection. Created alerting and reporting tools for low stock, excess inventory, and fast movers.",
    impact: [
      "Reduced overselling risk and stock emergencies",
      "Improved planning with demand-aware replenishment",
      "Real-time operational picture of inventory",
    ],
  },
];

// Enterprise Projects
const enterpriseProjects = [
  {
    title: "Express Booking Flow for Container Shipments",
    context:
      "The online booking journey was powerful but overwhelming — especially for smaller shippers and time-pressed users.",
    description:
      "Designed a simplified express booking flow for repeat shipments. Defined intelligent defaults, validation rules, and field reductions. Clarified MVP scope & guardrails with business stakeholders.",
    impact: [
      "Faster, less error-prone bookings",
      "Higher adoption of self-service vs. email",
      "Reusable UX/logic pattern for other workflows",
    ],
    isEnterprise: true,
  },
  {
    title: "End-to-End Shipment Overview Dashboard",
    context:
      'Users needed a clear place to answer: "What\'s happening with my shipment right now, and what happens next?"',
    description:
      "Defined a consolidated shipment overview with booking, documents, and tracking milestones. Prioritized which events & data matter for different user types. Designed the timeline, filters, and summary cards with UX + engineering.",
    impact: [
      "24/7 self-service visibility",
      "Reduced status inquiry emails",
      "Scalable timeline model for future features",
    ],
    isEnterprise: true,
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
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* What I Work On Section */}
      <Section
        id="work"
        title="What I Work On"
        subtitle="I sit in the middle of product strategy, technical implementation, and AI-augmented workflows"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <WorkCard
            icon={<ProductStrategyIcon />}
            title="Product Strategy & Discovery"
            description="Turn vague goals into clear problem statements using structured frameworks."
            items={[
              'Transform "improve customer self-service" into actionable problems',
              "Use Opportunity Solution Trees, Lean Canvas, structured interviews",
              "Obsess over end-to-end journeys: booking → documentation → execution",
            ]}
          />
          <WorkCard
            icon={<TechnicalPMIcon />}
            title="Technical Product Management"
            description="Translate constraints between engineers and business stakeholders."
            items={[
              "Think in architecture, APIs, data flows, and trade-offs",
              "Keep decisions grounded in constraints, risks, and lifecycle cost",
              "Bridge the gap between business needs and technical reality",
            ]}
          />
          <WorkCard
            icon={<AIBuilderIcon />}
            title="AI-Augmented Product Builder"
            description="Treat AI as infrastructure for workflows, not a buzzword."
            items={[
              "Work on RAG-style assistants and internal research agents",
              "Build tools that reduce repetitive PM/ops work",
              "Use AI daily for research, prototyping, and validation",
            ]}
          />
        </div>
      </Section>

      {/* How I Work Section */}
      <Section
        id="how-i-work"
        title="How I Work"
        subtitle="A consistent flow from idea → shipped feature → monitored outcome, with AI assisting at every step"
        className="bg-slate-50/50 dark:bg-slate-900/30"
      >
        <WorkFlow />
      </Section>

      {/* Domain Expertise Section */}
      <Section
        id="domain"
        title="My Domain: Shipping, Logistics & eCommerce"
        subtitle="I can talk both languages — carrier rules and HS codes, or services, APIs, and data models"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Operations Side */}
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
                  Operations & Logistics
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Ocean shipping & documentation workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Booking flows, SI, BL/VGM/manifest, compliance checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Carrier rules, HS codes, cut-off times, local office constraints</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Operations dashboards & self-service tools</span>
                </li>
              </ul>
            </div>

            {/* Technical Side */}
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
                  Technical & Product
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Services, APIs, UX patterns, data models</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Technical feasibility & trade-off analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>SMB logistics & eCommerce digitization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Cross-border flows & inventory systems</span>
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
                  Currently at VX Solutions
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Helping smaller businesses in Vietnam digitize exports, inventory, and
                  cross-border flows. Building tools that enable local offices, forwarders, and
                  small shippers to get answers without email chaos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* VX Solutions Projects Section */}
      <Section
        id="vx-projects"
        title="Product Work at VX Solutions"
        subtitle="Public-facing projects focusing on problems, product decisions, and outcomes"
        className="bg-slate-50/50 dark:bg-slate-900/30"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {vxProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              context={project.context}
              description={project.description}
              impact={project.impact}
              link={project.link}
            />
          ))}
        </div>
      </Section>

      {/* Enterprise Work Section */}
      <Section
        id="enterprise-work"
        title="Enterprise Product Work"
        subtitle="High-level descriptions from work on a global ocean carrier eCommerce platform"
      >
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {enterpriseProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              context={project.context}
              description={project.description}
              impact={project.impact}
              isEnterprise={project.isEnterprise}
            />
          ))}
        </div>
      </Section>

      {/* Tools & Skills Section */}
      <Section
        id="tools"
        title="Tools & Comfort Zone"
        subtitle="Where I feel most comfortable operating"
        className="bg-slate-50/50 dark:bg-slate-900/30"
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
  );
}

