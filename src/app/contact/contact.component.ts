import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from '../header/header.component';
import { Contact } from '../models/portfolio.models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent, MatListModule, MatTooltipModule],
  template: `
    <app-header [header]="heading"></app-header>

    <div class="contact">
      <mat-list>
        @for (contact of contacts; track contact.type) {
          <mat-list-item>
            <img matListAvatar 
              [matTooltip]="contact.tooltip"
              matTooltipPosition="above"
              [src]="contact.icon" 
              [alt]="contact.type">
            <h3 matLine>{{ contact.type }}</h3>
            <p matLine>
              <a [href]="contact.link.url" target="_blank">{{ contact.link.name }}</a>
            </p>        
          </mat-list-item>
        }
      </mat-list>
    </div>
  `,
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input() contacts: Contact[] = [];
  heading = 'Contact';
}