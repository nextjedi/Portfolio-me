import { Component, OnInit, Input } from '@angular/core';
import { EducationModel } from '../education-card/education.model';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  heading:string ="EDUCATION"
  
  @Input()
  educations:EducationModel[]=[];

  col:number;
  rowHieght:string;
  constructor(public media: ObservableMedia) { }

  ngOnInit() {
    this.data();
    this.decide();
    window.onresize = () => {
      this.decide();
    }
  }

  
  decide(){
    
      this.col=2;
      this.rowHieght='2:1'
    
    
  }

  data(){
    
  }

}
