import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FaceFilterPageComponent } from './face-filter-page/face-filter-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FaqsComponent } from './faqs/faqs.component';
import { CameraComponent } from './camera/camera.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'face-filter', component: FaceFilterPageComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'camera', component: CameraComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
