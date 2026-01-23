"use client";

import { useEffect } from "react";
import { ProtectedRoute } from "@/components/admin/protected-route";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Globe,
  Mail,
  Share2,
  FileText,
  Search,
  Save,
  Upload,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Code2,
  Briefcase,
  GraduationCap,
  MapPin,
  Zap,
  Download,
  RefreshCw,
  Rss,
  ExternalLink,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings, useUpdateSettings } from "@/hooks/use-settings";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  personalDetailsSchema,
  siteDetailsSchema,
  socialLinksSchema,
  portfolioSettingsSchema,
  blogSettingsSchema,
  resumeSettingsSchema,
  contactSettingsSchema,
  seoSettingsSchema,
  type PersonalDetailsInput,
  type SiteDetailsInput,
  type SocialLinksInput,
  type PortfolioSettingsInput,
  type BlogSettingsInput,
  type ResumeSettingsInput,
  type ContactSettingsInput,
  type SeoSettingsInput,
} from "@/lib/validations/settings";
import { ImageUpload } from "@/components/admin/image-upload";

export default function AdminSettingsPage() {
  const { data: settings, isLoading } = useSettings();

  const updatePersonal = useUpdateSettings<PersonalDetailsInput>("personal");
  const updateSite = useUpdateSettings<SiteDetailsInput>("site");
  const updateSocial = useUpdateSettings<SocialLinksInput>("social");
  const updatePortfolio =
    useUpdateSettings<PortfolioSettingsInput>("portfolio");
  const updateBlog = useUpdateSettings<BlogSettingsInput>("blog");
  const updateResume = useUpdateSettings<ResumeSettingsInput>("resume");
  const updateContact = useUpdateSettings<ContactSettingsInput>("contact");
  const updateSeo = useUpdateSettings<SeoSettingsInput>("seo");

  // Personal Details Form
  const personalForm = useForm<z.infer<typeof personalDetailsSchema>>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      fullName: "",
      title: "",
      tagline: "",
      bio: "",
      avatar: null,
      location: "",
      email: "",
      phone: null,
      availableForHire: false,
      showEmail: true,
      showPhone: false,
    },
  });

  // Site Details Form
  const siteForm = useForm<SiteDetailsInput>({
    resolver: zodResolver(siteDetailsSchema),
    defaultValues: {
      siteName: "",
      siteTagline: "",
      siteDescription: "",
      logo: null,
      favicon: null,
      ogImage: null,
      language: "en",
      timezone: "UTC",
      dateFormat: "MMM DD, YYYY",
      googleAnalyticsId: null,
      googleSiteVerification: null,
    },
  });

  // Social Links Form
  const socialForm = useForm<SocialLinksInput>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      github: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      youtube: "",
      dribbble: "",
      behance: "",
      codepen: "",
      medium: "",
      devto: "",
      hashnode: "",
      stackoverflow: "",
      discord: "",
      telegram: "",
      whatsapp: "",
      website: "",
    },
  });

  // Portfolio Settings Form
  const portfolioForm = useForm<PortfolioSettingsInput>({
    resolver: zodResolver(portfolioSettingsSchema),
    defaultValues: {
      projectsPerPage: 9,
      featuredProjectsCount: 3,
      showProjectViews: true,
      showTechStack: true,
      enableProjectFiltering: true,
      enableProjectSearch: true,
      defaultProjectSort: "order",
      showGithubLink: true,
      showDemoLink: true,
      projectCardStyle: "modern",
    },
  });

  // Blog Settings Form
  const blogForm = useForm<BlogSettingsInput>({
    resolver: zodResolver(blogSettingsSchema),
    defaultValues: {
      postsPerPage: 10,
      featuredPostsCount: 3,
      showReadingTime: true,
      showViews: true,
      showTableOfContents: true,
      enableComments: false,
      commentSystem: "none",
      enableNewsletter: false,
      newsletterProvider: "none",
      enableRss: true,
      enableSearch: true,
      showRelatedPosts: true,
      relatedPostsCount: 3,
      showShareButtons: true,
      showCategories: true,
      showTags: true,
    },
  });

  // Resume Settings Form
  const resumeForm = useForm<ResumeSettingsInput>({
    resolver: zodResolver(resumeSettingsSchema),
    defaultValues: {
      resumeUrl: null,
      showDownloadButton: true,
    },
  });

  // Contact Settings Form
  const contactForm = useForm<ContactSettingsInput>({
    resolver: zodResolver(contactSettingsSchema),
    defaultValues: {
      enableContactForm: true,
      contactEmail: "",
      enableSpamProtection: true,
      officeAddress: null,
      workingHours: "Mon - Fri, 9:00 AM - 6:00 PM",
      responseTime: "24 hours",
    },
  });

  // SEO Settings Form
  const seoForm = useForm<SeoSettingsInput>({
    resolver: zodResolver(seoSettingsSchema),
    defaultValues: {
      defaultMetaTitle: "",
      defaultMetaDescription: "",
      defaultKeywords: "",
      enableSitemap: true,
      enableRobotsTxt: true,
      canonicalUrl: "",
      twitterHandle: "",
      ogType: "website",
    },
  });

  // Populate forms when data loads
  useEffect(() => {
    if (settings) {
      personalForm.reset({
        fullName: settings.personal.fullName || "",
        title: settings.personal.title || "",
        tagline: settings.personal.tagline || "",
        bio: settings.personal.bio || "",
        avatar: settings.personal.avatar,
        location: settings.personal.location || "",
        email: settings.personal.email || "",
        phone: settings.personal.phone,
        availableForHire: settings.personal.availableForHire,
        showEmail: settings.personal.showEmail,
        showPhone: settings.personal.showPhone,
      });

      siteForm.reset({
        siteName: settings.site.siteName || "",
        siteTagline: settings.site.siteTagline || "",
        siteDescription: settings.site.siteDescription || "",
        logo: settings.site.logo,
        favicon: settings.site.favicon,
        ogImage: settings.site.ogImage,
        language: settings.site.language || "en",
        timezone: settings.site.timezone || "UTC",
        dateFormat: settings.site.dateFormat || "MMM DD, YYYY",
        googleAnalyticsId: settings.site.googleAnalyticsId,
        googleSiteVerification: settings.site.googleSiteVerification,
      });

      socialForm.reset({
        github: settings.social.github || "",
        linkedin: settings.social.linkedin || "",
        twitter: settings.social.twitter || "",
        instagram: settings.social.instagram || "",
        youtube: settings.social.youtube || "",
        dribbble: settings.social.dribbble || "",
        behance: settings.social.behance || "",
        codepen: settings.social.codepen || "",
        medium: settings.social.medium || "",
        devto: settings.social.devto || "",
        hashnode: settings.social.hashnode || "",
        stackoverflow: settings.social.stackoverflow || "",
        discord: settings.social.discord || "",
        telegram: settings.social.telegram || "",
        whatsapp: settings.social.whatsapp || "",
        website: settings.social.website || "",
      });

      portfolioForm.reset({
        projectsPerPage: settings.portfolio.projectsPerPage,
        featuredProjectsCount: settings.portfolio.featuredProjectsCount,
        showProjectViews: settings.portfolio.showProjectViews,
        showTechStack: settings.portfolio.showTechStack,
        enableProjectFiltering: settings.portfolio.enableProjectFiltering,
        enableProjectSearch: settings.portfolio.enableProjectSearch,
        defaultProjectSort: settings.portfolio.defaultProjectSort as
          | "order"
          | "newest"
          | "oldest"
          | "views",
        showGithubLink: settings.portfolio.showGithubLink,
        showDemoLink: settings.portfolio.showDemoLink,
        projectCardStyle: settings.portfolio.projectCardStyle as
          | "minimal"
          | "modern"
          | "detailed",
      });

      blogForm.reset({
        postsPerPage: settings.blog.postsPerPage,
        featuredPostsCount: settings.blog.featuredPostsCount,
        showReadingTime: settings.blog.showReadingTime,
        showViews: settings.blog.showViews,
        showTableOfContents: settings.blog.showTableOfContents,
        enableComments: settings.blog.enableComments,
        commentSystem: settings.blog.commentSystem as
          | "none"
          | "giscus"
          | "utterances"
          | "disqus",
        enableNewsletter: settings.blog.enableNewsletter,
        newsletterProvider: settings.blog.newsletterProvider as
          | "none"
          | "mailchimp"
          | "convertkit"
          | "buttondown"
          | "substack",
        enableRss: settings.blog.enableRss,
        enableSearch: settings.blog.enableSearch,
        showRelatedPosts: settings.blog.showRelatedPosts,
        relatedPostsCount: settings.blog.relatedPostsCount,
        showShareButtons: settings.blog.showShareButtons,
        showCategories: settings.blog.showCategories,
        showTags: settings.blog.showTags,
      });

      resumeForm.reset({
        resumeUrl: settings.resume.resumeUrl,
        showDownloadButton: settings.resume.showDownloadButton,
      });

      contactForm.reset({
        enableContactForm: settings.contact.enableContactForm,
        contactEmail: settings.contact.contactEmail || "",
        enableSpamProtection: settings.contact.enableSpamProtection,
        officeAddress: settings.contact.officeAddress,
        workingHours:
          settings.contact.workingHours || "Mon - Fri, 9:00 AM - 6:00 PM",
        responseTime: settings.contact.responseTime || "24 hours",
      });

      seoForm.reset({
        defaultMetaTitle: settings.seo.defaultMetaTitle || "",
        defaultMetaDescription: settings.seo.defaultMetaDescription || "",
        defaultKeywords: settings.seo.defaultKeywords || "",
        enableSitemap: settings.seo.enableSitemap,
        enableRobotsTxt: settings.seo.enableRobotsTxt,
        canonicalUrl: settings.seo.canonicalUrl || "",
        twitterHandle: settings.seo.twitterHandle || "",
        ogType: settings.seo.ogType as "website" | "profile" | "article",
      });
    }
  }, [settings]);

  const settingsTabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "site", label: "Site", icon: Globe },
    { id: "social", label: "Social", icon: Share2 },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "resume", label: "Resume", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "seo", label: "SEO", icon: Search },
  ];

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayoutWrapper
          breadcrumbs={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Settings" },
          ]}
        >
          <div className="space-y-6">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-[600px] w-full" />
          </div>
        </AdminLayoutWrapper>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayoutWrapper
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Settings" },
        ]}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Manage your portfolio website settings
              </p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            {/* Tabs Navigation */}
            <div className="overflow-x-auto pb-2">
              <TabsList className="inline-flex h-auto p-1 bg-muted/50 backdrop-blur-sm">
                {settingsTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <form
                onSubmit={personalForm.handleSubmit((data) =>
                  updatePersonal.mutate(data),
                )}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Your personal details displayed on the portfolio
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="space-y-2">
                        <Label>Avatar</Label>
                        <ImageUpload
                          value={personalForm.watch("avatar") || ""}
                          onChange={(url) =>
                            personalForm.setValue("avatar", url)
                          }
                          type="thumbnail"
                          size="compact"
                        />
                      </div>
                      <div className="flex-1 space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                              id="fullName"
                              {...personalForm.register("fullName")}
                              placeholder="John Doe"
                            />
                            {personalForm.formState.errors.fullName && (
                              <p className="text-sm text-destructive">
                                {personalForm.formState.errors.fullName.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="title">Professional Title *</Label>
                            <Input
                              id="title"
                              {...personalForm.register("title")}
                              placeholder="Full Stack Developer"
                            />
                            {personalForm.formState.errors.title && (
                              <p className="text-sm text-destructive">
                                {personalForm.formState.errors.title.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tagline">Tagline</Label>
                          <Input
                            id="tagline"
                            {...personalForm.register("tagline")}
                            placeholder="A short catchy phrase about you"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        {...personalForm.register("bio")}
                        rows={4}
                        placeholder="Tell visitors about yourself..."
                      />
                      <p className="text-xs text-muted-foreground">
                        Displayed in the About section. Supports markdown.
                      </p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="flex gap-2">
                          <Input
                            id="email"
                            type="email"
                            {...personalForm.register("email")}
                            className="flex-1"
                          />
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={personalForm.watch("showEmail")}
                              onCheckedChange={(checked) =>
                                personalForm.setValue("showEmail", checked)
                              }
                            />
                            <Label className="text-sm text-muted-foreground">
                              Show
                            </Label>
                          </div>
                        </div>
                        {personalForm.formState.errors.email && (
                          <p className="text-sm text-destructive">
                            {personalForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex gap-2">
                          <Input
                            id="phone"
                            {...personalForm.register("phone")}
                            className="flex-1"
                            placeholder="+1 234 567 8900"
                          />
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={personalForm.watch("showPhone")}
                              onCheckedChange={(checked) =>
                                personalForm.setValue("showPhone", checked)
                              }
                            />
                            <Label className="text-sm text-muted-foreground">
                              Show
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="location"
                            {...personalForm.register("location")}
                            className="pl-10"
                            placeholder="New York, USA"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Availability Status</Label>
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/30">
                          <Switch
                            checked={personalForm.watch("availableForHire")}
                            onCheckedChange={(checked) =>
                              personalForm.setValue("availableForHire", checked)
                            }
                          />
                          <div className="flex-1">
                            <span className="text-sm font-medium">
                              Available for hire
                            </span>
                            <p className="text-xs text-muted-foreground">
                              Show hiring badge on your profile
                            </p>
                          </div>
                          {personalForm.watch("availableForHire") && (
                            <Badge
                              variant="default"
                              className="bg-green-500/10 text-green-600 border-green-500/20"
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              Open
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={updatePersonal.isPending}>
                        {updatePersonal.isPending ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            {/* Site Tab */}
            <TabsContent value="site" className="space-y-6">
              <form
                onSubmit={siteForm.handleSubmit((data) =>
                  updateSite.mutate(data),
                )}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Site Information
                    </CardTitle>
                    <CardDescription>
                      General settings for your portfolio website
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="siteName">Site Name *</Label>
                        <Input
                          id="siteName"
                          {...siteForm.register("siteName")}
                          placeholder="My Portfolio"
                        />
                        {siteForm.formState.errors.siteName && (
                          <p className="text-sm text-destructive">
                            {siteForm.formState.errors.siteName.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="siteTagline">Tagline</Label>
                        <Input
                          id="siteTagline"
                          {...siteForm.register("siteTagline")}
                          placeholder="Full Stack Developer & Designer"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Textarea
                        id="siteDescription"
                        {...siteForm.register("siteDescription")}
                        rows={3}
                        placeholder="A brief description of your portfolio website"
                      />
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label>Logo</Label>
                        <ImageUpload
                          value={siteForm.watch("logo") || ""}
                          onChange={(url) => siteForm.setValue("logo", url)}
                          type="thumbnail"
                          size="compact"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label>Favicon</Label>
                        <ImageUpload
                          value={siteForm.watch("favicon") || ""}
                          onChange={(url) => siteForm.setValue("favicon", url)}
                          type="thumbnail"
                          size="compact"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label>OG Image (1200×630px)</Label>
                        <ImageUpload
                          value={siteForm.watch("ogImage") || ""}
                          onChange={(url) => siteForm.setValue("ogImage", url)}
                          type="cover"
                          size="compact"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={siteForm.watch("language")}
                          onValueChange={(v) =>
                            siteForm.setValue("language", v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="ar">Arabic</SelectItem>
                            <SelectItem value="ur">Urdu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={siteForm.watch("timezone")}
                          onValueChange={(v) =>
                            siteForm.setValue("timezone", v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="Asia/Karachi">
                              Asia/Karachi (PKT)
                            </SelectItem>
                            <SelectItem value="America/New_York">
                              America/New_York (EST)
                            </SelectItem>
                            <SelectItem value="Europe/London">
                              Europe/London (GMT)
                            </SelectItem>
                            <SelectItem value="Asia/Dubai">
                              Asia/Dubai (GST)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Select
                          value={siteForm.watch("dateFormat")}
                          onValueChange={(v) =>
                            siteForm.setValue("dateFormat", v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MMM DD, YYYY">
                              Jan 22, 2026
                            </SelectItem>
                            <SelectItem value="DD/MM/YYYY">
                              22/01/2026
                            </SelectItem>
                            <SelectItem value="MM/DD/YYYY">
                              01/22/2026
                            </SelectItem>
                            <SelectItem value="YYYY-MM-DD">
                              2026-01-22
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">
                        Analytics & Verification
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="googleAnalyticsId">
                            Google Analytics ID
                          </Label>
                          <Input
                            id="googleAnalyticsId"
                            {...siteForm.register("googleAnalyticsId")}
                            placeholder="G-XXXXXXXXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="googleSiteVerification">
                            Google Site Verification
                          </Label>
                          <Input
                            id="googleSiteVerification"
                            {...siteForm.register("googleSiteVerification")}
                            placeholder="Verification code"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={updateSite.isPending}>
                        {updateSite.isPending ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            {/* Social Tab */}
            <TabsContent value="social" className="space-y-6">
              <form
                onSubmit={socialForm.handleSubmit((data) =>
                  updateSocial.mutate(data),
                )}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Social Links
                    </CardTitle>
                    <CardDescription>
                      Connect your social media profiles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          key: "github",
                          label: "GitHub",
                          icon: Github,
                          placeholder: "https://github.com/username",
                        },
                        {
                          key: "linkedin",
                          label: "LinkedIn",
                          icon: Linkedin,
                          placeholder: "https://linkedin.com/in/username",
                        },
                        {
                          key: "twitter",
                          label: "Twitter/X",
                          icon: Twitter,
                          placeholder: "https://twitter.com/username",
                        },
                        {
                          key: "instagram",
                          label: "Instagram",
                          icon: Instagram,
                          placeholder: "https://instagram.com/username",
                        },
                        {
                          key: "youtube",
                          label: "YouTube",
                          icon: Youtube,
                          placeholder: "https://youtube.com/@username",
                        },
                        {
                          key: "codepen",
                          label: "CodePen",
                          icon: Code2,
                          placeholder: "https://codepen.io/username",
                        },
                      ].map((item) => (
                        <div key={item.key} className="space-y-2">
                          <Label
                            htmlFor={item.key}
                            className="flex items-center gap-2"
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </Label>
                          <Input
                            id={item.key}
                            {...socialForm.register(
                              item.key as keyof SocialLinksInput,
                            )}
                            placeholder={item.placeholder}
                          />
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">
                        Developer & Writing Platforms
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            key: "medium",
                            label: "Medium",
                            placeholder: "https://medium.com/@username",
                          },
                          {
                            key: "devto",
                            label: "Dev.to",
                            placeholder: "https://dev.to/username",
                          },
                          {
                            key: "hashnode",
                            label: "Hashnode",
                            placeholder: "https://hashnode.com/@username",
                          },
                          {
                            key: "stackoverflow",
                            label: "Stack Overflow",
                            placeholder: "https://stackoverflow.com/users/id",
                          },
                          {
                            key: "dribbble",
                            label: "Dribbble",
                            placeholder: "https://dribbble.com/username",
                          },
                          {
                            key: "behance",
                            label: "Behance",
                            placeholder: "https://behance.net/username",
                          },
                        ].map((item) => (
                          <div key={item.key} className="space-y-2">
                            <Label htmlFor={item.key}>{item.label}</Label>
                            <Input
                              id={item.key}
                              {...socialForm.register(
                                item.key as keyof SocialLinksInput,
                              )}
                              placeholder={item.placeholder}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Messaging & Other</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            key: "discord",
                            label: "Discord",
                            placeholder: "Discord invite or username",
                          },
                          {
                            key: "telegram",
                            label: "Telegram",
                            placeholder: "https://t.me/username",
                          },
                          {
                            key: "whatsapp",
                            label: "WhatsApp",
                            placeholder: "+1234567890",
                          },
                          {
                            key: "website",
                            label: "Personal Website",
                            placeholder: "https://yourwebsite.com",
                          },
                        ].map((item) => (
                          <div key={item.key} className="space-y-2">
                            <Label htmlFor={item.key}>{item.label}</Label>
                            <Input
                              id={item.key}
                              {...socialForm.register(
                                item.key as keyof SocialLinksInput,
                              )}
                              placeholder={item.placeholder}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={updateSocial.isPending}>
                        {updateSocial.isPending ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-6">
              <form
                onSubmit={portfolioForm.handleSubmit((data) =>
                  updatePortfolio.mutate(data),
                )}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Portfolio Settings
                    </CardTitle>
                    <CardDescription>
                      Configure how your projects are displayed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Projects Per Page</Label>
                        <Select
                          value={portfolioForm
                            .watch("projectsPerPage")
                            .toString()}
                          onValueChange={(v) =>
                            portfolioForm.setValue(
                              "projectsPerPage",
                              parseInt(v),
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 projects</SelectItem>
                            <SelectItem value="9">9 projects</SelectItem>
                            <SelectItem value="12">12 projects</SelectItem>
                            <SelectItem value="15">15 projects</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Featured Projects</Label>
                        <Select
                          value={portfolioForm
                            .watch("featuredProjectsCount")
                            .toString()}
                          onValueChange={(v) =>
                            portfolioForm.setValue(
                              "featuredProjectsCount",
                              parseInt(v),
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 projects</SelectItem>
                            <SelectItem value="3">3 projects</SelectItem>
                            <SelectItem value="4">4 projects</SelectItem>
                            <SelectItem value="5">5 projects</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Default Sort</Label>
                        <Select
                          value={portfolioForm.watch("defaultProjectSort")}
                          onValueChange={(v) =>
                            portfolioForm.setValue(
                              "defaultProjectSort",
                              v as "order" | "newest" | "oldest" | "views",
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="order">Custom Order</SelectItem>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                            <SelectItem value="views">Most Viewed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Project Card Style</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {(["minimal", "modern", "detailed"] as const).map(
                          (style) => (
                            <button
                              key={style}
                              type="button"
                              onClick={() =>
                                portfolioForm.setValue(
                                  "projectCardStyle",
                                  style,
                                )
                              }
                              className={`p-4 rounded-xl border-2 transition-all capitalize ${
                                portfolioForm.watch("projectCardStyle") ===
                                style
                                  ? "border-primary bg-primary/5"
                                  : "border-border/50 hover:border-primary/50"
                              }`}
                            >
                              {style}
                            </button>
                          ),
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Display Options</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            key: "showProjectViews",
                            label: "Show View Count",
                            description: "Display number of views on projects",
                          },
                          {
                            key: "showTechStack",
                            label: "Show Tech Stack",
                            description:
                              "Display technologies used in projects",
                          },
                          {
                            key: "showGithubLink",
                            label: "GitHub Link",
                            description: "Show link to source code",
                          },
                          {
                            key: "showDemoLink",
                            label: "Demo Link",
                            description: "Show link to live demo",
                          },
                          {
                            key: "enableProjectFiltering",
                            label: "Enable Filtering",
                            description: "Allow filtering by technology",
                          },
                          {
                            key: "enableProjectSearch",
                            label: "Enable Search",
                            description: "Allow searching projects",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30"
                          >
                            <div>
                              <span className="text-sm font-medium">
                                {item.label}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                            <Switch
                              checked={
                                portfolioForm.watch(
                                  item.key as keyof PortfolioSettingsInput,
                                ) as boolean
                              }
                              onCheckedChange={(checked) =>
                                portfolioForm.setValue(
                                  item.key as keyof PortfolioSettingsInput,
                                  checked as never,
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        disabled={updatePortfolio.isPending}
                      >
                        {updatePortfolio.isPending ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            {/* Blog Tab */}
            <TabsContent value="blog" className="space-y-6">
              <form
                onSubmit={blogForm.handleSubmit((data) =>
                  updateBlog.mutate(data),
                )}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Blog Settings
                    </CardTitle>
                    <CardDescription>
                      Configure your blog display and features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Posts Per Page</Label>
                        <Select
                          value={blogForm.watch("postsPerPage").toString()}
                          onValueChange={(v) =>
                            blogForm.setValue("postsPerPage", parseInt(v))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 posts</SelectItem>
                            <SelectItem value="10">10 posts</SelectItem>
                            <SelectItem value="15">15 posts</SelectItem>
                            <SelectItem value="20">20 posts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Featured Posts</Label>
                        <Select
                          value={blogForm
                            .watch("featuredPostsCount")
                            .toString()}
                          onValueChange={(v) =>
                            blogForm.setValue("featuredPostsCount", parseInt(v))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 posts</SelectItem>
                            <SelectItem value="3">3 posts</SelectItem>
                            <SelectItem value="4">4 posts</SelectItem>
                            <SelectItem value="5">5 posts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Related Posts</Label>
                        <Select
                          value={blogForm.watch("relatedPostsCount").toString()}
                          onValueChange={(v) =>
                            blogForm.setValue("relatedPostsCount", parseInt(v))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 posts</SelectItem>
                            <SelectItem value="3">3 posts</SelectItem>
                            <SelectItem value="4">4 posts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Post Display</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            key: "showReadingTime",
                            label: "Reading Time",
                            description: "Show estimated reading time",
                          },
                          {
                            key: "showViews",
                            label: "View Count",
                            description: "Display post view count",
                          },
                          {
                            key: "showTableOfContents",
                            label: "Table of Contents",
                            description: "Auto-generate TOC from headings",
                          },
                          {
                            key: "showCategories",
                            label: "Categories",
                            description: "Show post categories",
                          },
                          {
                            key: "showTags",
                            label: "Tags",
                            description: "Show post tags",
                          },
                          {
                            key: "showShareButtons",
                            label: "Share Buttons",
                            description: "Enable social sharing",
                          },
                          {
                            key: "showRelatedPosts",
                            label: "Related Posts",
                            description: "Show related posts section",
                          },
                          {
                            key: "enableSearch",
                            label: "Blog Search",
                            description: "Enable search functionality",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30"
                          >
                            <div>
                              <span className="text-sm font-medium">
                                {item.label}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                            <Switch
                              checked={
                                blogForm.watch(
                                  item.key as keyof BlogSettingsInput,
                                ) as boolean
                              }
                              onCheckedChange={(checked) =>
                                blogForm.setValue(
                                  item.key as keyof BlogSettingsInput,
                                  checked as never,
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Comments</h4>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                        <div>
                          <span className="text-sm font-medium">
                            Enable Comments
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Allow readers to comment on posts
                          </p>
                        </div>
                        <Switch
                          checked={blogForm.watch("enableComments")}
                          onCheckedChange={(checked) =>
                            blogForm.setValue("enableComments", checked)
                          }
                        />
                      </div>
                      {blogForm.watch("enableComments") && (
                        <div className="space-y-2">
                          <Label>Comment System</Label>
                          <Select
                            value={blogForm.watch("commentSystem")}
                            onValueChange={(v) =>
                              blogForm.setValue(
                                "commentSystem",
                                v as
                                  | "none"
                                  | "giscus"
                                  | "utterances"
                                  | "disqus",
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="giscus">
                                Giscus (GitHub Discussions)
                              </SelectItem>
                              <SelectItem value="utterances">
                                Utterances (GitHub Issues)
                              </SelectItem>
                              <SelectItem value="disqus">Disqus</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Newsletter & RSS</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                          <div>
                            <span className="text-sm font-medium">
                              Newsletter
                            </span>
                            <p className="text-xs text-muted-foreground">
                              Enable newsletter subscription
                            </p>
                          </div>
                          <Switch
                            checked={blogForm.watch("enableNewsletter")}
                            onCheckedChange={(checked) =>
                              blogForm.setValue("enableNewsletter", checked)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                          <div className="flex items-center gap-2">
                            <Rss className="h-4 w-4 text-orange-500" />
                            <div>
                              <span className="text-sm font-medium">
                                RSS Feed
                              </span>
                              <p className="text-xs text-muted-foreground">
                                Generate RSS feed
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={blogForm.watch("enableRss")}
                            onCheckedChange={(checked) =>
                              blogForm.setValue("enableRss", checked)
                            }
                          />
                        </div>
                      </div>
                      {blogForm.watch("enableNewsletter") && (
                        <div className="space-y-2">
                          <Label>Newsletter Provider</Label>
                          <Select
                            value={blogForm.watch("newsletterProvider")}
                            onValueChange={(v) =>
                              blogForm.setValue(
                                "newsletterProvider",
                                v as
                                  | "none"
                                  | "mailchimp"
                                  | "convertkit"
                                  | "buttondown"
                                  | "substack",
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">
                                None (Collect emails only)
                              </SelectItem>
                              <SelectItem value="mailchimp">
                                Mailchimp
                              </SelectItem>
                              <SelectItem value="convertkit">
                                ConvertKit
                              </SelectItem>
                              <SelectItem value="buttondown">
                                Buttondown
                              </SelectItem>
                              <SelectItem value="substack">Substack</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={updateBlog.isPending}>
                        {updateBlog.isPending ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            {/* Resume Tab */}
            <TabsContent value="resume" className="space-y-6">
              <form
                onSubmit={resumeForm.handleSubmit((data) =>
                  updateResume.mutate(data),
                )}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Resume Settings
                    </CardTitle>
                    <CardDescription>
                      Upload and manage your resume/CV
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Resume/CV File (PDF)</Label>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                          <div className="h-32 rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                            <div className="text-center">
                              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                              <span className="text-sm text-muted-foreground">
                                {resumeForm.watch("resumeUrl")
                                  ? "Replace PDF resume"
                                  : "Upload PDF resume"}
                              </span>
                            </div>
                            <Input
                              type="file"
                              accept=".pdf"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  // TODO: Implement file upload to S3
                                  console.log("File selected:", file.name);
                                }
                              }}
                            />
                          </div>
                        </div>
                        {resumeForm.watch("resumeUrl") && (
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={resumeForm.watch("resumeUrl") || ""}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Preview
                              </a>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={resumeForm.watch("resumeUrl") || ""}
                                download
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                      {resumeForm.watch("resumeUrl") && (
                        <p className="text-sm text-muted-foreground">
                          Current file:{" "}
                          {resumeForm.watch("resumeUrl")?.split("/").pop()}
                        </p>
                      )}
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                      <div>
                        <span className="text-sm font-medium">
                          Show Download Button
                        </span>
                        <p className="text-xs text-muted-foreground">
                          Allow visitors to download your resume
                        </p>
                      </div>
                      <Switch
                        checked={resumeForm.watch("showDownloadButton")}
                        onCheckedChange={(checked) =>
                          resumeForm.setValue("showDownloadButton", checked)
                        }
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={updateResume.isPending}>
                        {updateResume.isPending ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <form
                onSubmit={contactForm.handleSubmit((data) =>
                  updateContact.mutate(data),
                )}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Contact Settings
                    </CardTitle>
                    <CardDescription>
                      Configure how visitors can reach you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                      <div>
                        <span className="text-sm font-medium">
                          Enable Contact Form
                        </span>
                        <p className="text-xs text-muted-foreground">
                          Allow visitors to send you messages
                        </p>
                      </div>
                      <Switch
                        checked={contactForm.watch("enableContactForm")}
                        onCheckedChange={(checked) =>
                          contactForm.setValue("enableContactForm", checked)
                        }
                      />
                    </div>

                    {contactForm.watch("enableContactForm") && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">Contact Email *</Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            {...contactForm.register("contactEmail")}
                            placeholder="Where to receive messages"
                          />
                          {contactForm.formState.errors.contactEmail && (
                            <p className="text-sm text-destructive">
                              {
                                contactForm.formState.errors.contactEmail
                                  .message
                              }
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Messages from the contact form will be sent to this
                            email
                          </p>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30 h-fit">
                          <div>
                            <span className="text-sm font-medium">
                              Spam Protection
                            </span>
                            <p className="text-xs text-muted-foreground">
                              Enable honeypot & rate limiting
                            </p>
                          </div>
                          <Switch
                            checked={contactForm.watch("enableSpamProtection")}
                            onCheckedChange={(checked) =>
                              contactForm.setValue(
                                "enableSpamProtection",
                                checked,
                              )
                            }
                          />
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="officeAddress">Address</Label>
                        <Textarea
                          id="officeAddress"
                          {...contactForm.register("officeAddress")}
                          placeholder="Your office or location address"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="workingHours">Working Hours</Label>
                          <Input
                            id="workingHours"
                            {...contactForm.register("workingHours")}
                            placeholder="Mon - Fri, 9:00 AM - 6:00 PM"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="responseTime">Response Time</Label>
                          <Input
                            id="responseTime"
                            {...contactForm.register("responseTime")}
                            placeholder="Usually within 24 hours"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={updateContact.isPending}>
                        {updateContact.isPending ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-6">
              <form
                onSubmit={seoForm.handleSubmit((data) =>
                  updateSeo.mutate(data),
                )}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      SEO Settings
                    </CardTitle>
                    <CardDescription>
                      Optimize your site for search engines
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="defaultMetaTitle">
                        Default Meta Title
                      </Label>
                      <Input
                        id="defaultMetaTitle"
                        {...seoForm.register("defaultMetaTitle")}
                        placeholder="Your Name - Full Stack Developer"
                      />
                      <p className="text-xs text-muted-foreground">
                        {(seoForm.watch("defaultMetaTitle") || "").length}/60
                        characters (recommended max 60)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="defaultMetaDescription">
                        Default Meta Description
                      </Label>
                      <Textarea
                        id="defaultMetaDescription"
                        {...seoForm.register("defaultMetaDescription")}
                        rows={3}
                        placeholder="A brief description of your portfolio for search engines"
                      />
                      <p className="text-xs text-muted-foreground">
                        {(seoForm.watch("defaultMetaDescription") || "").length}
                        /160 characters (recommended max 160)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="defaultKeywords">Default Keywords</Label>
                      <Input
                        id="defaultKeywords"
                        {...seoForm.register("defaultKeywords")}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="canonicalUrl">Canonical URL</Label>
                        <Input
                          id="canonicalUrl"
                          {...seoForm.register("canonicalUrl")}
                          placeholder="https://yourdomain.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitterHandle">Twitter Handle</Label>
                        <Input
                          id="twitterHandle"
                          {...seoForm.register("twitterHandle")}
                          placeholder="@username"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ogType">Default OG Type</Label>
                      <Select
                        value={seoForm.watch("ogType")}
                        onValueChange={(v) =>
                          seoForm.setValue(
                            "ogType",
                            v as "website" | "profile" | "article",
                          )
                        }
                      >
                        <SelectTrigger className="w-full md:w-64">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="profile">Profile</SelectItem>
                          <SelectItem value="article">Article</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                        <div>
                          <span className="text-sm font-medium">
                            Generate Sitemap
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Auto-generate sitemap.xml
                          </p>
                        </div>
                        <Switch
                          checked={seoForm.watch("enableSitemap")}
                          onCheckedChange={(checked) =>
                            seoForm.setValue("enableSitemap", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                        <div>
                          <span className="text-sm font-medium">
                            Generate Robots.txt
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Auto-generate robots.txt
                          </p>
                        </div>
                        <Switch
                          checked={seoForm.watch("enableRobotsTxt")}
                          onCheckedChange={(checked) =>
                            seoForm.setValue("enableRobotsTxt", checked)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={updateSeo.isPending}>
                        {updateSeo.isPending ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayoutWrapper>
    </ProtectedRoute>
  );
}
