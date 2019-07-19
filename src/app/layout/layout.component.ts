import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { AwardModel } from '../award-card/award.model';
import { ContactModel } from '../contact/contact.model';
import { EducationModel } from '../education-card/education.model';
import { ExperienceModel } from '../experience.model';
import { ImageModel } from '../skill/image.model';
import { Skillmodel } from '../skill.model';
import { PortfolioModel } from '../model/portfolio.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  screenWidth:number;
  sidenavButon:Boolean;
  mode:string;
  portfolio:PortfolioModel=new PortfolioModel();

  awards:AwardModel[]=[];
  contacts:ContactModel[]=[];
  educations:EducationModel[]=[];
  experiences:ExperienceModel[]=[];
  skills:Skillmodel[]=[];
  
  constructor(public media: ObservableMedia) { 
     
  
  }

  ngOnInit() {
     // set screenWidth on page load
     this.data();
  this.screenWidth = window.innerWidth;
  this.decideMode();
  window.onresize = () => {
    this.decideMode();
  };
 
  }

  

  decideMode(){
    this.mode= (this.media.isActive('gt-sm')) ?"side":"over";
    this.sidenavButon= (this.media.isActive('gt-sm')) ?true:false;
    
  }

  closeSidenav(){
    if(!this.media.isActive('gt-sm')) {
      this.sidenavButon = false;
    }

  }

  toggleSidenav(){
    this.sidenavButon=!this.sidenavButon;
    this.mode= (this.media.isActive('gt-sm')) ?"side":"over";
  }

  data(){
    this.portfolio.name="Mohit Vashistha"
    this.portfolio.role="Blockchain Engineer"
    this.award();
    this.portfolio.awards=this.awards;
    this.contact();
    this.portfolio.contacts=this.contacts;
    this.education();
    this.portfolio.educations=this.educations;
    this.experience();
    this.portfolio.experiences=this.experiences;
    this.skill();
    this.portfolio.skills=this.skills;

    // console.log(JSON.stringify(this.portfolio.contatcs))

  }



  award(){
    
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

  contact() {
    this.contacts[2]=new ContactModel();
    this.contacts[2].link.url="https://github.com/nextjedi";
    this.contacts[2].link.name="github.com/nextjedi";
    this.contacts[2].type="Github";
    this.contacts[2].icon="./../../assets/images/contact/github.png";
    this.contacts[2].tooltip="View Me on Github";


    this.contacts[1]=new ContactModel();
    this.contacts[1].link.url="https://www.linkedin.com/in/mohit-vashistha-316869114/";
    this.contacts[1].link.name="linkedin.com/in/mohitvashistha/";
    this.contacts[1].type="LinkedIn";
    this.contacts[1].icon="./../../assets/images/contact/linkedin.png";
    this.contacts[1].tooltip="View Me on LinkedIn";

    this.contacts[0]=new ContactModel();
    this.contacts[0].link.url="mailto:mohit6b@gmail.com";
    this.contacts[0].link.name="mohit6b@gmail.com";
    this.contacts[0].type="Email";
    this.contacts[0].icon="./../../assets/images/contact/email.png";
    this.contacts[0].tooltip="Email Me";
  }

  education(){
    this.educations[0]=new EducationModel();
    this.educations[0].name="Indian Institute of Information Technology Guwahati";
    this.educations[0].url="http://iiitg.ac.in/";
    this.educations[0].place="Guwahati, Assam, India";
    this.educations[0].info[0]="B.Tech. in Computer Science and Engineering";
    
    this.educations[1]=new EducationModel();
    this.educations[1].name="R.P.S. Sr. Secondary School ( CBSE Affiliated )";
    this.educations[1].place="Rewari, Haryana, India";
    this.educations[1].url="https://www.rpsrewari.edu.in/";
    this.educations[1].info[0]="Completed 12th standard (CBSE affiliated)";
  }

  experience() {
    this.experiences[0] = new ExperienceModel();
    this.experiences[0].company="Curl Analytics";
    this.experiences[0].role="Blockchain Engineer";
    this.experiences[0].team="Blockchain Research and Development Team";
    this.experiences[0].url="https://www.curlanalytics.com/";
    this.experiences[0].description[0]="POC for an application to share and verify documents over blockchain";
    this.experiences[0].description[1]="Explored hyperledger projects by IBM foundation and Ethereum smart contract (in a team of 2)";
    this.experiences[0].description[2]="Hyperledger: Implemented the chaincode (logic behind hyperledger Blockchain) on hyperledger composer which was developed over the infrastructure created by hyperledger fabric. hyperledger explorer was used to generate the dashboard of the transactions."
    this.experiences[0].description[3]="Ethereum smart contract: Designed and developed the application in solidity (language used to develop Ethereum smart contract) and deployed it on a test network. currently exploring the privbate implementation of ethereum blockchain quorum";
    this.experiences[0].tenure="May 2018 to July 2018";
    this.experiences[0].location="Pune, India";


    this.experiences[1] = new ExperienceModel();
    this.experiences[1].company="KPIT Technologies Ltd.";
    this.experiences[1].role="Consulting Developer";
    this.experiences[1].team="KPIT centre of excellence";
    this.experiences[1].url="https://www.kpit.com/";
    this.experiences[1].description[0]="A client needed to migrate several hundred applications from lotus script to the above mentioned technology stack and needed an applicatipon to govern them all. So I developed the application to govern all other application and defined the standard to bew followed by the team created around the project for each applications.";
    this.experiences[1].description[1]="Strictly followed the design principles, so the applications become scalable as well as maintainable.";
    this.experiences[1].description[2]="Due to the potential load the server might face have used techniques like caching mechanism and server side paginatioon.";
    this.experiences[1].description[3]="To provide security and manage users for all applications, fully utilized the authentication guard feature provided by the angular following OAuth standards.";
    this.experiences[1].description[4]="To maintain longer session in a secure way, implemented HTTP interceptor.";
    this.experiences[1].description[5]="We studied all the application and identified 22 category of use case that covers 75% the entire list. We created templates to be referred to implement those use cases to fast-pace the development process";
    this.experiences[1].description[6]="Shared thoughts behind the process with teams responsible to develop further applications.";

    this.experiences[1].tenure="February 2018 to July 2018";
    this.experiences[1].location="Pune, India";


    this.experiences[2] = new ExperienceModel();
    this.experiences[2].company="KPIT Technologies Ltd.";
    this.experiences[2].role="Full stack developer";
    this.experiences[2].team="KPIT Java centre of excellence";
    this.experiences[2].url="https://www.kpit.com/";
    this.experiences[2].description[0]="Contributed in development of java productivity accelerator framework, it is intended to generate standard, scalable and maintainable code based on Use-Case for an end to end multilingual application, such that the developer just need to implement specific business logic only";
    this.experiences[2].description[1]="Designed and implemented a generic workflow that can be configured and generated for any scenarios.";
    this.experiences[2].tenure="March 2017 to April 2018";
    this.experiences[2].location="Pune, India";


    this.experiences[3] = new ExperienceModel();
    this.experiences[3].company="KPIT Technologies Ltd.";
    this.experiences[3].role="Trainee";
    this.experiences[3].team="Digital Transformation SBU";
    this.experiences[3].url="https://www.kpit.com/";
    this.experiences[3].description[0]="Core as well as advance java and its framework ‘Java server faces (JSF)’";
    this.experiences[3].description[1]="Responsive user interface design using Bootstrap, Skeleton grid on top of scripting languages like HTML, CSS, and jQuery";
    this.experiences[3].description[2]="MySQL database"; 
    this.experiences[3].tenure="September 2016 to January 2017";
    this.experiences[3].location="Pune, India";
  }

  skill() {
    this.skills[0]=new Skillmodel();
    this.skills[0].title="HTML & CSS";
    this.skills[0].images[0]= new ImageModel();
    this.skills[0].images[0].location="../../assets/images/skill/htmlcss/html5.png";
    this.skills[0].images[0].caption="HTML5";
    this.skills[0].images[0].alt="NotFound";

    this.skills[0].images[1]= new ImageModel();
    this.skills[0].images[1].location="../../assets/images/skill/htmlcss/css3.png";
    this.skills[0].images[1].caption="CSS3";
    this.skills[0].images[1].alt="NotFound";

    this.skills[0].images[2]= new ImageModel();
    this.skills[0].images[2].location="../../assets/images/skill/htmlcss/bootstrap.png";
    this.skills[0].images[2].caption="Bootstrap";
    this.skills[0].images[2].alt="NotFound";

    this.skills[0].images[3]= new ImageModel();
    this.skills[0].images[3].location="../../assets/images/skill/htmlcss/materialize.png";
    this.skills[0].images[3].caption="Materialize";
    this.skills[0].images[3].alt="NotFound";

    this.skills[1]=new Skillmodel();
    this.skills[1].title="JavaScript";
    this.skills[1].images[0]= new ImageModel();
    this.skills[1].images[0].location="../../assets/images/skill/javascript/javascript.png";
    this.skills[1].images[0].caption="JavaScript";
    this.skills[1].images[0].alt="NotFound";

    this.skills[1].images[1]= new ImageModel();
    this.skills[1].images[1].location="../../assets/images/skill/javascript/jquery.png";
    this.skills[1].images[1].caption="Jquery";
    this.skills[1].images[1].alt="NotFound";

    this.skills[1].images[2]= new ImageModel();
    this.skills[1].images[2].location="../../assets/images/skill/javascript/angular.png";
    this.skills[1].images[2].caption="Angular";
    this.skills[1].images[2].alt="NotFound";

    this.skills[1].images[3]= new ImageModel();
    this.skills[1].images[3].location="../../assets/images/skill/javascript/primeng.png";
    this.skills[1].images[3].caption="PrimeNg";
    this.skills[1].images[3].alt="NotFound";

    this.skills[1].images[4]= new ImageModel();
    this.skills[1].images[4].location="../../assets/images/skill/javascript/nodejs.png";
    this.skills[1].images[4].caption="Node js";
    this.skills[1].images[4].alt="NotFound";

    
    this.skills[2]=new Skillmodel();
    this.skills[2].title="Java";
    this.skills[2].images[0]= new ImageModel();
    this.skills[2].images[0].location="../../assets/images/skill/java/core-java.png";
    this.skills[2].images[0].caption="Core Java";
    this.skills[2].images[0].alt="NotFound";

    this.skills[2].images[1]= new ImageModel();
    this.skills[2].images[1].location="../../assets/images/skill/java/advance-java.png";
    this.skills[2].images[1].caption="Advance Java";
    this.skills[2].images[1].alt="NotFound";

    this.skills[2].images[2]= new ImageModel();
    this.skills[2].images[2].location="../../assets/images/skill/java/spring-boot.png";
    this.skills[2].images[2].caption="Spring-Boot";
    this.skills[2].images[2].alt="NotFound";

    this.skills[2].images[3]= new ImageModel();
    this.skills[2].images[3].location="../../assets/images/skill/java/spring-jpa.png";
    this.skills[2].images[3].caption="Spring-jpa";
    this.skills[2].images[3].alt="NotFound";

    this.skills[3]=new Skillmodel();
    this.skills[3].title="Database & ORM"
    this.skills[3].images[0]= new ImageModel();
    this.skills[3].images[0].location="../../assets/images/skill/database/mysql.png";
    this.skills[3].images[0].caption="MySQL";
    this.skills[3].images[0].alt="NotFound";

    this.skills[3].images[1]= new ImageModel();
    this.skills[3].images[1].location="../../assets/images/skill/database/mssql.png";
    this.skills[3].images[1].caption="Ms-SQL";
    this.skills[3].images[1].alt="NotFound";

    this.skills[3].images[2]= new ImageModel();
    this.skills[3].images[2].location="../../assets/images/skill/database/mongodb.png";
    this.skills[3].images[2].caption="MongoDb";
    this.skills[3].images[2].alt="NotFound";

    this.skills[3].images[3]= new ImageModel();
    this.skills[3].images[3].location="../../assets/images/skill/database/sequalize.png";
    this.skills[3].images[3].caption="Sequalize";
    this.skills[3].images[3].alt="NotFound";

    
    this.skills[4]=new Skillmodel();
    this.skills[4].title="Principles and architecture";

    this.skills[4].images[0]= new ImageModel();
    this.skills[4].images[0].location="../../assets/images/skill/principles/rest.png";
    this.skills[4].images[0].caption="REST architecture";
    this.skills[4].images[0].alt="NotFound";

    this.skills[4].images[1]= new ImageModel();
    this.skills[4].images[1].location="../../assets/images/skill/principles/Solid-design principle.png";
    this.skills[4].images[1].caption="SOLID design principle";
    this.skills[4].images[1].alt="NotFound";

    this.skills[4].images[2]= new ImageModel();
    this.skills[4].images[2].location="../../assets/images/skill/principles/design patterns.png";
    this.skills[4].images[2].caption="Design Patterns";
    this.skills[4].images[2].alt="NotFound";

    this.skills[4].images[3]= new ImageModel();
    this.skills[4].images[3].location="../../assets/images/skill/principles/mvc.png";
    this.skills[4].images[3].caption="MVC";
    this.skills[4].images[3].alt="NotFound";

    this.skills[4].images[4]= new ImageModel();
    this.skills[4].images[4].location="../../assets/images/skill/principles/oauth2.png";
    this.skills[4].images[4].caption="OAuth 2";
    this.skills[4].images[4].alt="NotFound";

    this.skills[5]=new Skillmodel();
    this.skills[5].title="build tools";
    this.skills[5].images[0]= new ImageModel();
    this.skills[5].images[0].location="../../assets/images/skill/buildtools/webpack.png";
    this.skills[5].images[0].caption="Webpack";
    this.skills[5].images[0].alt="NotFound";

    this.skills[5].images[1]= new ImageModel();
    this.skills[5].images[1].location="../../assets/images/skill/buildtools/maven.png";
    this.skills[5].images[1].caption="Maven";
    this.skills[5].images[1].alt="NotFound";

    this.skills[5].images[2]= new ImageModel();
    this.skills[5].images[2].location="../../assets/images/skill/buildtools/npm.png";
    this.skills[5].images[2].caption="NPM";
    this.skills[5].images[2].alt="NotFound";

    this.skills[6]=new Skillmodel();
    this.skills[6].title="Blockchain";
    this.skills[6].images[0]= new ImageModel();
    this.skills[6].images[0].location="../../assets/images/skill/blockchain/hyperledger.png";
    this.skills[6].images[0].caption="HyperLedger";
    this.skills[6].images[0].alt="NotFound";

    this.skills[6].images[1]= new ImageModel();
    this.skills[6].images[1].location="../../assets/images/skill/blockchain/ethereum.png";
    this.skills[6].images[1].caption="Ethereum";
    this.skills[6].images[1].alt="NotFound";

    this.skills[7]=new Skillmodel();
    this.skills[7].title="Others";
    this.skills[7].images[0]= new ImageModel();
    this.skills[7].images[0].location="../../assets/images/skill/others/github.png";
    this.skills[7].images[0].caption="Github";
    this.skills[7].images[0].alt="NotFound";

    this.skills[7].images[1]= new ImageModel();
    this.skills[7].images[1].location="../../assets/images/skill/others/svn.png";
    this.skills[7].images[1].caption="SVN";
    this.skills[7].images[1].alt="NotFound";

    this.skills[7].images[2]= new ImageModel();
    this.skills[7].images[2].location="../../assets/images/skill/others/photoshop.png";
    this.skills[7].images[2].caption="Photoshop";
    this.skills[7].images[2].alt="NotFound";

    this.skills[7].images[3]= new ImageModel();
    this.skills[7].images[3].location="../../assets/images/skill/others/cpp.png";
    this.skills[7].images[3].caption="C++";
    this.skills[7].images[3].alt="NotFound";

    this.skills[7].images[4]= new ImageModel();
    this.skills[7].images[4].location="../../assets/images/skill/others/alexa.png";
    this.skills[7].images[4].caption="Alexa";
    this.skills[7].images[4].alt="NotFound";

  }
    

  }

  




