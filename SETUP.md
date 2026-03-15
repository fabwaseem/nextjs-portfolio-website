# Setup Guide

This guide will help you set up the Next.js Portfolio & Blog Platform on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **PostgreSQL** 14.x or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))

Optional but recommended:

- **AWS Account** (for S3 image storage)
- **OpenAI API Key** (for AI features)
- **Gmail Account** (for email notifications)

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/fabwaseem/nextjs-portfolio-website.git
cd nextjs-portfolio-website
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Prisma, and other dependencies.

### 3. Set Up PostgreSQL Database

#### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:

```sql
CREATE DATABASE portfolio;
```

3. Note your connection details:
   - Host: `localhost`
   - Port: `5432` (default)
   - Username: `postgres` (or your username)
   - Password: your password
   - Database: `portfolio`

#### Option B: Cloud PostgreSQL (Recommended for Production)

Use a managed PostgreSQL service:

- [Neon](https://neon.tech/) - Free tier available
- [Supabase](https://supabase.com/) - Free tier available
- [Railway](https://railway.app/) - Free tier available
- [Vercel Postgres](https://vercel.com/storage/postgres)

### 4. Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit `.env` and fill in your values:

```env
# Authentication Secret (generate a random string)
BETTER_AUTH_SECRET=your-super-secret-key-min-32-chars
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Site URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Database Connection
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio

# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password

# AWS S3 Configuration (Optional)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_S3_UPLOAD_PREFIX=portfolio/

# OpenAI API (Optional - for AI features)
OPENAI_API_KEY=sk-your-openai-api-key
```

### 5. Generate Authentication Secret

Generate a secure random string for `BETTER_AUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 6. Set Up Gmail for Email Notifications

1. Enable 2-Step Verification in your Google Account
2. Generate an App Password:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Select "2-Step Verification"
   - Scroll to "App passwords"
   - Generate a new app password
   - Use this password in `SMTP_PASS`

### 7. Set Up AWS S3 (Optional)

If you want to use AWS S3 for image storage:

1. Create an AWS account
2. Create an S3 bucket:
   - Go to AWS S3 Console
   - Click "Create bucket"
   - Choose a unique name
   - Select your region
   - Uncheck "Block all public access" (configure properly for production)
   - Create bucket

3. Create IAM user with S3 access:
   - Go to IAM Console
   - Create new user
   - Attach policy: `AmazonS3FullAccess` (or create custom policy)
   - Save Access Key ID and Secret Access Key

4. Configure CORS for your bucket:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
    "ExposeHeaders": []
  }
]
```

### 8. Run Database Migrations

```bash
npx prisma migrate deploy
npx prisma generate
```

This will:

- Create all necessary database tables
- Generate Prisma Client for database access

### 9. Create Admin User

```bash
npm run create-admin
```

Follow the prompts to create your admin account. Remember these credentials!

### 10. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Verification

### Check if Everything Works

1. **Frontend**: Visit [http://localhost:3000](http://localhost:3000)
2. **Admin Panel**: Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
3. **Login**: Use the admin credentials you created
4. **Create Content**: Try creating a blog post or project

## Common Issues

### Database Connection Error

**Error**: `Can't reach database server`

**Solution**:

- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists
- Check firewall settings

### Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:

```bash
# Kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use a different port:
PORT=3001 npm run dev
```

### Prisma Client Not Generated

**Error**: `Cannot find module '@prisma/client'`

**Solution**:

```bash
npx prisma generate
```

### Email Not Sending

**Error**: Email notifications not working

**Solution**:

- Verify SMTP credentials
- Use App Password for Gmail (not regular password)
- Check firewall/antivirus settings
- Test with a different email provider

### Image Upload Failing

**Error**: Image upload not working

**Solution**:

- Verify AWS credentials
- Check S3 bucket permissions
- Ensure CORS is configured
- Check bucket policy

## Optional Setup

### Seed Database with Sample Data

```bash
# Create sample projects
npm run create-test-project

# Create sample testimonials
npm run create-test-testimonials
```

### Enable Type Checking

```bash
npm run typecheck
```

### Run Linter

```bash
npm run lint
```

## Production Deployment

See [README.md](README.md#-deployment) for deployment instructions.

## Need Help?

- 📖 Check the [README](README.md)
- 🐛 [Report an issue](https://github.com/fabwaseem/nextjs-portfolio-website/issues)
- 💬 [Start a discussion](https://github.com/fabwaseem/nextjs-portfolio-website/discussions)

## Next Steps

After setup:

1. Customize site settings in Admin Panel
2. Add your personal information
3. Create your first blog post
4. Add your projects
5. Customize the theme and styling
6. Deploy to production

Happy coding! 🚀
