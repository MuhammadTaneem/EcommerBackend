import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  height = (screen.height)*.9;
  // h = window.screen.height;
  h = window.innerHeight;
  
  
  

  constructor() { }
  

  ngOnInit(): void {
    console.log(this.h);
  }

}
