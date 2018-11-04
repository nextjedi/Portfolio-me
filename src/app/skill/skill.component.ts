import { Component, OnInit } from '@angular/core';
import { Skillmodel } from '../skill.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  heading:string ="SKILLS"
  //skill:Skillmodel= new Skillmodel();
  skills:Skillmodel[]=[];
  constructor() { }

  ngOnInit() {
   this.data();
  }
  data(){
    this.skills[0]=new Skillmodel();
    this.skills[0].title="HTML & CSS";
    this.skills[0].url[0]="../../assets/images/skill/htmlcss/html5.png";
    this.skills[0].url[1]="../../assets/images/skill/htmlcss/css3.png";
    this.skills[0].url[2]="../../assets/images/skill/htmlcss/bootstrap.png";
    this.skills[0].url[3]="../../assets/images/skill/htmlcss/skeleton.png";
    this.skills[0].url[4]="../../assets/images/skill/htmlcss/materialize.png";

    this.skills[1]=new Skillmodel();
    this.skills[1].title="JavaScript";
    this.skills[1].url[0]="../../assets/images/skill/javascript/javascript.png";
    this.skills[1].url[1]="../../assets/images/skill/javascript/jquery.png";
    this.skills[1].url[2]="../../assets/images/skill/javascript/angular.png";
    this.skills[1].url[3]="../../assets/images/skill/javascript/primeng.png";
    this.skills[1].url[4]="../../assets/images/skill/javascript/nodejs.png";

    this.skills[2]=new Skillmodel();
    this.skills[2].title="Java";
    this.skills[2].url[0]="../../assets/images/skill/java/core-java.png";
    this.skills[2].url[1]="../../assets/images/skill/java/advance-java.png";
    this.skills[2].url[2]="../../assets/images/skill/java/spring-boot.png";
    this.skills[2].url[3]="../../assets/images/skill/java/spring-jpa.png";

    this.skills[3]=new Skillmodel();
    this.skills[3].title="Database & ORM"
    this.skills[3].url[0]="../../assets/images/skill/database/mysql.png";
    this.skills[3].url[1]="../../assets/images/skill/database/mssql.png";
    this.skills[3].url[2]="../../assets/images/skill/database/mongodb.png";
    this.skills[3].url[3]="../../assets/images/skill/database/sequalize.png";

    this.skills[4]=new Skillmodel();
    this.skills[4].title="Principles and architecture";
    this.skills[4].url[0]="../../assets/images/skill/principles/rest.png";
    this.skills[4].url[1]="../../assets/images/skill/principles/Solid-design principle.png";
    this.skills[4].url[2]="../../assets/images/skill/principles/design patterns.png";
    this.skills[4].url[3]="../../assets/images/skill/principles/mvc.png";
    this.skills[4].url[4]="../../assets/images/skill/principles/oauth2.png";

    this.skills[5]=new Skillmodel();
    this.skills[5].title="build tools";
    this.skills[5].url[0]="../../assets/images/skill/buildtools/webpack.png";
    this.skills[5].url[1]="../../assets/images/skill/buildtools/maven.png";
    this.skills[5].url[2]="../../assets/images/skill/buildtools/npm.png";

    this.skills[6]=new Skillmodel();
    this.skills[6].title="Blockchain";
    this.skills[6].url[0]="../../assets/images/skill/blockchain/hyperledger.png";
    this.skills[6].url[1]="../../assets/images/skill/blockchain/ethereum.png";

    this.skills[7]=new Skillmodel();
    this.skills[7].title="Others";
    this.skills[7].url[0]="../../assets/images/skill/others/github.png";
    this.skills[7].url[1]="../../assets/images/skill/others/svn.png";
    this.skills[7].url[2]="../../assets/images/skill/others/photoshop.png";
    this.skills[7].url[3]="../../assets/images/skill/others/cpp.png";
    this.skills[7].url[4]="../../assets/images/skill/others/alexa.png";





    
  }

}
