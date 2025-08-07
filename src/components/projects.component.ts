import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { PortfolioService } from '../services/portfolio.service';
import { Project } from '../models/portfolio.interface';
import { ProjectCardComponent } from './project-card.component';

type ProjectCategory = 'professional' | 'side-project' | 'freelance';

interface CategoryInfo {
  key: ProjectCategory | 'all';
  label: string;
  count: number;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTabsModule, ProjectCardComponent],
  template: `
    <section class="projects-section section" id="projects">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Projects</h2>
          <p class="section-subtitle">
            Enterprise solutions, side projects, and freelance work
          </p>
        </div>

        @if (allProjects() && allProjects()!.length > 0) {
          
          <!-- Category Tabs - Only show if multiple categories exist -->
          @if (shouldShowCategories()) {
            <div class="category-tabs">
              <mat-tab-group 
                [selectedIndex]="selectedCategoryIndex()"
                (selectedIndexChange)="onCategoryChange($event)"
                mat-align-tabs="center"
                animationDuration="300ms">
                @for (category of availableCategories(); track category.key) {
                  <mat-tab [label]="category.label + ' (' + category.count + ')'">
                  </mat-tab>
                }
              </mat-tab-group>
            </div>
          }

          <!-- Projects Grid -->
          <div class="projects-grid" 
               [class.visible]="isVisible">
            @for (project of filteredProjects(); track project.id) {
              <app-project-card 
                [project]="project"
                [isVisible]="isVisible"
                [animationDelay]="($index * 0.2) + 's'"
              />
            }
          </div>

          <!-- View All Projects Button -->
          <div class="projects-actions">
            <button mat-outlined-button
                    color="primary"
                    (click)="showAllProjects()"
                    [class.animate-fade-in-up]="isVisible"
                    style="animation-delay: 1s;"
                    type="button">
              <span>View All Projects</span>
              <mat-icon>arrow_forward</mat-icon>
            </button>
          </div>

        } @else if (portfolioService.isLoading()) {
          <!-- Loading State -->
          <div class="projects-loading">
            <div class="loading-grid">
              @for (placeholder of [1,2,3]; track $index) {
                <div class="project-placeholder">
                  <div class="placeholder-image"></div>
                  <div class="placeholder-content">
                    <div class="placeholder-title"></div>
                    <div class="placeholder-text"></div>
                    <div class="placeholder-text short"></div>
                    <div class="placeholder-tags"></div>
                  </div>
                </div>
              }
            </div>
          </div>

        } @else if (portfolioService.hasError()) {
          <!-- Error State -->
          <div class="projects-error">
            <div class="error-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <h3>Unable to Load Projects</h3>
            <p>There was an error loading the project data. Please try refreshing the page.</p>
            <button mat-raised-button
                    color="accent" 
                    (click)="retryLoad()">
              Retry
            </button>
          </div>

        } @else {
          <!-- Empty State -->
          <div class="projects-empty">
            <div class="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
              </svg>
            </div>
            <h3>No Projects Available</h3>
            <p>Projects will be displayed here once they are available.</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      background: white;
      position: relative;
    }

    .projects-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(26, 71, 42, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(231, 76, 60, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
      z-index: 1;
    }

    .category-tabs {
      margin-bottom: 3rem;
      position: relative;
      z-index: 1;
    }

    .category-tabs .mat-mdc-tab-group {
      --mdc-tab-indicator-active-indicator-color: var(--color-primary);
    }

    .category-tabs .mat-mdc-tab {
      --mdc-secondary-navigation-tab-label-text-color: var(--color-text-secondary);
      --mdc-secondary-navigation-tab-active-label-text-color: var(--color-primary);
      --mdc-secondary-navigation-tab-hover-label-text-color: var(--color-primary);
    }

    .category-tabs .mat-mdc-tab-body-content {
      overflow: visible;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 2.5rem;
      margin-bottom: 3rem;
      position: relative;
      z-index: 1;
    }

    .projects-actions {
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .projects-actions .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      opacity: 0;
      transform: translateY(20px);
    }

    .projects-actions .btn.animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .projects-actions .btn:hover svg {
      transform: translateX(4px);
    }

    /* Loading States */
    .projects-loading {
      position: relative;
      z-index: 1;
    }

    .loading-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 2.5rem;
    }

    .project-placeholder {
      background: white;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--box-shadow);
      animation: pulse 2s ease-in-out infinite alternate;
    }

    .placeholder-image {
      height: 240px;
      background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
    }

    .placeholder-content {
      padding: var(--spacing-card);
    }

    .placeholder-title {
      height: 24px;
      background: #e0e0e0;
      border-radius: 4px;
      margin-bottom: 16px;
      width: 80%;
    }

    .placeholder-text {
      height: 16px;
      background: #f0f0f0;
      border-radius: 4px;
      margin-bottom: 8px;
    }

    .placeholder-text.short {
      width: 60%;
    }

    .placeholder-tags {
      height: 32px;
      background: #e0e0e0;
      border-radius: 4px;
      margin-top: 20px;
      width: 70%;
    }

    /* Error State */
    .projects-error {
      text-align: center;
      padding: 4rem 2rem;
      position: relative;
      z-index: 1;
    }

    .error-icon {
      color: var(--color-accent);
      margin-bottom: 1.5rem;
    }

    .projects-error h3 {
      color: var(--color-text);
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .projects-error p {
      color: var(--color-text-secondary);
      margin-bottom: 2rem;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Empty State */
    .projects-empty {
      text-align: center;
      padding: 4rem 2rem;
      position: relative;
      z-index: 1;
    }

    .empty-icon {
      color: var(--color-neutral);
      margin-bottom: 1.5rem;
    }

    .projects-empty h3 {
      color: var(--color-text);
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .projects-empty p {
      color: var(--color-text-secondary);
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Animations */
    @keyframes pulse {
      from {
        opacity: 1;
      }
      to {
        opacity: 0.6;
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .projects-grid {
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
      }

      .loading-grid {
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
      }
    }

    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .loading-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .section-header {
        margin-bottom: 2.5rem;
      }

      .projects-error,
      .projects-empty {
        padding: 2rem 1rem;
      }
    }

    @media (max-width: 480px) {
      .projects-actions .btn {
        width: 100%;
        max-width: 300px;
      }
    }

    /* Intersection Observer Enhancement */
    .projects-grid.visible app-project-card {
      animation-play-state: running;
    }
  `]
})
export class ProjectsComponent implements OnInit {
  protected readonly allProjects = signal<Project[] | null>(null);
  protected readonly selectedCategory = signal<ProjectCategory | 'all'>('all');
  protected readonly availableCategories = signal<CategoryInfo[]>([]);
  protected readonly selectedCategoryIndex = signal<number>(0);
  protected isVisible = false;

