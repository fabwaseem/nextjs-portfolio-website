-- CreateTable
CREATE TABLE "personal_details" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "fullName" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "tagline" TEXT NOT NULL DEFAULT '',
    "bio" TEXT NOT NULL DEFAULT '',
    "avatar" TEXT,
    "location" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT,
    "availableForHire" BOOLEAN NOT NULL DEFAULT false,
    "showEmail" BOOLEAN NOT NULL DEFAULT true,
    "showPhone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personal_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_details" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "siteName" TEXT NOT NULL DEFAULT '',
    "siteTagline" TEXT NOT NULL DEFAULT '',
    "siteDescription" TEXT NOT NULL DEFAULT '',
    "logo" TEXT,
    "favicon" TEXT,
    "ogImage" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "dateFormat" TEXT NOT NULL DEFAULT 'MMM DD, YYYY',
    "googleAnalyticsId" TEXT,
    "googleSiteVerification" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_links" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "github" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "youtube" TEXT,
    "dribbble" TEXT,
    "behance" TEXT,
    "codepen" TEXT,
    "medium" TEXT,
    "devto" TEXT,
    "hashnode" TEXT,
    "stackoverflow" TEXT,
    "discord" TEXT,
    "telegram" TEXT,
    "whatsapp" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "projectsPerPage" INTEGER NOT NULL DEFAULT 9,
    "featuredProjectsCount" INTEGER NOT NULL DEFAULT 3,
    "showProjectViews" BOOLEAN NOT NULL DEFAULT true,
    "showTechStack" BOOLEAN NOT NULL DEFAULT true,
    "enableProjectFiltering" BOOLEAN NOT NULL DEFAULT true,
    "enableProjectSearch" BOOLEAN NOT NULL DEFAULT true,
    "defaultProjectSort" TEXT NOT NULL DEFAULT 'order',
    "showGithubLink" BOOLEAN NOT NULL DEFAULT true,
    "showDemoLink" BOOLEAN NOT NULL DEFAULT true,
    "projectCardStyle" TEXT NOT NULL DEFAULT 'modern',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolio_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "postsPerPage" INTEGER NOT NULL DEFAULT 10,
    "featuredPostsCount" INTEGER NOT NULL DEFAULT 3,
    "showReadingTime" BOOLEAN NOT NULL DEFAULT true,
    "showViews" BOOLEAN NOT NULL DEFAULT true,
    "showTableOfContents" BOOLEAN NOT NULL DEFAULT true,
    "enableComments" BOOLEAN NOT NULL DEFAULT false,
    "commentSystem" TEXT NOT NULL DEFAULT 'none',
    "enableNewsletter" BOOLEAN NOT NULL DEFAULT false,
    "newsletterProvider" TEXT NOT NULL DEFAULT 'none',
    "enableRss" BOOLEAN NOT NULL DEFAULT true,
    "enableSearch" BOOLEAN NOT NULL DEFAULT true,
    "showRelatedPosts" BOOLEAN NOT NULL DEFAULT true,
    "relatedPostsCount" INTEGER NOT NULL DEFAULT 3,
    "showShareButtons" BOOLEAN NOT NULL DEFAULT true,
    "showCategories" BOOLEAN NOT NULL DEFAULT true,
    "showTags" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resume_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "resumeUrl" TEXT,
    "showDownloadButton" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resume_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "enableContactForm" BOOLEAN NOT NULL DEFAULT true,
    "contactEmail" TEXT NOT NULL DEFAULT '',
    "enableSpamProtection" BOOLEAN NOT NULL DEFAULT true,
    "officeAddress" TEXT,
    "workingHours" TEXT NOT NULL DEFAULT 'Mon - Fri, 9:00 AM - 6:00 PM',
    "responseTime" TEXT NOT NULL DEFAULT '24 hours',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seo_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "defaultMetaTitle" TEXT NOT NULL DEFAULT '',
    "defaultMetaDescription" TEXT NOT NULL DEFAULT '',
    "defaultKeywords" TEXT NOT NULL DEFAULT '',
    "enableSitemap" BOOLEAN NOT NULL DEFAULT true,
    "enableRobotsTxt" BOOLEAN NOT NULL DEFAULT true,
    "canonicalUrl" TEXT,
    "twitterHandle" TEXT,
    "ogType" TEXT NOT NULL DEFAULT 'website',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seo_settings_pkey" PRIMARY KEY ("id")
);
