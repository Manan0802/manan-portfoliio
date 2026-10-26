// Copy for the /services page. Every proof line is real (see docs/audit/2026-10-26/).
// Prices are owner-approved "from" anchors (benchmark.md §4–5, Oct 2026).

export interface Offer {
  id: string;
  name: string;
  forWho: string;
  timeline: string;
  price: string;
  priceNote?: string;
  includes: string[];
  notIncluded?: string;
  cta: string;
  highlight?: boolean;
}

export const servicesHero = {
  eyebrow: 'Freelance AI engineering',
  title: 'AI assistants and automations that take repetitive work off your team.',
  subtitle:
    'I’m Manan, an AI engineer. By day I build a production AI assistant at a fintech startup; alongside it I take one or two fixed-scope projects at a time.',
  capacity: 'Part-time · 1–2 projects at a time · reply within 1 business day (IST)',
};

// Same verified figures as the home page.
export const proofFigures = [
  { value: '68% → 96%', label: 'Intent accuracy on a frozen, blind test set' },
  { value: '3–8 → 1–2', label: 'Model calls per reply' },
  { value: '15 → 0', label: 'Off-topic answers in live safety tests' },
  { value: '254', label: 'Tests on in-chat money actions' },
];
export const proofNote = 'From a Hinglish AI assistant I work on, in production at a fintech startup in India.';

export const offers: Offer[] = [
  {
    id: 'scoping',
    name: 'Scoping Sprint',
    forWho: 'You know something should be automated, but not exactly what to build.',
    timeline: '3–5 working days',
    price: '$400–600',
    priceNote: 'credited to the build if you go ahead',
    includes: [
      'A call, then a written scope',
      'An architecture sketch and the tools it needs',
      'A success metric and a test plan',
      'A fixed quote for the build',
    ],
    cta: 'Book a scoping sprint',
  },
  {
    id: 'workflow',
    name: 'Automate One Workflow',
    forWho: 'One repetitive task: inbox triage, lead routing, document extraction, an FAQ or WhatsApp bot.',
    timeline: '1–2 weeks',
    price: 'from $1,200',
    includes: [
      'The automation, in n8n or code',
      '1–2 integrations (Sheets, CRM, Slack, Gmail, WhatsApp…)',
      'Error handling and logs',
      'Handover doc and walkthrough, plus a 14-day fix window',
    ],
    notIncluded: 'Custom dashboards or many integrations',
    cta: 'Start with one workflow',
  },
  {
    id: 'assistant',
    name: 'Custom AI Assistant / RAG Agent',
    forWho: 'An assistant that answers from your documents and data, or an agent that uses your tools.',
    timeline: '3–5 weeks',
    price: 'from $3,500',
    includes: [
      'A retrieval (RAG) or tool-calling agent',
      'A 50+ case test set with pass marks agreed up front',
      'A cost and latency report',
      '2–3 integrations, handover walkthrough, 14-day fix window',
    ],
    notIncluded: 'Model fine-tuning, voice',
    cta: 'Scope my assistant',
    highlight: true,
  },
  {
    id: 'production',
    name: 'Production-Grade Agent',
    forWho: 'Customer-facing assistants, or anything that touches money or personal data.',
    timeline: '6–8 weeks',
    price: 'from $8,000',
    includes: [
      'Everything in the Custom Assistant',
      'A safety layer: PII masking, guardrails, off-topic handling',
      'Staged rollout (shadow mode or A/B) with monitoring and cost tracking',
      'Consent and OTP steps for sensitive actions, where needed',
    ],
    notIncluded: 'Compliance certification (SOC 2, HIPAA)',
    cta: 'Discuss a production rollout',
  },
];

export const carePlan = {
  name: 'Care plan',
  price: '$300–800 / month',
  description: 'Async bug fixes, prompt and test-set tuning, and small changes after launch. No SLA.',
};

export const alsoAvailable = {
  title: 'Also available',
  items: [
    'Websites, including 3D and animated ones like this site',
    'Technical SEO and content structure',
    'API and CRM integrations',
    'Full-stack web apps with AI features',
  ],
  proof: 'Recent: a 143-page website for a Delhi B2B manufacturer with a clean technical-SEO audit; its search terms grew from 62 to 184 in the 28 days after relaunch.',
  note: 'Quoted per project.',
};

export const everyBuildIncludes = [
  'A test set and a pass mark we agree before I build',
  'Real cost and latency numbers, not guesses',
  'Your accounts and API keys; you own the code on final payment',
  'Handover docs and a walkthrough call',
];

export const process = [
  { step: 'Scope', detail: 'You send example inputs, the tools you use and what “good” looks like. I reply with a written scope and a fixed quote.' },
  { step: 'Agree the test set', detail: 'We pick 50+ real examples and a pass mark before any build work starts.' },
  { step: 'Build', detail: 'Weekly demos and a short written update, so there are no surprises.' },
  { step: 'Handover', detail: 'Docs, a walkthrough on your own accounts, and a 14-day window to fix anything inside the agreed scope.' },
];

export const dataHandling = [
  'I work in your accounts with your API keys; your data stays in your environment wherever possible.',
  'I never use client data to train or fine-tune a model.',
  'Personal data (names, phone numbers, account numbers) is masked in logs and test sets. I’ve built PII masking for a production assistant.',
  'I’m happy to sign an NDA before seeing production data, and I never reuse one client’s code or data for another.',
  'I don’t name clients without written permission. Nothing from my day job is reused in client work.',
];

export const limits = [
  '24/7 on-call or uptime SLAs',
  'Compliance certification (SOC 2, HIPAA)',
  'Training large models from scratch',
  'Projects that need more than about 15 hours a week from me',
];

export const faqs = [
  {
    q: 'What do you need from me to start?',
    a: 'A short description of the task, 10–20 real examples of the inputs, the tools you already use, and what a good result looks like. That is enough for a scope and a quote.',
  },
  {
    q: 'How long does it take, and how much does it cost?',
    a: 'One workflow usually takes 1–2 weeks from $1,200; a custom assistant 3–5 weeks from $3,500; a production-grade agent 6–8 weeks from $8,000. You get a fixed quote after scoping, paid in milestones (for example 40% / 30% / 30%).',
  },
  {
    q: 'Who owns the code?',
    a: 'You do, once the final payment is made. Everything runs on your accounts, and you get the repository and the docs.',
  },
  {
    q: 'What if the AI gets something wrong?',
    a: 'That is why every build starts with an agreed test set and a pass mark. Sensitive actions get guardrails and, where needed, a human approval step, and you see the failure cases before launch.',
  },
  {
    q: 'Can you work with my existing codebase or tools?',
    a: 'Yes. I can add AI features, retrieval or automations to an existing app, or connect tools you already use through their APIs or n8n.',
  },
  {
    q: 'How do you fit client work around a full-time job?',
    a: 'I work on client projects part-time, about 10–15 hours a week, so I take one or two at a time. I reply to email within one business day (IST) and demo progress every week.',
  },
  {
    q: 'Which time zones do you work with?',
    a: 'India, UK and US clients. IST evenings overlap with UK afternoons and US mornings, which is when calls work best.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every build has a 14-day fix window for anything inside the agreed scope. After that, an optional care plan covers fixes and small changes.',
  },
];

export const servicesCta = {
  title: 'Have a task you’d like off your plate?',
  body: 'Email me one task you’d like automated. Within one business day I’ll reply with whether I can help and what a first version would look like.',
  email: '04manank@gmail.com',
};
