import { Component, OnInit, Input } from '@angular/core';
import { ContactModel } from './contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  heading:string ="Contact";

  @Input()
  contacts:ContactModel[]=[];
  
  constructor() { }

  ngOnInit() {
    console.log(this.contacts)
    
  }

}
