import { Component, OnInit } from '@angular/core';
import { ExperienceModel } from '../experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  heading:string ="EXPERIENCE"
  experiences:ExperienceModel[]=[];
  experience1:ExperienceModel = new ExperienceModel();
  experience2:ExperienceModel = new ExperienceModel();
  experience3:ExperienceModel = new ExperienceModel();
  experience4:ExperienceModel = new ExperienceModel();


  constructor() { }

  ngOnInit() {


    this.data();
    this.experiences[0]=this.experience1;
    this.experiences[1]=this.experience2;
    this.experiences[2]=this.experience3;
    this.experiences[3]=this.experience4;
  }

  data(){
    this.experience1.company="KPIT Technologies Ltd.";
    this.experience1.role="Blockchain R&d";
    this.experience1.team="KPIT centre of excellence";
    this.experience1.url="https://www.kpit.com/";
    this.experience1.description[0]="POC for an application to share and verify documents over blockchain";
    this.experience1.description[1]="Explored hyperledger projects by IBM foundation and Ethereum smart contract (in a team of 2)";
    this.experience1.description[2]="Hyperledger: Implemented the chaincode (logic behind hyperledger Blockchain) on hyperledger composer which was developed over the infrastructure created by hyperledger fabric. hyperledger explorer was used to generate the dashboard of the transactions."
    this.experience1.description[3]="Ethereum smart contract: Designed and developed the application in solidity (language used to develop Ethereum smart contract) and deployed it on a test network. currently exploring the privbate implementation of ethereum blockchain quorum";
    this.experience1.tenure="May 2018 to July 2018";
    this.experience1.location="Pune, India";


    this.experience2.company="KPIT Technologies Ltd.";
    this.experience2.role="Consulting Developer";
    this.experience2.team="KPIT centre of excellence";
    this.experience2.url="https://www.kpit.com/";
    this.experience2.description[0]="A client needed to migrate several hundred applications from lotus script to the above mentioned technology stack and needed an applicatipon to govern them all. So I developed the application to govern all other application and defined the standard to bew followed by the team created around the project for each applications.";
    this.experience2.description[1]="Strictly followed the design principles, so the applications become scalable as well as maintainable.";
    this.experience2.description[2]="Due to the potential load the server might face have used techniques like caching mechanism and server side paginatioon.";
    this.experience2.description[3]="To provide security and manage users for all applications, fully utilized the authentication guard feature provided by the angular following OAuth standards.";
    this.experience2.description[4]="To maintain longer session in a secure way, implemented HTTP interceptor.";
    this.experience2.description[5]="We studied all the application and identified 22 category of use case that covers 75% the entire list. We created templates to be referred to implement those use cases to fast-pace the development process";
    this.experience2.description[6]="Shared thoughts behind the process with teams responsible to develop further applications.";

    this.experience2.tenure="February 2018 to July 2018";
    this.experience2.location="Pune, India";


    this.experience3.company="KPIT Technologies Ltd.";
    this.experience3.role="Full stack developer";
    this.experience3.team="KPIT Java centre of excellence";
    this.experience3.url="https://www.kpit.com/";
    this.experience3.description[0]="Contributed in development of java productivity accelerator framework, it is intended to generate standard, scalable and maintainable code based on Use-Case for an end to end multilingual application, such that the developer just need to implement specific business logic only";
    this.experience3.description[1]="Designed and implemented a generic workflow that can be configured and generated for any scenarios.";
    this.experience3.tenure="March 2017 to April 2018";
    this.experience3.location="Pune, India";


    this.experience4.company="KPIT Technologies Ltd.";
    this.experience4.role="Trainee";
    this.experience4.team="Digital Transformation SBU";
    this.experience4.url="https://www.kpit.com/";
    this.experience4.description[0]="Core as well as advance java and its framework ‘Java server faces (JSF)’";
    this.experience4.description[1]="Responsive user interface design using Bootstrap, Skeleton grid on top of scripting languages like HTML, CSS, and jQuery";
    this.experience4.description[2]="MySQL database"; 
    this.experience4.tenure="September 2016 to January 2017";
    this.experience4.location="Pune, India";
  }

}
