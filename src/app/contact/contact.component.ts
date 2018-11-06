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
    this.contacts[0]=new ContactModel();
    this.contacts[0].link.url="https://github.com/nextjedi";
    this.contacts[0].link.name="github.com/nextjedi";
    this.contacts[0].type="Github";
    this.contacts[0].icon="./../../assets/images/contact/github.png";
    this.contacts[0].tooltip="View Me on Github";


    this.contacts[1]=new ContactModel();
    this.contacts[1].link.url="https://www.linkedin.com/in/arunabhpriyadarshi/";
    this.contacts[1].link.name="linkedin.com/in/arunabhpriyadarshi/";
    this.contacts[1].type="LinkedIn";
    this.contacts[1].icon="./../../assets/images/contact/linkedin.png";
    this.contacts[1].tooltip="View Me on LinkedIn";

    this.contacts[2]=new ContactModel();
    this.contacts[2].link.url="https://github.com/nextjedi";
    this.contacts[2].link.name="arunabhpriyadarshi@live.com";
    this.contacts[2].type="Email";
    this.contacts[2].icon="./../../assets/images/contact/email.png";
    this.contacts[2].tooltip="Email Me";
  }

}
