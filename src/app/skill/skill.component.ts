import { Component, OnInit } from '@angular/core';
import { Skillmodel } from '../skill.model';
import { ImageModel } from './image.model';

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
