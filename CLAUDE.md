# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Arunabh Priyadarshi (Senior Software Engineer) built with Angular 20. The project is currently on the `fresh-angular-redesign` branch and represents a complete redesign from an older Angular implementation to a modern Angular standalone components architecture.

The portfolio showcases enterprise software development experience, with sections for:
- Hero section with professional metrics and CTAs
- Personal story and background
- Featured projects with case studies
- Blog integration (Medium RSS)
- Contact information and availability status

## Development Commands

```bash
# Start development server
npm start
# or
ng serve

# Build for production
npm run build
# or 
ng build

# Run tests
npm test
# or
ng test

# Watch build (development mode)
npm run watch
```

## Project Architecture

### Current State (Angular 20 Standalone)
- **Main Component**: `src/app/app.ts` - Root component using signals and standalone architecture
- **Routing**: `src/app/app.routes.ts` - Currently empty, single-page application
- **Configuration**: `src/app/app.config.ts` - Application providers and configuration
- **Styling**: Global styles in `src/styles.css`

### Design Requirements
The instruction file (`instruction.htm`) contains comprehensive design specifications including:
- **Color Palette**: Primary dark green (#1a472a), accent red (#e74c3c), success green (#27ae60)
- **Typography**: Inter font family with specific size scales (48px hero, 32px sections, 24px cards)
- **Component Structure**: Hero, story, projects, blog, and contact sections
- **Responsive Design**: Mobile-first approach with specific breakpoints

### Key Implementation Notes
- Uses Angular 20 with standalone components (no NgModule)
- Implements signals for reactive state management
- Requires integration with Medium RSS feed for blog posts
- Needs professional assets (headshot, project screenshots, resume PDF)
- Targets enterprise audience with focus on revenue impact and technical leadership

### Removed Legacy Components
The git status shows many deleted files from the previous implementation, indicating this is a fresh rewrite. The old structure included:
- Component-based architecture with separate modules
- Material Design components
- Multiple route-based pages
- Legacy Angular patterns (pre-standalone)

## Allowed Tools

When working with this codebase, these tools and dependencies are approved:

### Core Framework
- Angular 20 (latest stable version)
- Angular CLI for scaffolding and builds
- TypeScript
- RxJS for reactive programming

### Styling & UI
- CSS3 with CSS Grid and Flexbox
- Angular Animations
- No specific UI library required (custom implementation preferred)

### Development Tools
- Angular DevKit
- Karma + Jasmine for testing
- Angular build system
- Standard Angular development server
- Bash commands for file operations, git, npm, and Angular CLI
- File editing tools (Read, Write, Edit, MultiEdit) for all project files

### External Integrations
- Medium RSS API (via rss2json.com) for blog posts
- Standard HTTP client for API calls

### Assets & Content
- Professional headshot image
- Project screenshots/mockups  
- Resume PDF
- Icon assets (FontAwesome or similar if needed)

## Development Guidelines

When working on this project:
1. **Use standalone components** - Follow Angular 20 patterns, not legacy module-based architecture
2. **Implement responsive design** - Mobile-first approach with the specified breakpoints
3. **Follow color scheme** - Stick to the defined palette in the instruction file
4. **Focus on performance** - Target 90+ Lighthouse score
5. **Professional presentation** - This is a senior engineer's portfolio targeting enterprise roles
6. **Stick to approved tools** - Only use dependencies and tools listed in the allowed tools section

## Missing Implementation

The current codebase is minimal and needs full implementation of:
- Component structure (hero, story, projects, blog, contact)
- Medium RSS integration service
- Asset management (images, resume, project screenshots)
- Responsive styling with the specified design system
- Production deployment configuration