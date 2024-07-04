import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent {
  isLoading = true;

  url = 'https://hartley9.github.io/Scunthorpe/measles'; //'assets/face-filters/measles_demo/index.html'
  urlSafe: SafeResourceUrl;

  constructor(public santizer: DomSanitizer) {}

  ngOnInit() {
    this.urlSafe = this.santizer.bypassSecurityTrustResourceUrl(this.url);

    setInterval(() => {
      console.log('is loading: ', this.isLoading);
    }, 10);
  }
}
