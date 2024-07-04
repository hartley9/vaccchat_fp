import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'VaccinationAppUI';

  mouseX = 0;
  mouseY = 0;

  body = document.querySelector('body');

  gradientParams = `circle farthest-side at ${this.mouseX}px ${this.mouseY}px,
  #62b2c4,
  #a1d6e2,
  white 10%`;

  gradientStyle = {
    'background-image': `linear -gradient(${this.gradientParams})`,
  };

  // static yellow gradient off the top left corner
  sunParams = `circle farthest-side at -50px -50px,
  #ede208
  white 10%`;

  sunStyle = {
    'background-image': `linear -gradient(${this.sunParams})`,
  };

  constructor() {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    //console.log('thisbody: ', this.body?.style);

    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    this.gradientParams = `circle at ${this.mouseX}px ${this.mouseY}px,
    #aedfeb,
    #a1d6e2,
    white 100%`;

    this.gradientStyle = {
      'background-image': `radial-gradient(${this.gradientParams})`,
    };
  }
}
