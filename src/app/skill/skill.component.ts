import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SkillCardComponent } from '../skill-card/skill-card.component';
import { Skill } from '../models/portfolio.models';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [HeaderComponent, SkillCardComponent],
  template: `
    <app-header [header]="heading"></app-header>
    
    @for (skill of skills; track skill.title) {
      <div class="tile-content">
        <app-skill-card [skill]="skill"></app-skill-card>
      </div>
    }
  `,
  styleUrls: ['./skill.component.css']
})
export class SkillComponent {
  @Input() skills: Skill[] = [];
  heading = 'Skills';
}