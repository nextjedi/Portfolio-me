import { Component, OnInit, Input } from '@angular/core';
import { Skillmodel } from '../skill.model';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css']
})
export class SkillCardComponent implements OnInit {

  @Input()
  skill:Skillmodel =new Skillmodel();

  col:number;
  rowHeight:string;

  constructor() { }

  ngOnInit() {
    this.col=5;
    this.rowHeight="1:1"
    
  }

}
