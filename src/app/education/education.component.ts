import { Component, OnInit } from '@angular/core';
import { EducationModel } from '../education-card/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  heading:string ="EDUCATION"
  education:EducationModel = new EducationModel();
  educations:EducationModel[]=[];

  col:number;
  rowHieght:string;
  constructor() { }

  ngOnInit() {
    this.data();
    this.decide();
  }
  decide(){
    this.col=2;
    this.rowHieght='2:1'
  }

  data(){
    this.education.name="B.V. Bhoomaraddi College of Engineering & Technology";
    this.education.url="https://www.kletech.ac.in/";
    this.education.place="Hubli, Karnataka, India";
    this.education.info[0]="B.E in information science and engineering";
    this.educations[0]=this.education;
    
    this.educations[1]=new EducationModel();
    this.educations[1].name="St. Karens Secondary School ( CBSE Affiliated )";
    this.educations[1].place="Patna, Bihar, India";
    this.educations[1].url="http://www.stkarenssecondaryschool.com/";
    this.educations[1].info[0]="Completed 10th and 12th standard (CBSE affiliated)";
  }

}
