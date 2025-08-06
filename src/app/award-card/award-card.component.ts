import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Award } from '../models/portfolio.models';

@Component({
  selector: 'app-award-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ award.title }}</mat-card-title>  
        <mat-card-subtitle>{{ award.subtitle }}</mat-card-subtitle>
      </mat-card-header>
      <mat-divider></mat-divider>
      
      <mat-card-content>
        @if (award.points.length > 0) {
          <ul>
            @for (point of award.points; track point) {
              <li>{{ point }}</li>
            }
          </ul>
        }
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./award-card.component.css']
})
export class AwardCardComponent {
  @Input() award: Award = {
    points: [],
    title: '',
    subtitle: ''
  };
}