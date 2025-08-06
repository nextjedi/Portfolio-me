import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <div class="header-component">
      <h1>{{ header }}</h1>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() header: string = '';
}