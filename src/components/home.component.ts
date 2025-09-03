import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SEOService } from '../services/seo.service';
import { AnalyticsService } from '../services/analytics.service';

// Import all components
import { HeroComponent } from './hero.component';
import { StoryComponent } from './story.component';
import { AchievementsComponent } from './achievements.component';
import { ProjectsComponent } from './projects.component';
import { BlogComponent } from './blog.component';
import { ContactComponent } from './contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    StoryComponent,
    AchievementsComponent,
    ProjectsComponent,
    BlogComponent,
    ContactComponent
  ],
  template: `
    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Section -->
      <app-hero id="hero"></app-hero>
      
      <!-- Story/About Section -->
      <app-story></app-story>
      
      <!-- Achievements Section -->
      <app-achievements></app-achievements>
      
      <!-- Projects Section -->
      <app-projects></app-projects>
      
      <!-- Blog Section -->
      <app-blog></app-blog>
      
      <!-- Contact Section -->
      <app-contact></app-contact>
    </main>
  `,
  styles: [`
    .main-content {
      /* Styles already defined in global styles */
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit {
  private sectionsObserved = new Set<string>();

  constructor(
    private seoService: SEOService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    // Set SEO for homepage
    this.seoService.updateSEO({
      title: 'Arunabh Priyadarshi - Senior Software Engineer & Technical Leader',
      description: 'Senior Software Engineer specializing in enterprise solutions, AI integration, and blockchain. Built systems serving 2,500+ users with $5m+ revenue impact.',
      keywords: 'senior software engineer, technical leader, enterprise architecture, AI integration, blockchain, remote work, full stack developer, competitive programming',
      canonicalUrl: 'https://arunabh.me/'
    });
    
    // Add structured data for professional profile
    this.seoService.addPersonStructuredData();
  }

  ngAfterViewInit(): void {
    // Set up intersection observer for section tracking
    this.setupSectionTracking();
  }

  private setupSectionTracking(): void {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id;
            if (!this.sectionsObserved.has(sectionId)) {
              this.sectionsObserved.add(sectionId);
              this.analyticsService.trackSectionView(sectionId);
            }
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    sections.forEach(section => {
      observer.observe(section);
    });
  }
}