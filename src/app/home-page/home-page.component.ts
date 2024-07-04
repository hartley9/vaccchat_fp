import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ContinueModalComponent } from '../continue-modal/continue-modal.component';
import { PasswordModalComponent } from '../password-modal/password-modal.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Lenis from 'lenis';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(1200, [animate('0.80s', style({ opacity: 1 }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class HomePageComponent implements OnInit {
  private password = 'futureplaces';
  private passwordGuess = 'futureplaces';

  private passed = null;

  textContent = [
    { id: '1', content: "Do you know which vaccinations you've had?" },
    {
      id: '2',
      content: 'Choose either measles or mumps.',
    },
    {
      id: '3',
      content: 'Using your camera, see the symptoms in action.',
    },
  ];

  clientScreenSize: any | null = null;

  isMobile = false;

  @ViewChild('txtBox1', { static: true })
  txtBox1: ElementRef<HTMLDivElement>;

  mouseX = 0;
  mouseY = 0;

  section = document.querySelector('section');

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

  constructor(
    public dialog: MatDialog,
    public passwordDialog: MatDialog,
    public responsive: BreakpointObserver,
  ) {}

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

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    this.initAnimations();
    this.responsive
      .observe([
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
        Breakpoints.Handset,
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.TabletPortrait,
        Breakpoints.WebLandscape,
        Breakpoints.WebPortrait,
      ])
      .subscribe((result) => {
        const breakpoints = result.breakpoints;
        console.log('RES: ', result.breakpoints);
        console.log('bp: ', Breakpoints.Handset);
        console.log('bp: ', Breakpoints.XSmall);
        console.log('bp: ', Breakpoints.Medium);
        console.log('bp: ', Breakpoints.Large);
        console.log('bp: ', Breakpoints.XLarge);
        console.log('bp: ', Breakpoints.TabletLandscape);
        console.log('bp: ', Breakpoints.HandsetPortrait);

        if (breakpoints[Breakpoints.XSmall]) {
          this.clientScreenSize = Breakpoints.XSmall;
          this.isMobile = false;
        } else if (breakpoints[Breakpoints.Small]) {
          this.clientScreenSize = Breakpoints.Small;
          this.isMobile = false;
        } else if (breakpoints[Breakpoints.Medium]) {
          this.clientScreenSize = Breakpoints.Medium;
          this.isMobile = false;
        } else if (breakpoints[Breakpoints.Large]) {
          this.clientScreenSize = Breakpoints.Large;
          this.isMobile = false;
        } else if (breakpoints[Breakpoints.XLarge]) {
          this.clientScreenSize = Breakpoints.XLarge;
          this.isMobile = false;
        } else if (breakpoints[Breakpoints.Handset]) {
          this.clientScreenSize = Breakpoints.Handset;
          this.isMobile = true;
          console.log('we got a handset...');
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.clientScreenSize = Breakpoints.HandsetLandscape;
          console.log('hand set landscape');
        } else if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.clientScreenSize = Breakpoints.HandsetPortrait;
          console.log('handset portrait');
          this.isMobile = true;
        } else if (breakpoints[Breakpoints.TabletLandscape]) {
          this.clientScreenSize = Breakpoints.TabletLandscape;
        } else if (breakpoints[Breakpoints.TabletPortrait]) {
          this.clientScreenSize = Breakpoints.TabletPortrait;
        }
      });
  }

  initAnimations() {
    const splitTypes = document.querySelectorAll('.reveal-type');

    splitTypes.forEach((word: any, i) => {
      const bg = word.dataset.bgColor;
      const fg = word.dataset.fgColor;

      const text = new SplitType(word as any, { types: 'words' });

      gsap.fromTo(
        text.words,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.5,
          scrollTrigger: {
            trigger: word,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
            markers: false,
            toggleActions: 'play play reverse reverse',
          },
        },
      );
    });

    /*  const lenis = new Lenis();

    lenis.on('scroll', (e: any) => {
      console.log(e);
    });

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf); */
  }

  openPasswordDialog(): void {
    const dialogRef = this.passwordDialog.open(PasswordModalComponent, {
      data: { passwordGuess: this.passwordGuess },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.passwordGuess = result;
      console.log('pass: ', this.passwordGuess);

      if (this.passwordGuess === this.password) {
        console.log('matches');
        //this.passed = true;
      } else {
        console.log('does not match');
        //this.passed = false;
      }
    });
  }

  checkPassword(): void {
    const dialogRef = this.passwordDialog.closeAll();
  }

  // dialog/modal functions
  openContinueDialog(): void {
    const dialogRef = this.dialog.open(ContinueModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngAfterViewInit(): void {
    this.openPasswordDialog();
  }
}
