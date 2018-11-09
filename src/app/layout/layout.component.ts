import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  screenWidth:number;
  sidenavButon:Boolean = false;
  mode:string;
  @ViewChild('sidenav') 
  public sidenav:ElementRef;
  constructor(public media: ObservableMedia) { 
     
  
  }

  ngOnInit() {
     // set screenWidth on page load
  this.screenWidth = window.innerWidth;
  this.decideMode();
  window.onresize = () => {
    // set screenWidth on screen size change
    this.screenWidth = window.innerWidth;
    this.decideMode();
  };
  }

  decideMode(){
    this.mode= (this.media.isActive('gt-xs')) ?"side":"over";
  }

  sidenavAction(){
    this.sidenav.nativeElement.toggle();

  }

  



}
