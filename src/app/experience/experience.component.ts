import { Component, OnInit, Input } from '@angular/core';
import { ExperienceModel } from '../experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  heading:string ="EXPERIENCE"
  @Input()
  experiences:ExperienceModel[]=[];


  constructor() { }

  ngOnInit() {

  }

}
