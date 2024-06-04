import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImgPipe } from './pipes/profileImg.pipe';



@NgModule({
  declarations: [ProfileImgPipe],
  imports: [
    CommonModule
  ],
  exports: [ProfileImgPipe]
})
export class SharedModule { }
