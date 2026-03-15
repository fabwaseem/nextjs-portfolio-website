# 🚀 Next.js Portfolio & Blog Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.2-2D3748?style=for-the-badge&logo=prisma)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Themes](https://img.shields.io/badge/Themes-178+-purple?style=for-the-badge)

**A modern, feature-rich portfolio and blog platform with 178+ themes built with Next.js 16, TypeScript, and Prisma**

[Live Demo](https://fabwaseem.vercel.app) · [Report Bug](https://github.com/fabwaseem/nextjs-portfolio-website/issues) · [Request Feature](https://github.com/fabwaseem/nextjs-portfolio-website/issues) · [View Themes](THEMES.md) · [Highlights](HIGHLIGHTS.md)

</div>

---

## ✨ Features

### 🎨 Modern Design & Theming

- **178+ Beautiful Themes** - Massive collection of pre-built color schemes
- **One-click theme switching** - Change your entire site's look instantly
- **VS Code-inspired UI** with sleek, developer-friendly interface
- **Dark/Light mode** variants for each theme
- **Fully responsive** design that works on all devices
- **GSAP animations** for engaging user experience
- **Custom cursor effects** and interactive elements
- **Theme categories**: Vibrant, Pastel, Dark, Light, Nature, Neon, and more

### 📝 Content Management

- **Full-featured blog** with categories, tags, and search
- **Project showcase** with filtering and sorting
- **Rich text editor** with markdown support
- **Image upload** to AWS S3 with presigned URLs
- **SEO optimization** with meta tags, Open Graph, and JSON-LD
- **Reading time** and **view counter** for blog posts
- **Featured content** highlighting
- **Draft/Published/Archived** status management

### 🤖 AI-Powered Features

- **AI blog generation** using OpenAI GPT
- **Automatic SEO optimization** for projects and blogs
- **Smart content suggestions**

### 👨‍💼 Admin Dashboard

- **Secure authentication** with Better Auth
- **Complete CRUD operations** for blogs, projects, testimonials
- **Category and tag management**
- **Settings panel** for site configuration
- **Analytics dashboard** with view statistics
- **Bulk operations** and content management

### 🎯 Portfolio Features

- **Project showcase** with demo links and GitHub integration
- **Tech stack display** with icons
- **Video integration** (YouTube support)
- **Testimonials section**
- **Experience timeline**
- **Skills showcase**
- **Contact form** with email notifications

### 🔧 Developer Experience

- **TypeScript** for type safety
- **ESLint** and **Prettier** for code quality
- **Husky** git hooks for pre-commit checks
- **Conventional Commits** enforcement
- **Hot reload** development
- **Prisma ORM** for database management

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Animations
- **GSAP** - Advanced animations
- **Radix UI** - Accessible components
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend

- **Next.js API Routes** - Serverless functions
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Better Auth** - Authentication
- **Nodemailer** - Email service

### Services

- **AWS S3** - Image storage
- **OpenAI API** - AI content generation
- **YouTube API** - Video integration

### DevOps

- **Vercel** - Deployment platform
- **Husky** - Git hooks
- **ESLint** - Code linting
- **Commitlint** - Commit message linting

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- AWS S3 bucket (for image uploads)
- OpenAI API key (optional, for AI features)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/fabwaseem/nextjs-portfolio-website.git
cd nextjs-portfolio-website
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Authentication
BETTER_AUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket-name

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# OpenAI (Optional)
OPENAI_API_KEY=your-openai-key

# Site URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Set up the database**

```bash
npx prisma migrate deploy
npx prisma generate
```

5. **Create an admin user**

```bash
npm run create-admin
```

6. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

---

## 📖 Usage

### Admin Panel

Access the admin panel at `/admin/login` and use the credentials you created.

**Admin Features:**

- 📝 Create and manage blog posts
- 🎨 Manage projects with images and videos
- 💬 Add and organize testimonials
- 🏷️ Create categories and tags
- ⚙️ Configure site settings
- 📊 View analytics and statistics

### Content Management

#### Creating a Blog Post

1. Navigate to `/admin/blog/new`
2. Fill in the title, excerpt, and content
3. Add categories and tags
4. Upload a featured image
5. Use AI to generate content (optional)
6. Publish or save as draft

#### Adding a Project

1. Go to `/admin/projects/new`
2. Enter project details
3. Add tech stack, demo link, and GitHub link
4. Upload thumbnail and cover images
5. Optionally add a YouTube video
6. Publish when ready

### Customization

#### Changing Themes

The platform includes 178+ pre-built themes! Change your site's entire look with one click:

1. Go to `/admin/settings`
2. Navigate to "Theme Settings"
3. Browse through available themes
4. Click on any theme to preview
5. Save to apply

**Popular Themes:**

- Aurora Borealis - Northern lights inspired
- Matrix - Classic green terminal
- Sunset - Warm evening colors
- Ocean Breeze - Cool blue tones
- Cherry Blossom - Soft pink aesthetics
- Midnight Oil - Deep dark theme
- Golden Hour - Warm golden tones
- And 171+ more!

**Theme Categories:**

- 🌈 Vibrant (Neon, Spectrum, Joker)
- 🌸 Pastel (Blush, Lavender, Peach)
- 🌑 Dark (Obsidian, Midnight, Abyss)
- ☀️ Light (Snow, Pearl, Vanilla)
- 🌿 Nature (Forest, Moss, Bamboo)
- 🎨 Artistic (Chaos Theory, Witch Girl, Godspeed)

#### Changing Site Information

Edit `app/layout.tsx` to update:

- Site name and title
- Meta description
- Social links
- SEO keywords

#### Styling

- Modify `app/globals.css` for global styles
- Update Tailwind config in `tailwind.config.ts`
- Customize components in `components/` directory

#### Theme

The project uses a VS Code-inspired theme. To customize:

- Edit color variables in `globals.css`
- Modify theme provider in `components/providers/theme-provider.tsx`

---

## 📁 Project Structure

```
nextjs-portfolio-website/
├── app/                      # Next.js app directory
│   ├── (pages)/             # Page routes
│   │   ├── (web)/          # Public pages
│   │   └── admin/          # Admin dashboard
│   ├── api/                # API routes
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── admin/              # Admin components
│   ├── layouts/            # Layout components
│   ├── providers/          # Context providers
│   └── ui/                 # UI components (Radix)
├── lib/                    # Utility functions
├── prisma/                 # Database schema
├── public/                 # Static assets
├── scripts/                # Utility scripts
└── config/                 # Configuration files
```

---

## 🔒 Security

- **Authentication** via Better Auth with secure session management
- **Environment variables** for sensitive data
- **Input validation** with Zod schemas
- **SQL injection protection** via Prisma ORM
- **XSS protection** with React's built-in sanitization
- **CSRF protection** on API routes

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fabwaseem/nextjs-portfolio-website)

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**
- **Railway**
- **Render**
- **AWS Amplify**
- **DigitalOcean App Platform**

Make sure to:

1. Set all environment variables
2. Run database migrations
3. Configure build command: `npm run build`
4. Set start command: `npm start`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your commits follow [Conventional Commits](https://www.conventionalcommits.org/).

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Waseem Anjum**

- Website: [waseemanjum.com](https://waseemanjum.com)
- GitHub: [@fabwaseem](https://github.com/fabwaseem)
- LinkedIn: [fabwaseem](https://linkedin.com/in/fabwaseem)
- Twitter: [@fabwaseeem](https://twitter.com/fabwaseeem)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [Better Auth](https://www.better-auth.com/) - Authentication

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/fabwaseem/nextjs-portfolio-website?style=social)
![GitHub forks](https://img.shields.io/github/forks/fabwaseem/nextjs-portfolio-website?style=social)
![GitHub issues](https://img.shields.io/github/issues/fabwaseem/nextjs-portfolio-website)
![GitHub pull requests](https://img.shields.io/github/issues-pr/fabwaseem/nextjs-portfolio-website)

---

<div align="center">

**If you find this project helpful, please give it a ⭐️!**

Made with ❤️ by [Waseem Anjum](https://github.com/fabwaseem)

</div>
