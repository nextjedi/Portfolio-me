import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Experience } from '../models/portfolio.models';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <div>
            {{ experience.role }}              
          </div>
        </mat-card-title>  
        <mat-card-subtitle>
          <a href="{{ experience.url }}" target="_blank">{{ experience.company }}</a>
        </mat-card-subtitle>
      </mat-card-header>
      <mat-divider></mat-divider>
      
      <mat-card-content>
        <ul>
          @for (point of experience.description; track point) {
            <li>{{ point }}</li>
          }
        </ul>
      </mat-card-content>
      <mat-card-footer>
        {{ experience.tenure }} | {{ experience.location }}
      </mat-card-footer>
    </mat-card>
  `,
  styleUrls: ['./experience-card.component.css']
})
export class ExperienceCardComponent {
  @Input() experience: Experience = {
    description: [],
    company: '',
    role: '',
    url: '',
    tenure: '',
    location: ''
  };
}