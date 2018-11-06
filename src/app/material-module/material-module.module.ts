import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatDividerModule, MatGridListModule, MatCardModule, MatTooltipModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatTooltipModule

  ],
  exports: [
    CommonModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MaterialModuleModule { }
