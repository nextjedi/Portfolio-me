import { Component, OnInit, Input } from '@angular/core';
import { AwardModel } from '../award-card/award.model';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {

  heading:string ="AWARDS"

  @Input()
  awards:AwardModel[]=[];

  col:number;
  rowHieght:string;

  constructor(public media: ObservableMedia) {
    
   }

  ngOnInit() {
    
    this.decide();
    
  }

  decide(){
      this.col=2;
      this.rowHieght='2:1'
    
    
  }

  

}
