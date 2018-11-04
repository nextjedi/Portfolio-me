import { Component, OnInit, Input } from '@angular/core';
import { AwardModel } from './award.model';

@Component({
  selector: 'app-award-card',
  templateUrl: './award-card.component.html',
  styleUrls: ['./award-card.component.css']
})
export class AwardCardComponent implements OnInit {

  @Input()
  award:AwardModel=new AwardModel();
  constructor() { }

  ngOnInit() {

  }


}
