import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import { AwardsComponent } from '../awards/awards.component';
import { SkillComponent } from '../skill/skill.component';
import { EducationComponent } from '../education/education.component';
import { ContactComponent } from '../contact/contact.component';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    AboutComponent,
    ExperienceComponent,
    AwardsComponent,
    SkillComponent,
    EducationComponent,
    ContactComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private portfolioService = inject(PortfolioService);

  sidenavButon = signal(true);
  mode = signal<'over' | 'push' | 'side'>('side');
  
  readonly portfolio = computed(() => ({
    name: this.portfolioService.personalInfo().name,
    role: this.portfolioService.personalInfo().role,
    awards: this.portfolioService.awards(),
    contacts: this.portfolioService.contacts(),
    educations: this.portfolioService.educations(),
    experiences: this.portfolioService.experiences(),
    skills: this.portfolioService.skills()
  }));

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe(result => {
        if (result.matches) {
          this.sidenavButon.set(false);
          this.mode.set('over');
        } else {
          this.sidenavButon.set(true);
          this.mode.set('side');
        }
      });
  }

  toggleSidenav() {
    this.sidenavButon.update(value => !value);
  }

  closeSidenav() {
    if (this.mode() === 'over') {
      this.sidenavButon.set(false);
    }
  }
}