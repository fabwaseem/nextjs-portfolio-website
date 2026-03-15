# Deployment Guide

This guide covers deploying the Next.js Portfolio & Blog Platform to various hosting platforms.

## Prerequisites

Before deploying:

- ✅ Test locally and ensure everything works
- ✅ Set up a production PostgreSQL database
- ✅ Configure AWS S3 bucket (if using)
- ✅ Prepare all environment variables
- ✅ Push your code to GitHub

## Vercel (Recommended)

Vercel is the easiest and recommended platform for Next.js applications.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fabwaseem/nextjs-portfolio-website)

### Manual Deployment

1. **Push to GitHub**

```bash
git add .
git commit -m "feat: ready for deployment"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Environment Variables**

Add these in Vercel dashboard:

```env
BETTER_AUTH_SECRET=your-production-secret
NEXT_PUBLIC_BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
DATABASE_URL=your-production-database-url
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket
AWS_S3_UPLOAD_PREFIX=portfolio/
OPENAI_API_KEY=your-openai-key
```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live!

5. **Run Database Migrations**

After first deployment, run migrations:

- Go to Vercel Dashboard → Your Project → Settings → Functions
- Or use Vercel CLI:

```bash
vercel env pull .env.production
npx prisma migrate deploy
```

6. **Create Admin User**

Use Vercel CLI to run the script:

```bash
vercel env pull
npm run create-admin
```

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Update environment variables with new domain

---

## Netlify

### Deployment Steps

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: `netlify/functions`

2. **Environment Variables**

Add all environment variables in Netlify dashboard.

3. **netlify.toml Configuration**

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

4. **Deploy**

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## Railway

Railway provides easy PostgreSQL setup and deployment.

### Deployment Steps

1. **Create Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL**
   - Click "New"
   - Select "Database"
   - Choose "PostgreSQL"
   - Copy the DATABASE_URL

4. **Configure Environment Variables**

Add all variables in Railway dashboard.

5. **Deploy**

Railway will automatically deploy on push to main branch.

---

## DigitalOcean App Platform

### Deployment Steps

1. **Create App**
   - Go to [DigitalOcean](https://www.digitalocean.com)
   - Click "Create" → "Apps"
   - Connect GitHub repository

2. **Configure Build**
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - HTTP Port: 3000

3. **Add Database**
   - Add PostgreSQL database component
   - Copy connection string

4. **Environment Variables**

Add all variables in App settings.

5. **Deploy**

Click "Deploy" and wait for completion.

---

## Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/portfolio
    depends_on:
      - db
    env_file:
      - .env

  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: portfolio
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Deploy

```bash
docker-compose up -d
```

---

## AWS (EC2 + RDS)

### Setup Steps

1. **Create RDS PostgreSQL Instance**
   - Go to AWS RDS Console
   - Create PostgreSQL database
   - Note connection details

2. **Create EC2 Instance**
   - Launch Ubuntu 22.04 instance
   - Configure security groups (ports 22, 80, 443, 3000)

3. **SSH into EC2**

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

4. **Install Dependencies**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

5. **Clone and Setup**

```bash
git clone https://github.com/fabwaseem/nextjs-portfolio-website.git
cd nextjs-portfolio-website
npm install
```

6. **Configure Environment**

```bash
cp .env.example .env
nano .env
# Add your production variables
```

7. **Build and Start**

```bash
npm run build
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

8. **Configure Nginx**

Create `/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

9. **SSL with Let's Encrypt**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Post-Deployment Checklist

After deploying to any platform:

- [ ] Verify site is accessible
- [ ] Test admin login
- [ ] Check database connection
- [ ] Test image uploads
- [ ] Verify email notifications
- [ ] Test contact form
- [ ] Check all pages load correctly
- [ ] Test responsive design
- [ ] Verify SEO meta tags
- [ ] Check SSL certificate
- [ ] Test performance (Lighthouse)
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Update DNS records
- [ ] Test AI features (if enabled)

---

## Environment Variables Reference

### Required

```env
BETTER_AUTH_SECRET=              # Min 32 characters
NEXT_PUBLIC_BETTER_AUTH_URL=     # Your site URL
NEXT_PUBLIC_BASE_URL=            # Your site URL
DATABASE_URL=                    # PostgreSQL connection string
```

### Email (Required for contact form)

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

### AWS S3 (Optional)

```env
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET_NAME=
AWS_S3_UPLOAD_PREFIX=
```

### OpenAI (Optional)

```env
OPENAI_API_KEY=
```

---

## Monitoring & Maintenance

### Vercel Analytics

Enable in Vercel dashboard for free analytics.

### Error Tracking

Consider integrating:

- [Sentry](https://sentry.io)
- [LogRocket](https://logrocket.com)
- [Datadog](https://www.datadoghq.com)

### Database Backups

- **Vercel Postgres**: Automatic backups
- **Railway**: Automatic backups
- **AWS RDS**: Configure automated backups
- **Manual**: Use `pg_dump` for backups

```bash
pg_dump $DATABASE_URL > backup.sql
```

### Updates

Keep dependencies updated:

```bash
npm update
npm audit fix
```

---

## Troubleshooting

### Build Fails

- Check Node.js version (18+)
- Verify all environment variables
- Check for TypeScript errors
- Review build logs

### Database Connection Issues

- Verify DATABASE_URL format
- Check database is accessible
- Ensure migrations are run
- Check firewall rules

### Images Not Loading

- Verify AWS credentials
- Check S3 bucket permissions
- Ensure CORS is configured
- Check bucket policy

### Performance Issues

- Enable caching
- Optimize images
- Use CDN
- Enable compression
- Monitor database queries

---

## Support

Need help with deployment?

- 📖 [Documentation](README.md)
- 🐛 [Report Issues](https://github.com/fabwaseem/nextjs-portfolio-website/issues)
- 💬 [Discussions](https://github.com/fabwaseem/nextjs-portfolio-website/discussions)

---

**Happy Deploying! 🚀**
