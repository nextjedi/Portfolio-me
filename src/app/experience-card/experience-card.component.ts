import { Component, OnInit, Input } from '@angular/core';
import { ExperienceModel } from '../experience.model';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.css']
})
export class ExperienceCardComponent implements OnInit {

  @Input()
  experience=new ExperienceModel();
  constructor() { }

  ngOnInit() {
    
  }

}
