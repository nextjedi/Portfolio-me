import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../services/portfolio.service';
import { Achievement } from '../models/portfolio.interface';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <section class="achievements-section section" id="achievements">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Recognition & Achievements</h2>
          <p class="section-subtitle">
            Proven excellence in competitive programming and technical leadership
          </p>
        </div>

        @if (achievements() && achievements()!.length > 0) {
          <div class="achievements-grid" 
               [class.visible]="isVisible">
            @for (achievement of achievements(); track achievement.title) {
              <div class="achievement-card"
                   [class.animate-fade-in-up]="isVisible"
                   [style.animation-delay]="($index * 0.1) + 's'">
                <div class="achievement-icon">
                  <mat-icon>{{ getAchievementIcon(achievement.type) }}</mat-icon>
                </div>
                <div class="achievement-content">
                  <h3 class="achievement-title">{{ achievement.title }}</h3>
                  <p class="achievement-description">{{ achievement.description }}</p>
                  <div class="achievement-meta">
                    <span class="achievement-year">{{ achievement.year }}</span>
                    <span class="achievement-type">{{ getTypeLabel(achievement.type) }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else if (portfolioService.isLoading()) {
          <!-- Loading State -->
          <div class="achievements-loading">
            <div class="loading-grid">
              @for (placeholder of [1,2,3,4,5,6]; track $index) {
                <div class="achievement-placeholder">
                  <div class="placeholder-icon"></div>
                  <div class="placeholder-content">
                    <div class="placeholder-title"></div>
                    <div class="placeholder-text"></div>
                    <div class="placeholder-meta"></div>
                  </div>
                </div>
              }
            </div>
          </div>
        } @else {
          <!-- Empty State -->
          <div class="achievements-empty">
            <mat-icon>emoji_events</mat-icon>
            <h3>No Achievements Available</h3>
            <p>Achievement data will be displayed here once available.</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .achievements-section {
      background: white;
      position: relative;
      overflow: hidden;
    }

    .achievements-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(26, 71, 42, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
      z-index: 1;
    }

    .achievements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      position: relative;
      z-index: 1;
    }

    .achievement-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(0, 0, 0, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      opacity: 0;
      transform: translateY(30px);
    }

    .achievement-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      border-color: var(--color-primary);
    }

    .achievement-card.animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .achievement-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 15px rgba(26, 71, 42, 0.2);
    }

    .achievement-icon mat-icon {
      color: white;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .achievement-content {
      flex: 1;
    }

    .achievement-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }

    .achievement-description {
      color: var(--color-text-secondary);
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .achievement-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .achievement-year {
      background: var(--color-primary);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .achievement-type {
      color: var(--color-text-secondary);
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Loading State */
    .achievements-loading {
      position: relative;
      z-index: 1;
    }

    .loading-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .achievement-placeholder {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      animation: pulse 2s ease-in-out infinite alternate;
    }

    .placeholder-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
    }

    .placeholder-content {
      flex: 1;
    }

    .placeholder-title {
      height: 20px;
      background: #e0e0e0;
      border-radius: 4px;
      margin-bottom: 12px;
      width: 80%;
    }

    .placeholder-text {
      height: 14px;
      background: #f0f0f0;
      border-radius: 4px;
      margin-bottom: 16px;
    }

    .placeholder-meta {
      height: 12px;
      background: #e0e0e0;
      border-radius: 4px;
      width: 60%;
    }

    /* Empty State */
    .achievements-empty {
      text-align: center;
      padding: 4rem 2rem;
      position: relative;
      z-index: 1;
    }

    .achievements-empty mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: var(--color-neutral);
      margin-bottom: 1.5rem;
    }

    .achievements-empty h3 {
      color: var(--color-text);
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .achievements-empty p {
      color: var(--color-text-secondary);
      max-width: 400px;
      margin: 0 auto;
    }

    /* Animations */
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

    @keyframes pulse {
      from {
        opacity: 1;
      }
      to {
        opacity: 0.6;
      }
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .achievements-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }

      .achievement-card {
        padding: 1.5rem;
        gap: 1rem;
      }
    }

    @media (max-width: 768px) {
      .achievements-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .achievement-card {
        flex-direction: column;
        text-align: center;
        padding: 2rem 1.5rem;
      }

      .achievement-icon {
        margin: 0 auto;
      }

      .achievement-meta {
        justify-content: center;
      }

      .section-header {
        margin-bottom: 2.5rem;
      }

      .achievements-empty {
        padding: 2rem 1rem;
      }
    }

    @media (max-width: 480px) {
      .achievement-card {
        padding: 1.5rem 1rem;
      }

      .achievement-title {
        font-size: 16px;
      }

      .achievement-description {
        font-size: 13px;
      }
    }

    /* Intersection Observer Enhancement */
    .achievements-grid.visible .achievement-card {
      animation-play-state: running;
    }
  `]
})
export class AchievementsComponent implements OnInit {
  protected readonly achievements = signal<Achievement[] | null>(null);
  protected isVisible = false;

  constructor(
    protected portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.setupIntersectionObserver();
    this.subscribeToDataChanges();
  }

  private loadData(): void {
    const data = this.portfolioService.data();
    if (data && data.achievements) {
      this.achievements.set(data.achievements);
    }
  }

  private subscribeToDataChanges(): void {
    const checkInterval = setInterval(() => {
      const data = this.portfolioService.data();
      if (data && data.achievements) {
        this.achievements.set(data.achievements);
        clearInterval(checkInterval);
      }
    }, 100);

    setTimeout(() => clearInterval(checkInterval), 10000);
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

    setTimeout(() => {
      const section = document.querySelector('.achievements-section');
      if (section) {
        observer.observe(section);
      }
    }, 100);
  }

  protected getAchievementIcon(type: string): string {
    switch (type) {
      case 'competition':
        return 'emoji_events';
      case 'speaking':
        return 'campaign';
      case 'certification':
        return 'school';
      default:
        return 'star';
    }
  }

  protected getTypeLabel(type: string): string {
    switch (type) {
      case 'competition':
        return 'Competition';
      case 'speaking':
        return 'Speaking';
      case 'certification':
        return 'Certification';
      default:
        return 'Achievement';
    }
  }
}