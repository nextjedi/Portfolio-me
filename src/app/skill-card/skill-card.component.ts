import { Component, Input, signal, computed, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { Skill } from '../models/portfolio.models';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatGridListModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ skill.title }}</mat-card-title>  
      </mat-card-header>
      <mat-divider></mat-divider>
      
      <mat-card-content>
        <mat-grid-list [cols]="cols()" [rowHeight]="rowHeight()">
          @for (image of skill.images; track image.caption) {
            <mat-grid-tile>
              <img mat-card-sm-image [src]="image.location" [alt]="image.alt">     
              <mat-grid-tile-footer>
                {{ image.caption }}
              </mat-grid-tile-footer>
            </mat-grid-tile>
          }
        </mat-grid-list>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./skill-card.component.css']
})
export class SkillCardComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  
  @Input() skill: Skill = {
    images: [],
    title: ''
  };

  private isSmallScreen = signal(false);
  
  readonly cols = computed(() => this.isSmallScreen() ? 2 : 4);
  readonly rowHeight = computed(() => this.isSmallScreen() ? '100px' : '80px');

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe(result => {
        this.isSmallScreen.set(result.matches);
      });
  }
}