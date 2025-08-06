import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { EducationCardComponent } from '../education-card/education-card.component';
import { Education } from '../models/portfolio.models';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [HeaderComponent, EducationCardComponent],
  template: `
    <app-header [header]="heading"></app-header>
    
    @for (education of educations; track education.name) {
      <div class="tile-content">
        <app-education-card [education]="education"></app-education-card>
      </div>
    }
  `,
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  @Input() educations: Education[] = [];
  heading = 'Education';
}