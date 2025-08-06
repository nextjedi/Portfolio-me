import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AwardCardComponent } from '../award-card/award-card.component';
import { Award } from '../models/portfolio.models';

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [HeaderComponent, AwardCardComponent],
  template: `
    <app-header [header]="heading"></app-header>
    
    @for (award of awards; track award.title) {
      <div class="tile-content">
        <app-award-card [award]="award"></app-award-card>
      </div>
    }
  `,
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent {
  @Input() awards: Award[] = [];
  heading = 'Awards';
}