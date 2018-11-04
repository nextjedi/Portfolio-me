import { Component, OnInit, Input } from '@angular/core';
import { EducationModel } from './education.model';

@Component({
  selector: 'app-education-card',
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.css']
})
export class EducationCardComponent implements OnInit {

  @Input()
  education:EducationModel = new EducationModel();
  constructor() { }

  ngOnInit() {
    
  }

}
