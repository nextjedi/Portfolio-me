# Claude Session Instructions & History

This file contains important context and instructions for future Claude Code sessions working on this portfolio project.

## 🎯 Project Current State

### ✅ Completed Features
- **Navigation Component**: Fixed initial visibility with fallback navigation items
- **Projects Section**: "View More" functionality showing 4 projects by default with inline expansion
- **Hero Section**: Redesigned with content left, image right, removed filters, fixed metrics visibility
- **Achievements Section**: Added between Story and Projects with competitive programming credentials
- **SEO Implementation**: Dynamic meta tags, structured data (JSON-LD), sitemap.xml, robots.txt
- **Reference Resolution System**: Eliminates data duplication in portfolio.json using @shared.xxx pattern
- **GitHub Actions CI/CD**: Automatic deployment pipeline to Vercel on master branch pushes
- **Domain Configuration**: All references updated to arunabh.me domain

### 🏗️ Architecture Overview
- **Angular 20 Standalone Components** with signal-based state management
- **Hierarchical Data Structure** in `public/data/portfolio.json` with zero repetition
- **Smart Navigation** that works across all routes with smooth scrolling
- **Professional Project Detail Pages** with SEO-friendly URL slugs
- **Mobile-Responsive Design** with Material Design integration

## 🚀 Deployment Status

### GitHub Actions Pipeline
- **File**: `.github/workflows/deploy.yml`
- **Triggers**: Every push to `master` branch + manual dispatch
- **Process**: Install dependencies → Build → Deploy to Vercel production

### Required Setup (Manual Steps)
These steps need to be completed manually as they require external service authentication:

1. **Get Vercel Credentials**:
   ```bash
   npx vercel link
   # Check .vercel/project.json for ORG_ID and PROJECT_ID
   ```

2. **Create Vercel Token**:
   - Visit: https://vercel.com/account/tokens
   - Create new token with deployment scope

3. **Add GitHub Secrets** (Repo → Settings → Secrets and Variables → Actions):
   - `VERCEL_TOKEN` = (from step 2)
   - `VERCEL_ORG_ID` = (from .vercel/project.json)
   - `VERCEL_PROJECT_ID` = (from .vercel/project.json)

4. **Test Deployment**:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push origin master
   ```

## 📋 Key User Feedback & Requirements

### Navigation Fixes
- Navigation must be visible immediately on page load (not invisible initially)
- Implemented fallback navigation items while data loads

### Projects Section Updates  
- Changed "View All Projects" to "View More" 
- Default shown projects: 4 (not 3)
- Button only appears when more than 4 projects exist
- Projects expand inline (not in dialog)

### Hero Section Requirements
- Content left, image right layout
- Remove all filter effects from hero section
- Metrics text must be visible (primary green, not white)
- Three buttons must stay in single line
- Background gradient: #f8fafc to #e2e8f0

### Domain & Deployment
- Domain: **arunabh.me** (not arunabhpriyadarshi.com)
- All portfolio.json references updated accordingly
- Master branch contains production-ready code

## 🔧 Development Commands

```bash
# Start development server
npm start
ng serve

# Build for production  
npm run build
ng build

# Run tests
npm test
ng test

# Watch build
npm run watch
ng build --watch --configuration development
```

## 📁 Critical Files & Their Purpose

### Data & Configuration
- `public/data/portfolio.json` - All portfolio content with reference system
- `vercel.json` - Deployment configuration with security headers
- `.github/workflows/deploy.yml` - CI/CD pipeline for automatic deployment

### Core Components
- `src/components/navigation.component.ts` - Smart navigation with fallback items
- `src/components/projects.component.ts` - Projects with View More functionality
- `src/components/hero.component.ts` - Redesigned hero section
- `src/components/achievements.component.ts` - Competitive programming achievements

### Services
- `src/services/portfolio.service.ts` - Central data service with reference resolution
- `src/services/seo.service.ts` - Dynamic meta tags and structured data
- `src/services/analytics.service.ts` - Google Analytics 4 integration

### SEO & Marketing
- `public/sitemap.xml` - All project URLs for search engines
- `public/robots.txt` - Search engine directives
- `DEPLOYMENT.md` - Comprehensive deployment guide

## 🚨 Important Notes for Future Sessions

### Never Do
- **DO NOT** create new files unless absolutely necessary (always prefer editing existing)
- **DO NOT** create documentation files unless explicitly requested
- **DO NOT** commit changes unless user explicitly asks
- **DO NOT** assume libraries are available - always check existing usage first

### Always Do
- **ALWAYS** use TodoWrite tool to plan and track tasks
- **ALWAYS** check existing code conventions before making changes
- **ALWAYS** run lint and typecheck commands after major changes
- **ALWAYS** follow the reference resolution system for portfolio.json updates

### Code Patterns
- Use Angular 20 standalone components exclusively
- Leverage signals for reactive state management
- Follow the @shared.xxx reference pattern in portfolio.json
- Maintain mobile-first responsive design approach

## 📊 Performance & SEO Status

### Already Implemented
- ✅ Dynamic meta tags for all pages
- ✅ Structured data (JSON-LD) for professional profile
- ✅ Sitemap with all project detail pages
- ✅ Security headers in Vercel configuration
- ✅ Lazy loading and intersection observers
- ✅ Mobile-responsive design

### Expected Metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

## 🎯 Common User Requests & Solutions

### "Navigation not visible on load"
**Solution**: Already fixed with fallback navigation items in navigation.component.ts lines 40-45 and 86-91

### "Projects showing 3 instead of 4" 
**Solution**: Updated getFeaturedProjects(4) in portfolio.service.ts line 566

### "View All button style inconsistent"
**Solution**: Implemented proper button styling in projects.component.ts with View More functionality

### "Resume download not working"
**Solution**: Ensure resume path uses leading slash: `/assets/resume/Arunabh-Priyadarshi-Resume.pdf`

### "Text not visible in hero section"
**Solution**: Updated metric text colors to var(--color-primary) instead of white

## 🔄 Git Workflow

### Current Branch Status
- **Master**: Production-ready code with all features merged
- **Previous Work**: All changes from bugfix/portfolio-fixes merged with overwrite

### For Future Development
1. Create feature branch from master
2. Make changes and test thoroughly
3. Use TodoWrite to track progress
4. Merge to master when user requests
5. Automatic deployment will trigger via GitHub Actions

---

**Last Updated**: Based on conversation ending with successful master branch merge and GitHub Actions setup
**Next Manual Step**: Configure Vercel secrets in GitHub repository settings