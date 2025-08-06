import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ExperienceCardComponent } from '../experience-card/experience-card.component';
import { Experience } from '../models/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [HeaderComponent, ExperienceCardComponent],
  template: `
    <app-header [header]="heading"></app-header>
    
    @for (experience of experiences; track experience.company) {
      <div class="tile-content">
        <app-experience-card [experience]="experience"></app-experience-card>
      </div>
    }
  `,
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  @Input() experiences: Experience[] = [];
  heading = 'Experience';
}