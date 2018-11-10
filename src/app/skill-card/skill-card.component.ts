import { Component, OnInit, Input } from '@angular/core';
import { Skillmodel } from '../skill.model';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css']
})
export class SkillCardComponent implements OnInit {

  @Input()
  skill:Skillmodel =new Skillmodel();

  

  col:number;
  rowHieght:string;

  constructor(public media: ObservableMedia) {
    
   }

  ngOnInit() {
    this.decide();
    window.onresize = () => {
      this.decide();
    }
    
  }

  decide(){
    if(this.media.isActive('gt-xs')){
      this.col=5;
      this.rowHieght='1:1'
    }else {
      this.col=3;
      this.rowHieght='1:1'
    }
    
  
  
}

}
