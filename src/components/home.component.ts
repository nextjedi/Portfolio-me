import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SEOService } from '../services/seo.service';

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
export class HomeComponent implements OnInit {
  constructor(private seoService: SEOService) {}

  ngOnInit(): void {
    // Set SEO for homepage
    this.seoService.updateSEO({
      title: 'Arunabh Priyadarshi - Senior Software Engineer & Technical Leader',
      description: 'Senior Software Engineer specializing in enterprise solutions, AI integration, and blockchain. Built systems serving 2,500+ users with $M+ revenue impact.',
      keywords: 'senior software engineer, technical leader, enterprise architecture, AI integration, blockchain, remote work, full stack developer, competitive programming',
      canonicalUrl: 'https://arunabh.me/'
    });
    
    // Add structured data for professional profile
    this.seoService.addPersonStructuredData();
  }
}