import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  // height = (screen.height);
  // h = window.screen.height;
  h = (window.innerHeight)-80;


  constructor() { }

  ngOnInit(): void {
  }

}
