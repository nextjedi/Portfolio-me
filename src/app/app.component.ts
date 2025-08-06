import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  template: `<app-layout></app-layout>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'arunabh-portfolio';
}