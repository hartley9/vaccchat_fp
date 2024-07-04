import {
  Component,
  HostListener,
  AfterViewInit,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import {
  Breakpoints,
  BreakpointObserver,
  BreakpointState,
} from '@angular/cdk/layout';
import { Subject, Observable } from 'rxjs';
import { WebcamInitError, WebcamImage, WebcamUtil } from 'ngx-webcam';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import html2canvas from 'html2canvas';
import { image } from 'html2canvas/dist/types/css/types/image';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDownloadModalComponent } from '../confirm-download-modal/confirm-download-modal.component';
import { InstructionModalComponent } from '../instruction-modal/instruction-modal.component';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-face-filter-page',
  templateUrl: './face-filter-page.component.html',
  styleUrls: ['./face-filter-page.component.css'],
  animations: [
    trigger('instructionAnim', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(1200, [animate('0.60s', style({ opacity: 1 }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class FaceFilterPageComponent implements OnInit, AfterViewInit {
  instructionsText = [
    { id: '1', content: 'Checking...' },
    { id: '2', content: 'Completed!' },
  ];
  numbers = [{ id: '5' }, { id: '4' }, { id: '3' }, { id: '2' }, { id: '1' }];

  cameraWidth: number = 500;
  cameraHeight: number = 500;

  faceVerificationStatus: 'inProgress' | 'failed' | 'passed' = 'inProgress';

  isLoading = true;

  inProgress = false;
  failed = false;
  passed = false;

  // verify message listerner
  @HostListener('window:message', ['$event'])
  onMessage(event: any) {
    //console.log('messageEvent: ', event);

    const messageContent = event.data;
    //console.log('data: ', messageContent);

    if (messageContent === 'verificationStarting') {
      console.log('startevent: ', event);
      this.inProgress = true;
    } else if (messageContent === 'verificationPassed') {
      console.log('face has been found.');
      this.faceVerificationStatus = 'passed';
      this.passed = true;
      this.failed = false;
      this.inProgress = false;
    } else if (messageContent === 'verificationFailed') {
      console.log(
        'we could not find a face, you didnt follow the instructions',
      );

      this.failed = true;
      this.passed = false;
      this.inProgress = false;

      this.faceVerificationStatus = 'failed';
    }
  }

  currentImage: WebcamImage | null = null;

  public isPictureTaken = false;

  public pictureTaken = new EventEmitter<WebcamImage>();

  public imgSrc = '';

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };

  private activeFilter: 'mumps' | 'measles' = 'measles';

  public activeURL: SafeResourceUrl;

  public isMeasles = true;

  private measlesBaseURL = 'https://hartley9.github.io/Scunthorpe/measles';
  private mumpsBaseURL = 'https://hartley9.github.io/Scunthorpe/mumps';

  mumpsSafeURL: SafeResourceUrl;
  measlesSafeURL: SafeResourceUrl;

  public setFilterMeasles() {
    this.activeFilter = 'measles';

    this.activeURL = this.santizer.bypassSecurityTrustResourceUrl(
      this.measlesBaseURL,
    );

    this.isMeasles = true;
  }

  public setFilterMumps() {
    this.activeFilter = 'mumps';

    this.activeURL = this.santizer.bypassSecurityTrustResourceUrl(
      this.mumpsBaseURL,
    );

    this.isMeasles = false;
  }

  constructor(
    public santizer: DomSanitizer,
    public instructionDialog: MatDialog,
    public downloadDialog: MatDialog,
  ) {
    window.addEventListener('message', (event) => {
      console.log(event);

      if (event.data.id === 'iframeImage') {
        console.log('data from iframeeee', event.data);

        const blob = event.data.data;

        const link = URL.createObjectURL(blob);

        this.imgSrc = link;
      }
    });
  }

  @ViewChild('mainCamContainer')
  mainCamContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
  ngAfterViewInit(): void {
    this.cameraWidth = this.mainCamContainer.nativeElement.offsetWidth;
    this.cameraHeight = this.mainCamContainer.nativeElement.offsetHeight;
  }

  ngOnInit(): void {
    // open instruction dialog
    /*
    const instructionDialogRef = this.instructionDialog.open(
      InstructionModalComponent,
    ); */

    this.setURLs();
  }

  setURLs(): void {
    this.measlesSafeURL = this.santizer.bypassSecurityTrustResourceUrl(
      this.measlesBaseURL,
    );
    this.mumpsSafeURL = this.santizer.bypassSecurityTrustHtml(
      this.mumpsBaseURL,
    );

    this.activeURL = this.measlesSafeURL;
  }

  openDialog(): void {
    const downloadDialogRef = this.downloadDialog.open(
      ConfirmDownloadModalComponent,
    );

    downloadDialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);

      if (result === true) {
        this.handleImageDownload();
      }
    });
  }

  public errors: WebcamInitError[] = [];
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  public triggerSnapshot(): void {
    this.trigger.next();
    this.isPictureTaken = !this.isPictureTaken;
  }

  @ViewChild('filterIframe')
  filterIframe: ElementRef;
  public takeImage(): void {
    console.log('take image...');
    console.log(this.filterIframe.nativeElement.contentWindow);

    //add event listner for response...

    // send message to iframe to take image
    this.filterIframe.nativeElement.contentWindow.postMessage(
      'takeImage',
      this.measlesBaseURL,
    );

    //console.log('canvas...', canvas)

    this.isPictureTaken = true;
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.pictureTaken.emit(webcamImage);
    this.currentImage = webcamImage;

    this.imgSrc = webcamImage.imageAsDataUrl;
  }

  public handleImageDelete() {
    this.isPictureTaken = false;
  }

  public handleImageShare() {}

  @ViewChild('imageArea') imageArea: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  public handleImageDownload() {
    console.log('downloading....');
    console.log(this.imageArea);
    html2canvas(this.imageArea.nativeElement).then((canvas) => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download =
        'VaccinationApp_FaceFilter.png';
      this.downloadLink.nativeElement.click();
    });
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;

    this.cameraWidth = this.mainCamContainer.nativeElement.offsetWidth;
    this.cameraHeight = this.mainCamContainer.nativeElement.offsetHeight;

    console.log('hs: ', this.cameraHeight);
    console.log('ws: ', this.cameraWidth);
  }

  public handleInitError(error: WebcamInitError): void {
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name === 'NotAllowedError'
    ) {
      console.warn('Camera access was not allowed by user!');
    }
  }
}
