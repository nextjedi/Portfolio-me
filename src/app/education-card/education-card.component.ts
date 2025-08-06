import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Education } from '../models/portfolio.models';

@Component({
  selector: 'app-education-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <a href="{{ education.url }}" target="_blank">{{ education.name }}</a>
        </mat-card-title>  
        <mat-card-subtitle>{{ education.place }}</mat-card-subtitle>
      </mat-card-header>
      <mat-divider></mat-divider>
      
      <mat-card-content>
        <ul>
          @for (info of education.info; track info) {
            <li>{{ info }}</li>
          }
        </ul>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./education-card.component.css']
})
export class EducationCardComponent {
  @Input() education: Education = {
    info: [],
    name: '',
    url: '',
    place: ''
  };
}