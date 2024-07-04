import { animate, query, stagger, style, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-instruction-modal',
  templateUrl: './instruction-modal.component.html',
  styleUrls: ['./instruction-modal.component.css'],

  animations: [
    trigger('instructions', [
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          stagger(1200, [animate('0.60s', style({ opacity: 1 }))]),
        ],
        { optional: true },
      ),
    ]),
  ],
})
export class InstructionModalComponent {}
