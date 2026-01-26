/**
 * Blog generation prompt variations.
 * A random prompt is chosen each time to produce more varied AI output.
 */

export interface BlogPromptVariant {
  /** User prompt when a title is provided */
  withTitle: string;
  /** User prompt when no title is provided */
  noTitle: string;
}

const BLOG_PROMPT_VARIANTS: BlogPromptVariant[] = [
  {
    withTitle:
      'Generate a comprehensive blog post about: "{{title}}". You may refine the title for SEO if needed. Write in a warm, conversational tone. Give full context and complete, runnable code—no minimal snippets.',
    noTitle:
      "Generate a fresh blog post about web development—frontend, backend, or full-stack. Pick a topic developers would find genuinely useful. Write like a human sharing real experience. Include full context and complete, runnable code—no snippets or placeholders.",
  },
  {
    withTitle:
      'Write an in-depth technical post on: "{{title}}". Use a friendly, approachable voice. Explain the why, not just the how. Provide full, copy-pasteable code examples—nothing abbreviated.',
    noTitle:
      "Choose a Web3 or blockchain topic and write a thorough, practical post. Sound like a helpful teammate walking someone through it. Full context, full code—no shortcuts.",
  },
  {
    withTitle:
      'Create a detailed blog post about: "{{title}}". Adopt a slightly punchy, opinionated style where it fits. Always include complete code blocks readers can run—no \"... rest of code\" or minimal examples.',
    noTitle:
      "Pick a topic in AI, machine learning, or ML engineering—e.g. model training, LLMs, embeddings, or MLOps. Write a complete guide. Be conversational and occasionally opinionated. Full runnable code, full context—no summarising.",
  },
  {
    withTitle:
      'Draft a thorough blog post on: "{{title}}". Write as if you\'re mentoring a colleague—clear, patient, and practical. Every code example must be full and runnable.',
    noTitle:
      "Generate a tutorial about robotics, automation, or embedded systems. Something that would help devs or makers level up. Mentorship-style tone: clear, patient, practical. Complete code only—no snippets.",
  },
  {
    withTitle:
      'Compose a comprehensive article about: "{{title}}". Use a casual, blog-style voice. Cover the full story from setup to gotchas. All code must be complete and runnable—no placeholders.',
    noTitle:
      "Write a step-by-step web development tutorial—e.g. React, Next.js, Node, or a specific language like TypeScript, Python, or Rust. Casual, readable style. Tell the full story and include only complete, runnable code examples.",
  },
  {
    withTitle:
      'Produce an engaging blog post on: "{{title}}". Mix clarity with a bit of personality. Explain context and edge cases. Provide full code—every example complete and executable.',
    noTitle:
      "Choose a useful topic tied to a specific language: TypeScript, Python, Rust, Go, or Swift. Write an engaging post. Balance clarity with personality. Full context, full code—no abbreviated examples.",
  },
  {
    withTitle:
      'Write a detailed post about: "{{title}}". Sound like a senior dev sharing hard-won knowledge. Be direct and practical. All code blocks must be full, runnable, and well-commented.',
    noTitle:
      "Pick a topic in latest tech—edge computing, serverless, AR/VR, IoT, or similar. Write from a senior dev perspective: direct, practical, battle-tested. Full code only—no snippets.",
  },
  {
    withTitle:
      'Create an in-depth blog post on: "{{title}}". Use a thoughtful, reflective tone. Share real-world tradeoffs and alternatives. Include only complete, runnable code examples.',
    noTitle:
      "Generate a thoughtful post about Web3, smart contracts, or decentralized apps. Reflect on tradeoffs and real-world use. Conversational, substantive. Full code, full context—no minimal examples.",
  },
  {
    withTitle:
      'Draft a comprehensive article about: "{{title}}". Keep it accessible but technically solid. Walk readers through step-by-step. Every code example must be full and runnable.',
    noTitle:
      "Choose a web development tutorial topic—e.g. building an API, auth, databases, or deployment. Write a step-by-step guide. Accessible yet technically solid. Full context, full runnable code—no abbreviated snippets.",
  },
  {
    withTitle:
      'Produce a thorough blog post on: "{{title}}". Adopt a curious, exploratory tone. Cover both the obvious and the tricky bits. Provide complete, copy-paste-ready code throughout.',
    noTitle:
      "Write a post on AI, ML, web dev, or another tech area that explores both basics and nuances. Curious, exploratory tone. Complete runnable code only—no placeholders or snippets.",
  },
];

/**
 * Picks a random blog prompt variant and returns the appropriate user prompt.
 */
export function getRandomBlogPrompt(title?: string): string {
  const variant =
    BLOG_PROMPT_VARIANTS[
      Math.floor(Math.random() * BLOG_PROMPT_VARIANTS.length)
    ];
  if (title && title.trim()) {
    return variant.withTitle.replace(/\{\{title\}\}/g, title.trim());
  }
  return variant.noTitle;
}
