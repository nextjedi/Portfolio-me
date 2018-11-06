import { UrlModel } from "./url.model";

export class ContactModel {
    type:string;
    link:UrlModel = new UrlModel();
    icon:string;
    tooltip:string;
}