import { z } from "zod";

// Personal Details Schema
export const personalDetailsSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  title: z.string().min(1, "Title is required"),
  tagline: z.string(),
  bio: z.string(),
  avatar: z.string().nullable().optional(),
  location: z.string(),
  email: z.string().email("Invalid email address"),
  phone: z.string().nullable().optional(),
  availableForHire: z.boolean(),
  showEmail: z.boolean(),
  showPhone: z.boolean(),
});

export type PersonalDetailsInput = z.infer<typeof personalDetailsSchema>;

// Site Details Schema
export const siteDetailsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  siteTagline: z.string(),
  siteDescription: z.string(),
  logo: z.string().nullable().optional(),
  favicon: z.string().nullable().optional(),
  ogImage: z.string().nullable().optional(),
  language: z.string(),
  timezone: z.string(),
  dateFormat: z.string(),
  googleAnalyticsId: z.string().nullable().optional(),
  googleSiteVerification: z.string().nullable().optional(),
});

export type SiteDetailsInput = z.infer<typeof siteDetailsSchema>;

// Social Links Schema
export const socialLinksSchema = z.object({
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  dribbble: z.string().optional(),
  behance: z.string().optional(),
  codepen: z.string().optional(),
  medium: z.string().optional(),
  devto: z.string().optional(),
  hashnode: z.string().optional(),
  stackoverflow: z.string().optional(),
  discord: z.string().optional(),
  telegram: z.string().optional(),
  whatsapp: z.string().optional(),
  website: z.string().optional(),
});

export type SocialLinksInput = z.infer<typeof socialLinksSchema>;

// Portfolio Settings Schema
export const portfolioSettingsSchema = z.object({
  projectsPerPage: z.number().min(1).max(50),
  featuredProjectsCount: z.number().min(1).max(10),
  showProjectViews: z.boolean(),
  showTechStack: z.boolean(),
  enableProjectFiltering: z.boolean(),
  enableProjectSearch: z.boolean(),
  defaultProjectSort: z.enum(["order", "newest", "oldest", "views"]),
  showGithubLink: z.boolean(),
  showDemoLink: z.boolean(),
  projectCardStyle: z.enum(["minimal", "modern", "detailed"]),
});

export type PortfolioSettingsInput = z.infer<typeof portfolioSettingsSchema>;

// Blog Settings Schema
export const blogSettingsSchema = z.object({
  postsPerPage: z.number().min(1).max(50),
  featuredPostsCount: z.number().min(1).max(10),
  showReadingTime: z.boolean(),
  showViews: z.boolean(),
  showTableOfContents: z.boolean(),
  enableComments: z.boolean(),
  commentSystem: z.enum(["none", "giscus", "utterances", "disqus"]),
  enableNewsletter: z.boolean(),
  newsletterProvider: z.enum([
    "none",
    "mailchimp",
    "convertkit",
    "buttondown",
    "substack",
  ]),
  enableRss: z.boolean(),
  enableSearch: z.boolean(),
  showRelatedPosts: z.boolean(),
  relatedPostsCount: z.number().min(1).max(10),
  showShareButtons: z.boolean(),
  showCategories: z.boolean(),
  showTags: z.boolean(),
});

export type BlogSettingsInput = z.infer<typeof blogSettingsSchema>;

// Resume Settings Schema
export const resumeSettingsSchema = z.object({
  resumeUrl: z.string().nullable().optional(),
  showDownloadButton: z.boolean(),
});

export type ResumeSettingsInput = z.infer<typeof resumeSettingsSchema>;

// Contact Settings Schema
export const contactSettingsSchema = z.object({
  enableContactForm: z.boolean(),
  contactEmail: z.string().email("Invalid email address"),
  enableSpamProtection: z.boolean(),
  officeAddress: z.string().nullable().optional(),
  workingHours: z.string(),
  responseTime: z.string(),
});

export type ContactSettingsInput = z.infer<typeof contactSettingsSchema>;

// SEO Settings Schema
export const seoSettingsSchema = z.object({
  defaultMetaTitle: z
    .string()
    .max(60, "Meta title should be under 60 characters"),
  defaultMetaDescription: z
    .string()
    .max(160, "Meta description should be under 160 characters"),
  defaultKeywords: z.string(),
  enableSitemap: z.boolean(),
  enableRobotsTxt: z.boolean(),
  canonicalUrl: z.string().optional(),
  twitterHandle: z.string().optional(),
  ogType: z.enum(["website", "profile", "article"]),
});

export type SeoSettingsInput = z.infer<typeof seoSettingsSchema>;

// Combined Settings Schema for full update
export const allSettingsSchema = z.object({
  personal: personalDetailsSchema.optional(),
  site: siteDetailsSchema.optional(),
  social: socialLinksSchema.optional(),
  portfolio: portfolioSettingsSchema.optional(),
  blog: blogSettingsSchema.optional(),
  resume: resumeSettingsSchema.optional(),
  contact: contactSettingsSchema.optional(),
  seo: seoSettingsSchema.optional(),
});

export type AllSettingsInput = z.infer<typeof allSettingsSchema>;
