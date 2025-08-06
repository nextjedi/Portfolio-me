# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
- `npm start` or `ng serve` - Start development server at http://localhost:4200/
- `npm install` - Install project dependencies

### Build
- `npm run build` or `ng build` - Build the project (artifacts in dist/ directory)
- `ng build --prod --aot` - Production build with ahead-of-time compilation

### Testing
- `npm test` or `ng test` - Run unit tests via Karma
- `npm run e2e` or `ng e2e` - Run end-to-end tests via Protractor

### Linting
- `npm run lint` or `ng lint` - Run TSLint to check code style

### Other Angular CLI Commands
- `ng generate component component-name` - Generate a new component
- `ng generate directive|pipe|service|class|guard|interface|enum|module` - Generate other Angular artifacts

## Architecture Overview

This is an Angular 6 portfolio website that displays personal information, skills, experience, education, awards, and contact details.

### Key Components Structure

1. **Layout Component** (`src/app/layout/layout.component.ts`) - Main container component that:
   - Manages responsive sidenav behavior
   - Initializes all portfolio data (currently hardcoded in the component)
   - Contains data for awards, contacts, education, experiences, and skills

2. **Section Components**:
   - **About** - Personal introduction section
   - **Experience** - Work experience with company details and descriptions
   - **Skills** - Technical skills organized by categories with icons
   - **Education** - Educational background
   - **Awards** - Achievements and certifications
   - **Contact** - Contact information with links
   - **Projects** - Portfolio projects display

3. **Card Components**:
   - `experience-card`, `skill-card`, `award-card`, `education-card` - Reusable components for displaying individual items

4. **Material Design Integration**:
   - Uses Angular Material components via `MaterialModuleModule`
   - Implements responsive layout with Angular Flex Layout
   - Custom material theme configuration in `src/theme.scss`

### Data Flow

- Portfolio data is currently initialized in `layout.component.ts` through hardcoded methods
- There's also a `data.json` file in `src/app/data/` that contains the same information but appears to be unused
- Data models are defined in various `.model.ts` files throughout the component folders

### Deployment

The project includes AWS CodeBuild configuration (`buildspec.yml`) for automated deployment to S3 bucket `arunabh.me`.

### Important Notes

- The project uses Angular 6 with TypeScript 2.9.2 (legacy versions)
- Responsive design implemented using Angular Flex Layout and Material sidenav
- Image assets stored in `src/assets/images/` organized by category