  constructor(
    protected portfolioService: PortfolioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.setupIntersectionObserver();
    
    // Subscribe to data changes
    this.subscribeToDataChanges();
  }

  private loadData(): void {
    const data = this.portfolioService.data();
    if (data && data.projects) {
      this.allProjects.set(data.projects);
      this.setupCategories(data.projects);
    }
  }
  
  private subscribeToDataChanges(): void {
    // Check for data periodically until loaded
    const checkInterval = setInterval(() => {
      const data = this.portfolioService.data();
      if (data && data.projects) {
        this.allProjects.set(data.projects);
        this.setupCategories(data.projects);
        clearInterval(checkInterval);
      }
    }, 100);
    
    // Clear interval after 10 seconds to prevent memory leak
    setTimeout(() => clearInterval(checkInterval), 10000);
  }

  private setupCategories(projects: Project[]): void {
    // Count projects by category
    const categoryCounts = projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {} as Record<ProjectCategory, number>);

    // Get unique categories that exist in data
    const existingCategories = Object.keys(categoryCounts) as ProjectCategory[];
    
    // Category labels mapping
    const categoryLabels: Record<ProjectCategory, string> = {
      'professional': 'Professional',
      'side-project': 'Side Projects',
      'freelance': 'Freelance'
    };

    // Create category info array
    const categories: CategoryInfo[] = [];
    
    // Add "All" category only if we have multiple categories
    if (existingCategories.length > 1) {
      categories.push({
        key: 'all',
        label: 'All Projects',
        count: projects.length
      });
    }

    // Add individual categories
    existingCategories.forEach(category => {
      categories.push({
        key: category,
        label: categoryLabels[category],
        count: categoryCounts[category]
      });
    });

    this.availableCategories.set(categories);
    
    // Set initial category: if only one category exists, select it automatically
    if (existingCategories.length === 1) {
      this.selectedCategory.set(existingCategories[0]);
    } else {
      this.selectedCategory.set('all');
    }
  }

  private setupIntersectionObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    // Observe the projects section
    setTimeout(() => {
      const section = document.querySelector('.projects-section');
      if (section) {
        observer.observe(section);
      }
    }, 100);
  }

  protected retryLoad(): void {
    this.portfolioService.refreshData().subscribe(() => {
      this.loadData();
    });
  }

  // Category management methods
  protected shouldShowCategories(): boolean {
    const categories = this.availableCategories();
    return categories.length > 1; // Show tabs only if multiple categories or "All" exists
  }

  protected filteredProjects(): Project[] {
    const allProjects = this.allProjects();
    const selectedCategory = this.selectedCategory();
    
    if (!allProjects) return [];
    
    if (selectedCategory === 'all') {
      // Show featured projects (first 3) when "All" is selected
      return allProjects.slice(0, 3);
    } else {
      // Show all projects from the selected category
      return allProjects.filter(project => project.category === selectedCategory);
    }
  }

  protected onCategoryChange(categoryIndex: number): void {
    const categories = this.availableCategories();
    if (categoryIndex >= 0 && categoryIndex < categories.length) {
      const selectedCategoryKey = categories[categoryIndex].key;
      this.selectedCategory.set(selectedCategoryKey);
      this.selectedCategoryIndex.set(categoryIndex);
    }
  }

  protected showAllProjects(): void {
    // For now, show all projects in individual detail pages
    // In the future, this could navigate to a dedicated projects listing page
    const allProjects = this.portfolioService.getProjects();
    
    if (allProjects.length === 0) {
      alert('No projects are currently available.');
      return;
    }
    
    // Create a more interactive experience
    const projectOptions = allProjects.map((project, index) => 
      `${index + 1}. ${project.title}`
    ).join('\n');
    
    const choice = prompt(
      `Select a project to view in detail:\n\n${projectOptions}\n\nEnter the project number (1-${allProjects.length}):`
    );
    
    const projectIndex = parseInt(choice || '') - 1;
    
    if (projectIndex >= 0 && projectIndex < allProjects.length) {
      const selectedProject = allProjects[projectIndex];
      const projectSlug = this.portfolioService.generateSlug(selectedProject.title);
      this.router.navigate([projectSlug, 'detail']);
    } else if (choice !== null) {
      alert('Invalid selection. Please try again.');
    }
  }
}