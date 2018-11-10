import { Component, OnInit, Input } from '@angular/core';
import { Skillmodel } from '../skill.model';
import { ImageModel } from './image.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  heading:string ="SKILLS"
  @Input()
  skills:Skillmodel[]=[];
  constructor() { }

  ngOnInit() {
    
   
  }
  

}
