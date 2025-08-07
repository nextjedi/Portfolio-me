import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PortfolioService } from '../services/portfolio.service';
import { ThemeService } from '../services/theme.service';
import { PersonalInfo, Metric } from '../models/portfolio.interface';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatChipsModule, MatProgressSpinnerModule],
  template: `
    <section class="hero-section">
      <div class="container">
        @if (personalInfo() && metrics()) {
          <div class="hero-grid">
            <!-- Profile Image Section -->
            <div class="hero-image-area">
              <div class="profile-image">
                <img 
                  [src]="personalInfo()!.profileImage" 
                  [alt]="personalInfo()!.name + ' - ' + personalInfo()!.title"
                  loading="eager"
                  crossorigin="anonymous"
                  (error)="onImageError($event)"
                >
              </div>
              <mat-chip-set>
                <mat-chip [class]="getAvailabilityClass()">
                  <span class="status-icon"></span>
                  {{ personalInfo()!.availability.message }}
                </mat-chip>
              </mat-chip-set>
            </div>
            
            <!-- Hero Content -->
            <div class="hero-content">
              <h1 class="hero-title">{{ personalInfo()!.name }}</h1>
              <p class="hero-subtitle">{{ personalInfo()!.title }}</p>
              <p class="hero-tagline">"{{ personalInfo()!.tagline }}"</p>
              
              <!-- Metrics Grid -->
              <div class="metrics-grid">
                @for (metric of metrics(); track metric.id) {
                  <mat-card class="metric-card" [title]="metric.description">
                    <mat-card-content>
                      <div class="metric-value">{{ metric.value }}</div>
                      <div class="metric-label">{{ metric.label }}</div>
                    </mat-card-content>
                  </mat-card>
                }
              </div>
              
              <!-- CTA Buttons -->
              <div class="cta-group">
                <button 
                  mat-raised-button
                  color="accent"
                  (click)="scrollToSection('projects')"
                  type="button"
                >
                  View My Work
                </button>
                <button 
                  mat-outlined-button
                  color="primary"
                  (click)="scrollToSection('contact')"
                  type="button"
                >
                  Let's Talk
                </button>
                <a 
                  mat-outlined-button
                  color="primary"
                  [href]="personalInfo()!.resumeUrl" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        } @else if (portfolioService.isLoading()) {
          <div class="hero-loading">
            <mat-spinner diameter="50"></mat-spinner>
            <p>Loading portfolio...</p>
          </div>
        } @else if (portfolioService.hasError()) {
          <div class="hero-error">
            <p>Unable to load portfolio data. Please refresh the page.</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
      color: white;
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%);
      pointer-events: none;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 400px 1fr;
      gap: 60px;
      align-items: center;
      position: relative;
      z-index: 1;
    }

    .hero-image-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .profile-image {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      margin-bottom: 20px;
      transition: var(--transition);
      position: relative;
    }

    .profile-image:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
    }

    .profile-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    mat-chip-set {
      justify-content: center;
    }

    mat-chip.availability-available {
      background: var(--color-success) !important;
      color: white !important;
    }

    mat-chip .status-icon {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #2ecc71;
      animation: pulse 2s infinite;
      margin-right: 8px;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .hero-content {
      padding-right: 20px;
    }

    .hero-title {
      font-size: var(--font-size-hero);
      font-weight: 700;
      margin-bottom: 16px;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .hero-subtitle {
      font-size: 24px;
      margin-bottom: 20px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
    }

    .hero-tagline {
      font-size: 20px;
      margin-bottom: 40px;
      font-style: italic;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.4;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }

    mat-card.metric-card {
      background: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      transition: var(--transition);
      cursor: help;
      backdrop-filter: blur(10px);
      text-align: center;
    }

    mat-card.metric-card:hover {
      transform: translateY(-5px);
      background: rgba(255, 255, 255, 0.15) !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
    }

    mat-card.metric-card mat-card-content {
      padding: 8px;
    }

    .metric-value {
      font-size: 28px;
      font-weight: 700;
      color: var(--color-accent);
      margin-bottom: 5px;
      line-height: 1;
    }

    .metric-label {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
    }

    .cta-group {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .cta-group button,
    .cta-group a {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      margin-right: 8px;
    }

    .cta-group button:hover,
    .cta-group a:hover {
      transform: translateY(-2px);
    }

    /* Loading and Error States */
    .hero-loading,
    .hero-error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      text-align: center;
    }

    mat-spinner {
      margin-bottom: 20px;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 40px;
      }

      .hero-content {
        padding-right: 0;
      }

      .profile-image {
        width: 250px;
        height: 250px;
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 60px 0;
        min-height: auto;
      }

      .hero-title {
        font-size: 36px;
      }

      .hero-subtitle {
        font-size: 20px;
      }

      .hero-tagline {
        font-size: 18px;
      }

      .metrics-grid {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .profile-image {
        width: 200px;
        height: 200px;
      }

      .cta-group {
        flex-direction: column;
        width: 100%;
      }

      .cta-group button,
      .cta-group a {
        width: 100%;
        margin-right: 0;
        margin-bottom: 8px;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 28px;
      }

      .hero-subtitle {
        font-size: 18px;
      }

      .hero-tagline {
        font-size: 16px;
      }

      .profile-image {
        width: 180px;
        height: 180px;
      }

      .metric-card {
        padding: 16px;
      }

      .metric-value {
        font-size: 24px;
      }
    }
  `]
})
export class HeroComponent implements OnInit {
  protected readonly personalInfo = signal<PersonalInfo | null>(null);
  protected readonly metrics = signal<Metric[] | null>(null);

  constructor(
    protected portfolioService: PortfolioService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Load data when component initializes
    this.loadData();
    
    // Subscribe to data changes
    this.subscribeToDataChanges();
  }

  private loadData(): void {
    const data = this.portfolioService.data();
    if (data) {
      this.personalInfo.set(data.personal);
      this.metrics.set(data.metrics);
    }
  }
  
  private subscribeToDataChanges(): void {
    // Check for data periodically until loaded
    const checkInterval = setInterval(() => {
      const data = this.portfolioService.data();
      if (data && data.personal) {
        this.personalInfo.set(data.personal);
        this.metrics.set(data.metrics);
        clearInterval(checkInterval);
      }
    }, 100);
    
    // Clear interval after 10 seconds to prevent memory leak
    setTimeout(() => clearInterval(checkInterval), 10000);
  }

  protected getAvailabilityClass(): string {
    const availability = this.personalInfo()?.availability;
    if (!availability) return '';
    
    return `availability-${availability.status}`;
  }

  protected scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Fallback to a placeholder or default image
    img.src = 'assets/images/profile-placeholder.jpg';
  }
}