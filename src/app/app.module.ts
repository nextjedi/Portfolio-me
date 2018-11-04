import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { MaterialModuleModule } from './material-module/material-module.module';
import { LayoutComponent } from './layout/layout.component';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectComponent } from './project/project.component';
import { SkillComponent } from './skill/skill.component';
import { AwardsComponent } from './awards/awards.component';
import { EducationComponent } from './education/education.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { ExperienceCardComponent } from './experience-card/experience-card.component';
import { SkillCardComponent } from './skill-card/skill-card.component';
import { AwardCardComponent } from './award-card/award-card.component';
import { EducationCardComponent } from './education-card/education-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectComponent,
    SkillComponent,
    AwardsComponent,
    EducationComponent,
    ContactComponent,
    HeaderComponent,
    ExperienceCardComponent,
    SkillCardComponent,
    AwardCardComponent,
    EducationCardComponent
  ],
  imports:[
 CommonModule,
 
    
    BrowserAnimationsModule,
    MaterialModuleModule,
    FlexLayoutModule
    
    
  ],
  providers: [],
  bootstrap:[AppComponent]
})
export class AppModule { }
