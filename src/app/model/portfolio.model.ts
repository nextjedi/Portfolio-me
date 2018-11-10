import { ExperienceModel } from "../experience.model";
import { Skillmodel } from "../skill.model";
import { AwardModel } from "../award-card/award.model";
import { EducationModel } from "../education-card/education.model";
import { ContactModel } from "../contact/contact.model";

export class PortfolioModel {
    name:string;
    role:string;
    experiences:ExperienceModel[];
    skills:Skillmodel[];
    awards:AwardModel[];
    educations:EducationModel[];
    contacts:ContactModel[];
}