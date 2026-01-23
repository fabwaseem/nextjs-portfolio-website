"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/admin/protected-route";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Palette,
  Mail,
  Share2,
  FileText,
  BarChart3,
  Puzzle,
  Shield,
  Bell,
  Save,
  Upload,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Code2,
  Briefcase,
  GraduationCap,
  MapPin,
  Phone,
  Calendar,
  Link2,
  Rss,
  MessageSquare,
  Search,
  Image,
  Type,
  Moon,
  Sun,
  Monitor,
  Zap,
  Eye,
  EyeOff,
  Download,
  RefreshCw,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Profile Settings State
  const [profile, setProfile] = useState({
    fullName: "Waseem Anjum",
    title: "Full Stack Developer",
    tagline: "Building beautiful web experiences",
    bio: "Passionate full-stack developer with expertise in React, Next.js, and modern web technologies. I love creating performant, accessible, and visually stunning applications.",
    avatar: "",
    location: "Pakistan",
    email: "hello@waseemanjum.com",
    phone: "+92 300 1234567",
    availableForHire: true,
    showEmail: true,
    showPhone: false,
  });

  // Site Settings State
  const [site, setSite] = useState({
    siteName: "Waseem Anjum",
    siteTagline: "Full Stack Developer & Designer",
    siteDescription: "Portfolio website showcasing my work and expertise in web development.",
    logo: "",
    favicon: "",
    ogImage: "",
    language: "en",
    timezone: "Asia/Karachi",
    dateFormat: "MMM DD, YYYY",
    googleAnalyticsId: "",
    googleSiteVerification: "",
  });

  // Social Links State
  const [social, setSocial] = useState({
    github: "https://github.com/waseemanjum",
    linkedin: "https://linkedin.com/in/waseemanjum",
    twitter: "https://twitter.com/waseemanjum",
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
    calendly: "",
    website: "",
  });

  // Appearance Settings State
  const [appearance, setAppearance] = useState({
    theme: "system",
    accentColor: "#3B82F6",
    fontHeading: "Inter",
    fontBody: "Inter",
    borderRadius: "0.75",
    enableAnimations: true,
    enableParticles: false,
    enableCursor: false,
    enableSmoothScroll: true,
    enableGlassEffect: true,
    heroStyle: "minimal",
    navbarStyle: "floating",
  });

  // Portfolio Settings State
  const [portfolio, setPortfolio] = useState({
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
  });

  // Blog Settings State
  const [blog, setBlog] = useState({
    postsPerPage: 10,
    featuredPostsCount: 3,
    showReadingTime: true,
    showViews: true,
    showAuthor: false,
    showTableOfContents: true,
    enableComments: false,
    commentSystem: "none",
    enableNewsletter: true,
    newsletterProvider: "none",
    enableRss: true,
    enableSearch: true,
    showRelatedPosts: true,
    relatedPostsCount: 3,
    showShareButtons: true,
    showCategories: true,
    showTags: true,
  });

  // Resume Settings State
  const [resume, setResume] = useState({
    resumeUrl: "",
    showDownloadButton: true,
    showExperience: true,
    showEducation: true,
    showSkills: true,
    showCertifications: true,
    showLanguages: true,
    experienceLayout: "timeline",
    skillsLayout: "bars",
  });

  // Contact Settings State
  const [contact, setContact] = useState({
    enableContactForm: true,
    contactEmail: "hello@waseemanjum.com",
    formspreeId: "",
    enableSpamProtection: true,
    showMap: false,
    mapEmbedUrl: "",
    officeAddress: "",
    workingHours: "Mon - Fri, 9:00 AM - 6:00 PM",
    responseTime: "24 hours",
    enableCalendlyIntegration: false,
    calendlyUrl: "",
  });

  // SEO Settings State
  const [seo, setSeo] = useState({
    defaultMetaTitle: "Waseem Anjum - Full Stack Developer",
    defaultMetaDescription: "Portfolio website showcasing my work and expertise in web development, React, Next.js, and modern technologies.",
    defaultKeywords: "web developer, full stack, react, next.js, portfolio",
    enableSitemap: true,
    enableRobotsTxt: true,
    canonicalUrl: "https://waseemanjum.com",
    twitterHandle: "@waseemanjum",
    ogType: "website",
  });

  // Security Settings State
  const [security, setSecurity] = useState({
    enableTwoFactor: false,
    sessionTimeout: 7,
    enableLoginNotifications: true,
    allowedIps: "",
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailOnNewContact: true,
    emailOnNewComment: false,
    emailOnNewSubscriber: true,
    digestFrequency: "weekly",
    enablePushNotifications: false,
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast.success("Settings saved successfully");
  };

  const settingsTabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "site", label: "Site", icon: Globe },
    { id: "social", label: "Social", icon: Share2 },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "resume", label: "Resume", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "seo", label: "SEO", icon: Search },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

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
            <Button
              onClick={handleSave}
              disabled={saving}
              className="shadow-lg shadow-primary/25"
            >
              {saving ? (
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-2xl bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
                        {profile.avatar ? (
                          <img src={profile.avatar} alt="Avatar" className="h-full w-full object-cover" />
                        ) : (
                          <User className="h-10 w-10 text-muted-foreground" />
                        )}
                      </div>
                      <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={profile.fullName}
                            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="title">Professional Title</Label>
                          <Input
                            id="title"
                            value={profile.title}
                            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tagline">Tagline</Label>
                        <Input
                          id="tagline"
                          value={profile.tagline}
                          onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                          placeholder="A short catchy phrase about you"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
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
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex gap-2">
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={profile.showEmail}
                            onCheckedChange={(checked) => setProfile({ ...profile, showEmail: checked })}
                          />
                          <Label className="text-sm text-muted-foreground">Show</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={profile.showPhone}
                            onCheckedChange={(checked) => setProfile({ ...profile, showPhone: checked })}
                          />
                          <Label className="text-sm text-muted-foreground">Show</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Availability Status</Label>
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/30">
                        <Switch
                          checked={profile.availableForHire}
                          onCheckedChange={(checked) => setProfile({ ...profile, availableForHire: checked })}
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium">Available for hire</span>
                          <p className="text-xs text-muted-foreground">Show hiring badge on your profile</p>
                        </div>
                        {profile.availableForHire && (
                          <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                            <Zap className="h-3 w-3 mr-1" />
                            Open
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Site Tab */}
            <TabsContent value="site" className="space-y-6">
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
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={site.siteName}
                        onChange={(e) => setSite({ ...site, siteName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteTagline">Tagline</Label>
                      <Input
                        id="siteTagline"
                        value={site.siteTagline}
                        onChange={(e) => setSite({ ...site, siteTagline: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={site.siteDescription}
                      onChange={(e) => setSite({ ...site, siteDescription: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label>Logo</Label>
                      <div className="h-24 rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="text-center">
                          <Image className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground">Upload logo</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label>Favicon</Label>
                      <div className="h-24 rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="text-center">
                          <Image className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground">Upload favicon</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label>OG Image</Label>
                      <div className="h-24 rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="text-center">
                          <Image className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground">1200×630px</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={site.language} onValueChange={(v) => setSite({ ...site, language: v })}>
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
                      <Select value={site.timezone} onValueChange={(v) => setSite({ ...site, timezone: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Karachi">Asia/Karachi (PKT)</SelectItem>
                          <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                          <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                          <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Select value={site.dateFormat} onValueChange={(v) => setSite({ ...site, dateFormat: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MMM DD, YYYY">Jan 22, 2026</SelectItem>
                          <SelectItem value="DD/MM/YYYY">22/01/2026</SelectItem>
                          <SelectItem value="MM/DD/YYYY">01/22/2026</SelectItem>
                          <SelectItem value="YYYY-MM-DD">2026-01-22</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Analytics & Verification</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                        <Input
                          id="googleAnalyticsId"
                          value={site.googleAnalyticsId}
                          onChange={(e) => setSite({ ...site, googleAnalyticsId: e.target.value })}
                          placeholder="G-XXXXXXXXXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="googleSiteVerification">Google Site Verification</Label>
                        <Input
                          id="googleSiteVerification"
                          value={site.googleSiteVerification}
                          onChange={(e) => setSite({ ...site, googleSiteVerification: e.target.value })}
                          placeholder="Verification code"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Social Tab */}
            <TabsContent value="social" className="space-y-6">
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
                      { key: "github", label: "GitHub", icon: Github, placeholder: "https://github.com/username" },
                      { key: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/username" },
                      { key: "twitter", label: "Twitter/X", icon: Twitter, placeholder: "https://twitter.com/username" },
                      { key: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/username" },
                      { key: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@username" },
                      { key: "codepen", label: "CodePen", icon: Code2, placeholder: "https://codepen.io/username" },
                    ].map((item) => (
                      <div key={item.key} className="space-y-2">
                        <Label htmlFor={item.key} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Label>
                        <Input
                          id={item.key}
                          value={social[item.key as keyof typeof social]}
                          onChange={(e) => setSocial({ ...social, [item.key]: e.target.value })}
                          placeholder={item.placeholder}
                        />
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Developer & Writing Platforms</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: "medium", label: "Medium", placeholder: "https://medium.com/@username" },
                        { key: "devto", label: "Dev.to", placeholder: "https://dev.to/username" },
                        { key: "hashnode", label: "Hashnode", placeholder: "https://hashnode.com/@username" },
                        { key: "stackoverflow", label: "Stack Overflow", placeholder: "https://stackoverflow.com/users/id" },
                      ].map((item) => (
                        <div key={item.key} className="space-y-2">
                          <Label htmlFor={item.key}>{item.label}</Label>
                          <Input
                            id={item.key}
                            value={social[item.key as keyof typeof social]}
                            onChange={(e) => setSocial({ ...social, [item.key]: e.target.value })}
                            placeholder={item.placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Messaging & Booking</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: "discord", label: "Discord", placeholder: "Discord invite or username" },
                        { key: "telegram", label: "Telegram", placeholder: "https://t.me/username" },
                        { key: "whatsapp", label: "WhatsApp", placeholder: "+1234567890" },
                        { key: "calendly", label: "Calendly", placeholder: "https://calendly.com/username" },
                      ].map((item) => (
                        <div key={item.key} className="space-y-2">
                          <Label htmlFor={item.key}>{item.label}</Label>
                          <Input
                            id={item.key}
                            value={social[item.key as keyof typeof social]}
                            onChange={(e) => setSocial({ ...social, [item.key]: e.target.value })}
                            placeholder={item.placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Theme & Colors
                  </CardTitle>
                  <CardDescription>
                    Customize the look and feel of your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Color Theme</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: "light", label: "Light", icon: Sun },
                        { value: "dark", label: "Dark", icon: Moon },
                        { value: "system", label: "System", icon: Monitor },
                      ].map((theme) => (
                        <button
                          key={theme.value}
                          type="button"
                          onClick={() => setAppearance({ ...appearance, theme: theme.value })}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                            appearance.theme === theme.value
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50"
                          }`}
                        >
                          <theme.icon className="h-6 w-6" />
                          <span className="text-sm font-medium">{theme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label>Accent Color</Label>
                      <div className="flex gap-3">
                        <Input
                          type="color"
                          value={appearance.accentColor}
                          onChange={(e) => setAppearance({ ...appearance, accentColor: e.target.value })}
                          className="w-14 h-10 p-1 cursor-pointer"
                        />
                        <Input
                          value={appearance.accentColor}
                          onChange={(e) => setAppearance({ ...appearance, accentColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex gap-2">
                        {["#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#EF4444"].map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setAppearance({ ...appearance, accentColor: color })}
                            className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                              appearance.accentColor === color ? "border-foreground scale-110" : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Border Radius</Label>
                      <Select
                        value={appearance.borderRadius}
                        onValueChange={(v) => setAppearance({ ...appearance, borderRadius: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">None (0px)</SelectItem>
                          <SelectItem value="0.375">Small (6px)</SelectItem>
                          <SelectItem value="0.5">Medium (8px)</SelectItem>
                          <SelectItem value="0.75">Large (12px)</SelectItem>
                          <SelectItem value="1">Extra Large (16px)</SelectItem>
                          <SelectItem value="1.5">2XL (24px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Heading Font</Label>
                      <Select
                        value={appearance.fontHeading}
                        onValueChange={(v) => setAppearance({ ...appearance, fontHeading: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="Poppins">Poppins</SelectItem>
                          <SelectItem value="Montserrat">Montserrat</SelectItem>
                          <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                          <SelectItem value="Space Grotesk">Space Grotesk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Body Font</Label>
                      <Select
                        value={appearance.fontBody}
                        onValueChange={(v) => setAppearance({ ...appearance, fontBody: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="Open Sans">Open Sans</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Lato">Lato</SelectItem>
                          <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Visual Effects</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: "enableAnimations", label: "Animations", description: "Enable page transitions and micro-interactions" },
                        { key: "enableSmoothScroll", label: "Smooth Scroll", description: "Smooth scrolling behavior" },
                        { key: "enableGlassEffect", label: "Glass Effect", description: "Enable glassmorphism UI elements" },
                        { key: "enableParticles", label: "Particles", description: "Background particle effects" },
                        { key: "enableCursor", label: "Custom Cursor", description: "Use custom cursor design" },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30"
                        >
                          <div>
                            <span className="text-sm font-medium">{item.label}</span>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch
                            checked={appearance[item.key as keyof typeof appearance] as boolean}
                            onCheckedChange={(checked) => setAppearance({ ...appearance, [item.key]: checked })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Hero Style</Label>
                      <Select
                        value={appearance.heroStyle}
                        onValueChange={(v) => setAppearance({ ...appearance, heroStyle: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="centered">Centered</SelectItem>
                          <SelectItem value="split">Split (Image + Text)</SelectItem>
                          <SelectItem value="fullscreen">Fullscreen</SelectItem>
                          <SelectItem value="animated">Animated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Navbar Style</Label>
                      <Select
                        value={appearance.navbarStyle}
                        onValueChange={(v) => setAppearance({ ...appearance, navbarStyle: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="floating">Floating</SelectItem>
                          <SelectItem value="fixed">Fixed</SelectItem>
                          <SelectItem value="static">Static</SelectItem>
                          <SelectItem value="hidden">Hidden (Hamburger only)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-6">
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
                        value={portfolio.projectsPerPage.toString()}
                        onValueChange={(v) => setPortfolio({ ...portfolio, projectsPerPage: parseInt(v) })}
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
                        value={portfolio.featuredProjectsCount.toString()}
                        onValueChange={(v) => setPortfolio({ ...portfolio, featuredProjectsCount: parseInt(v) })}
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
                        value={portfolio.defaultProjectSort}
                        onValueChange={(v) => setPortfolio({ ...portfolio, defaultProjectSort: v })}
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
                      {["minimal", "modern", "detailed"].map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setPortfolio({ ...portfolio, projectCardStyle: style })}
                          className={`p-4 rounded-xl border-2 transition-all capitalize ${
                            portfolio.projectCardStyle === style
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-primary/50"
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Display Options</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: "showProjectViews", label: "Show View Count", description: "Display number of views on projects" },
                        { key: "showTechStack", label: "Show Tech Stack", description: "Display technologies used in projects" },
                        { key: "showGithubLink", label: "GitHub Link", description: "Show link to source code" },
                        { key: "showDemoLink", label: "Demo Link", description: "Show link to live demo" },
                        { key: "enableProjectFiltering", label: "Enable Filtering", description: "Allow filtering by technology" },
                        { key: "enableProjectSearch", label: "Enable Search", description: "Allow searching projects" },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30"
                        >
                          <div>
                            <span className="text-sm font-medium">{item.label}</span>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch
                            checked={portfolio[item.key as keyof typeof portfolio] as boolean}
                            onCheckedChange={(checked) => setPortfolio({ ...portfolio, [item.key]: checked })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Tab */}
            <TabsContent value="blog" className="space-y-6">
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
                        value={blog.postsPerPage.toString()}
                        onValueChange={(v) => setBlog({ ...blog, postsPerPage: parseInt(v) })}
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
                        value={blog.featuredPostsCount.toString()}
                        onValueChange={(v) => setBlog({ ...blog, featuredPostsCount: parseInt(v) })}
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
                        value={blog.relatedPostsCount.toString()}
                        onValueChange={(v) => setBlog({ ...blog, relatedPostsCount: parseInt(v) })}
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
                        { key: "showReadingTime", label: "Reading Time", description: "Show estimated reading time" },
                        { key: "showViews", label: "View Count", description: "Display post view count" },
                        { key: "showTableOfContents", label: "Table of Contents", description: "Auto-generate TOC from headings" },
                        { key: "showCategories", label: "Categories", description: "Show post categories" },
                        { key: "showTags", label: "Tags", description: "Show post tags" },
                        { key: "showShareButtons", label: "Share Buttons", description: "Enable social sharing" },
                        { key: "showRelatedPosts", label: "Related Posts", description: "Show related posts section" },
                        { key: "enableSearch", label: "Blog Search", description: "Enable search functionality" },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30"
                        >
                          <div>
                            <span className="text-sm font-medium">{item.label}</span>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch
                            checked={blog[item.key as keyof typeof blog] as boolean}
                            onCheckedChange={(checked) => setBlog({ ...blog, [item.key]: checked })}
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
                        <span className="text-sm font-medium">Enable Comments</span>
                        <p className="text-xs text-muted-foreground">Allow readers to comment on posts</p>
                      </div>
                      <Switch
                        checked={blog.enableComments}
                        onCheckedChange={(checked) => setBlog({ ...blog, enableComments: checked })}
                      />
                    </div>
                    {blog.enableComments && (
                      <div className="space-y-2">
                        <Label>Comment System</Label>
                        <Select
                          value={blog.commentSystem}
                          onValueChange={(v) => setBlog({ ...blog, commentSystem: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="giscus">Giscus (GitHub Discussions)</SelectItem>
                            <SelectItem value="utterances">Utterances (GitHub Issues)</SelectItem>
                            <SelectItem value="disqus">Disqus</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
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
                          <span className="text-sm font-medium">Newsletter</span>
                          <p className="text-xs text-muted-foreground">Enable newsletter subscription</p>
                        </div>
                        <Switch
                          checked={blog.enableNewsletter}
                          onCheckedChange={(checked) => setBlog({ ...blog, enableNewsletter: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                        <div className="flex items-center gap-2">
                          <Rss className="h-4 w-4 text-orange-500" />
                          <div>
                            <span className="text-sm font-medium">RSS Feed</span>
                            <p className="text-xs text-muted-foreground">Generate RSS feed</p>
                          </div>
                        </div>
                        <Switch
                          checked={blog.enableRss}
                          onCheckedChange={(checked) => setBlog({ ...blog, enableRss: checked })}
                        />
                      </div>
                    </div>
                    {blog.enableNewsletter && (
                      <div className="space-y-2">
                        <Label>Newsletter Provider</Label>
                        <Select
                          value={blog.newsletterProvider}
                          onValueChange={(v) => setBlog({ ...blog, newsletterProvider: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None (Collect emails only)</SelectItem>
                            <SelectItem value="mailchimp">Mailchimp</SelectItem>
                            <SelectItem value="convertkit">ConvertKit</SelectItem>
                            <SelectItem value="buttondown">Buttondown</SelectItem>
                            <SelectItem value="substack">Substack</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resume Tab */}
            <TabsContent value="resume" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Resume Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your resume/CV section
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Resume/CV File</Label>
                    <div className="flex gap-4">
                      <div className="flex-1 h-24 rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground">Upload PDF resume</span>
                        </div>
                      </div>
                      {resume.resumeUrl && (
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                      <div>
                        <span className="text-sm font-medium">Show Download Button</span>
                        <p className="text-xs text-muted-foreground">Allow visitors to download your resume</p>
                      </div>
                      <Switch
                        checked={resume.showDownloadButton}
                        onCheckedChange={(checked) => setResume({ ...resume, showDownloadButton: checked })}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Resume Sections</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: "showExperience", label: "Work Experience", description: "Show your work history" },
                        { key: "showEducation", label: "Education", description: "Show educational background" },
                        { key: "showSkills", label: "Skills", description: "Show skills section" },
                        { key: "showCertifications", label: "Certifications", description: "Show certifications & courses" },
                        { key: "showLanguages", label: "Languages", description: "Show spoken languages" },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30"
                        >
                          <div>
                            <span className="text-sm font-medium">{item.label}</span>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch
                            checked={resume[item.key as keyof typeof resume] as boolean}
                            onCheckedChange={(checked) => setResume({ ...resume, [item.key]: checked })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Experience Layout</Label>
                      <Select
                        value={resume.experienceLayout}
                        onValueChange={(v) => setResume({ ...resume, experienceLayout: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="timeline">Timeline</SelectItem>
                          <SelectItem value="cards">Cards</SelectItem>
                          <SelectItem value="list">List</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Skills Layout</Label>
                      <Select
                        value={resume.skillsLayout}
                        onValueChange={(v) => setResume({ ...resume, skillsLayout: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bars">Progress Bars</SelectItem>
                          <SelectItem value="tags">Tags</SelectItem>
                          <SelectItem value="grid">Grid</SelectItem>
                          <SelectItem value="categories">Categorized</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
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
                      <span className="text-sm font-medium">Enable Contact Form</span>
                      <p className="text-xs text-muted-foreground">Allow visitors to send you messages</p>
                    </div>
                    <Switch
                      checked={contact.enableContactForm}
                      onCheckedChange={(checked) => setContact({ ...contact, enableContactForm: checked })}
                    />
                  </div>

                  {contact.enableContactForm && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">Contact Email</Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            value={contact.contactEmail}
                            onChange={(e) => setContact({ ...contact, contactEmail: e.target.value })}
                            placeholder="Where to receive messages"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="formspreeId">Formspree ID</Label>
                          <Input
                            id="formspreeId"
                            value={contact.formspreeId}
                            onChange={(e) => setContact({ ...contact, formspreeId: e.target.value })}
                            placeholder="xxxxxxxx"
                          />
                          <p className="text-xs text-muted-foreground">
                            <a href="https://formspree.io" target="_blank" rel="noopener" className="text-primary hover:underline">
                              Get your Formspree ID →
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                        <div>
                          <span className="text-sm font-medium">Spam Protection</span>
                          <p className="text-xs text-muted-foreground">Enable honeypot & rate limiting</p>
                        </div>
                        <Switch
                          checked={contact.enableSpamProtection}
                          onCheckedChange={(checked) => setContact({ ...contact, enableSpamProtection: checked })}
                        />
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="officeAddress">Address</Label>
                      <Textarea
                        id="officeAddress"
                        value={contact.officeAddress}
                        onChange={(e) => setContact({ ...contact, officeAddress: e.target.value })}
                        placeholder="Your office or location address"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="workingHours">Working Hours</Label>
                        <Input
                          id="workingHours"
                          value={contact.workingHours}
                          onChange={(e) => setContact({ ...contact, workingHours: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="responseTime">Response Time</Label>
                        <Input
                          id="responseTime"
                          value={contact.responseTime}
                          onChange={(e) => setContact({ ...contact, responseTime: e.target.value })}
                          placeholder="Usually within 24 hours"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                      <div>
                        <span className="text-sm font-medium">Show Map</span>
                        <p className="text-xs text-muted-foreground">Display Google Maps embed</p>
                      </div>
                      <Switch
                        checked={contact.showMap}
                        onCheckedChange={(checked) => setContact({ ...contact, showMap: checked })}
                      />
                    </div>
                    {contact.showMap && (
                      <div className="space-y-2">
                        <Label htmlFor="mapEmbedUrl">Map Embed URL</Label>
                        <Input
                          id="mapEmbedUrl"
                          value={contact.mapEmbedUrl}
                          onChange={(e) => setContact({ ...contact, mapEmbedUrl: e.target.value })}
                          placeholder="Google Maps embed URL"
                        />
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <span className="text-sm font-medium">Calendly Integration</span>
                          <p className="text-xs text-muted-foreground">Allow booking meetings directly</p>
                        </div>
                      </div>
                      <Switch
                        checked={contact.enableCalendlyIntegration}
                        onCheckedChange={(checked) => setContact({ ...contact, enableCalendlyIntegration: checked })}
                      />
                    </div>
                    {contact.enableCalendlyIntegration && (
                      <div className="space-y-2">
                        <Label htmlFor="calendlyUrl">Calendly URL</Label>
                        <Input
                          id="calendlyUrl"
                          value={contact.calendlyUrl}
                          onChange={(e) => setContact({ ...contact, calendlyUrl: e.target.value })}
                          placeholder="https://calendly.com/username"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-6">
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
                    <Label htmlFor="defaultMetaTitle">Default Meta Title</Label>
                    <Input
                      id="defaultMetaTitle"
                      value={seo.defaultMetaTitle}
                      onChange={(e) => setSeo({ ...seo, defaultMetaTitle: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      {seo.defaultMetaTitle.length}/60 characters (recommended max 60)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultMetaDescription">Default Meta Description</Label>
                    <Textarea
                      id="defaultMetaDescription"
                      value={seo.defaultMetaDescription}
                      onChange={(e) => setSeo({ ...seo, defaultMetaDescription: e.target.value })}
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      {seo.defaultMetaDescription.length}/160 characters (recommended max 160)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultKeywords">Default Keywords</Label>
                    <Input
                      id="defaultKeywords"
                      value={seo.defaultKeywords}
                      onChange={(e) => setSeo({ ...seo, defaultKeywords: e.target.value })}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="canonicalUrl">Canonical URL</Label>
                      <Input
                        id="canonicalUrl"
                        value={seo.canonicalUrl}
                        onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
                        placeholder="https://yourdomain.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitterHandle">Twitter Handle</Label>
                      <Input
                        id="twitterHandle"
                        value={seo.twitterHandle}
                        onChange={(e) => setSeo({ ...seo, twitterHandle: e.target.value })}
                        placeholder="@username"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ogType">Default OG Type</Label>
                    <Select value={seo.ogType} onValueChange={(v) => setSeo({ ...seo, ogType: v })}>
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
                        <span className="text-sm font-medium">Generate Sitemap</span>
                        <p className="text-xs text-muted-foreground">Auto-generate sitemap.xml</p>
                      </div>
                      <Switch
                        checked={seo.enableSitemap}
                        onCheckedChange={(checked) => setSeo({ ...seo, enableSitemap: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                      <div>
                        <span className="text-sm font-medium">Generate Robots.txt</span>
                        <p className="text-xs text-muted-foreground">Auto-generate robots.txt</p>
                      </div>
                      <Switch
                        checked={seo.enableRobotsTxt}
                        onCheckedChange={(checked) => setSeo({ ...seo, enableRobotsTxt: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                    <div>
                      <span className="text-sm font-medium">Two-Factor Authentication</span>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {security.enableTwoFactor ? (
                        <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                          Enabled
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Disabled</Badge>
                      )}
                      <Button variant="outline" size="sm">
                        {security.enableTwoFactor ? "Manage" : "Setup"}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (days)</Label>
                    <Select
                      value={security.sessionTimeout.toString()}
                      onValueChange={(v) => setSecurity({ ...security, sessionTimeout: parseInt(v) })}
                    >
                      <SelectTrigger className="w-full md:w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                    <div>
                      <span className="text-sm font-medium">Login Notifications</span>
                      <p className="text-xs text-muted-foreground">Get notified of new login attempts</p>
                    </div>
                    <Switch
                      checked={security.enableLoginNotifications}
                      onCheckedChange={(checked) => setSecurity({ ...security, enableLoginNotifications: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allowedIps">Allowed IP Addresses</Label>
                    <Textarea
                      id="allowedIps"
                      value={security.allowedIps}
                      onChange={(e) => setSecurity({ ...security, allowedIps: e.target.value })}
                      placeholder="Leave empty to allow all IPs. One IP per line."
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      Restrict admin access to specific IP addresses
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-destructive">Danger Zone</h4>
                    <div className="p-4 rounded-xl border border-destructive/50 bg-destructive/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">Delete Account</span>
                          <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose what notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <div className="space-y-4">
                      {[
                        { key: "emailOnNewContact", label: "New Contact Form Submission", description: "When someone sends you a message" },
                        { key: "emailOnNewComment", label: "New Blog Comment", description: "When someone comments on your blog" },
                        { key: "emailOnNewSubscriber", label: "New Newsletter Subscriber", description: "When someone subscribes to your newsletter" },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30"
                        >
                          <div>
                            <span className="text-sm font-medium">{item.label}</span>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch
                            checked={notifications[item.key as keyof typeof notifications] as boolean}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Email Digest Frequency</Label>
                      <Select
                        value={notifications.digestFrequency}
                        onValueChange={(v) => setNotifications({ ...notifications, digestFrequency: v })}
                      >
                        <SelectTrigger className="w-full md:w-64">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instant">Instant</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Digest</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                    <div>
                      <span className="text-sm font-medium">Push Notifications</span>
                      <p className="text-xs text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={notifications.enablePushNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, enablePushNotifications: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayoutWrapper>
    </ProtectedRoute>
  );
}
