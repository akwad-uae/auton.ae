# Deploying to Vercel

This project is configured for full-stack deployment on Vercel with:
- React SPA frontend (static files)
- Express API endpoints (serverless functions)

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)
- pnpm installed locally

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Connect Your Repository

1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect the configuration from `vercel.json`

### Step 2: Configure Environment Variables

Add these environment variables in Vercel:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

**Required for EmailJS (Contact Form):**
- `VITE_EMAILJS_SERVICE_ID` - Your EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID` - Your EmailJS template ID
- `VITE_EMAILJS_PUBLIC_KEY` - Your EmailJS public key

**Optional:**
- `PING_MESSAGE` - Custom message for `/api/ping` endpoint

3. Make sure to add them for all environments (Production, Preview, Development)

> See `EMAILJS_SETUP.md` for EmailJS configuration details

### Step 3: Deploy

1. Click **Deploy**
2. Wait for the build to complete
3. Your app will be live at `https://your-project.vercel.app`

### Step 4: Verify Deployment

After deployment completes:
1. Test your frontend: `https://your-project.vercel.app`
2. Test API endpoint: `https://your-project.vercel.app/api/ping`
3. Test contact form functionality

## Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
pnpm add -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Quick Deployment Checklist

Before deploying, make sure:
- [ ] All code is committed to Git
- [ ] `vercel.json` is configured (already done ✅)
- [ ] `api/index.ts` serverless function exists (already done ✅)
- [ ] Environment variables are ready (EmailJS keys)
- [ ] `.env` file is in `.gitignore` (don't commit secrets!)
- [ ] Test build locally: `pnpm run build`

## How It Works

### Frontend (Static Files)
- Built with Vite → outputs to `dist/spa`
- Served as static files from Vercel's CDN
- All routes handled by React Router (SPA mode)

### Backend (Serverless Functions)
- Express app wrapped with `serverless-http`
- Located in `api/index.ts`
- API routes accessible at `/api/*`
- Automatically scales with Vercel's serverless infrastructure

### Configuration Files

**vercel.json:**
- Defines build settings and output directory
- Routes `/api/*` requests to serverless function
- Routes all other requests to `index.html` (SPA mode)

**api/index.ts:**
- Serverless function wrapper for Express app
- Handles all API endpoints defined in `server/index.ts`

## API Endpoints

After deployment, your API will be available at:
- `GET /api/ping` - Health check
- `GET /api/demo` - Demo endpoint
- `POST /api/contact` - Contact form submission

## Vercel Project Settings

If you need to manually configure:

**Build & Development Settings:**
- **Framework Preset**: `Vite`
- **Build Command**: `pnpm run build:client`
- **Output Directory**: `dist/spa`
- **Install Command**: `pnpm install`

## Troubleshooting

### 404 Errors on Routes
- Check that `vercel.json` rewrites are configured correctly
- Verify build output exists in `dist/spa`
- Clear build cache: Settings → General → Clear Build Cache

### API Endpoints Not Working
- Check serverless function logs in Vercel dashboard
- Verify environment variables are set
- Check that `serverless-http` is in dependencies

### Build Failures
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Make sure pnpm lockfile is committed

## Expected Result

After successful deployment:
- **Frontend**: `https://your-app.vercel.app/` ✅
- **API**: `https://your-app.vercel.app/api/ping` ✅
- All SPA routes work without 404 errors ✅
- Contact form submits to serverless API ✅
