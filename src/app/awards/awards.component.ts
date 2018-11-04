import { Component, OnInit } from '@angular/core';
import { AwardModel } from '../award-card/award.model';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {

  heading:string ="AWARDS"
  awards:AwardModel[]=[];

  constructor() { }

  ngOnInit() {
    this.data();
  }

  data(){
    this.awards[0] = new AwardModel();
    this.awards[0].title="Code Gladiator - Open Coding Contest 2018";
    this.awards[0].subtitle="A National level competitive Coding contest by techgig"
    this.awards[0].points[0]="Secured a position in top 250 coders of India out of 2.5lakh competitor"

    this.awards[1] = new AwardModel();
    this.awards[1].title="Code Gladiator - Alexa Hackathon 2018";
    this.awards[1].subtitle="A National level Hackathon by techgig (sponsered by Amazon)";
    this.awards[1].points[0]="Secured a position in top 25 teams in the country";

    this.awards[2] = new AwardModel();
    this.awards[2].title="Code Gladiator - Open Coding Contest 2017";
    this.awards[2].subtitle="A National level competitive Coding contest by techgig"
    this.awards[2].points[0]="Secured a position in top 300 coders of India out of 2.5lakh competitor"

    this.awards[3] = new AwardModel();
    this.awards[3].title="IBM Bluemix - Hackathon 2015";
    this.awards[3].subtitle="A National level Hackathon by IBM"
    

    this.awards[4] = new AwardModel();
    this.awards[4].title="Richie Rich - coding contest 2014";
    this.awards[4].subtitle="An inter College coding contest by BVB college"
    this.awards[4].points[0]="Secured 3rd positon in the event"

    this.awards[5] = new AwardModel();
    this.awards[5].title="Data Structure and Algorithms - 2013";
    this.awards[5].subtitle="by Lab Instructor BVB college"
    this.awards[5].points[0]="Certified for outstanding performance in data structure labs"


  }

}
