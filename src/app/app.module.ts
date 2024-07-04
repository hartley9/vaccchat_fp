import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { HomePageComponent } from './home-page/home-page.component';
import { FaceFilterPageComponent } from './face-filter-page/face-filter-page.component';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { WebcamModule } from 'ngx-webcam';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContinueModalComponent } from './continue-modal/continue-modal.component';
import { FaqsComponent } from './faqs/faqs.component';
import { CameraOptionsComponent } from './camera-options/camera-options.component';
import { CameraComponent } from './camera/camera.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmDownloadModalComponent } from './confirm-download-modal/confirm-download-modal.component';
import { InstructionModalComponent } from './instruction-modal/instruction-modal.component';
import { PasswordModalComponent } from './password-modal/password-modal.component';

import {
  TooltipPosition,
  MatTooltipModule,
  TooltipComponent,
} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FaceFilterPageComponent,
    PrivacyPolicyComponent,
    ContinueModalComponent,
    FaqsComponent,
    CameraOptionsComponent,
    CameraComponent,
    FooterComponent,
    ConfirmDownloadModalComponent,
    InstructionModalComponent,
    PasswordModalComponent,
  ],

  imports: [
    WebcamModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
