import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import all components
import { HeroComponent } from './hero.component';
import { StoryComponent } from './story.component';
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
export class HomeComponent {
}