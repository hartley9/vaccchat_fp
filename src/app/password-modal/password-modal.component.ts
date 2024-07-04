import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

interface DialogData {
  passwordGuess: string;
}

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.css'],
})
export class PasswordModalComponent {
  password = 'futureplaces';
  constructor(
    public dialogRef: MatDialogRef<PasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  displayError = false;

  checkPassword() {
    if (this.data.passwordGuess === this.password) {
      this.displayError = false;
      console.log('inside modal yayy');
      this.dialogRef.close();
    } else {
      console.log('password incorrect');
      this.displayError = true;
    }
  }
}
