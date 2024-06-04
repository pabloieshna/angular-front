import { Pipe, type PipeTransform } from '@angular/core';
import { User } from '../../auth/interfaces';

@Pipe({
  name: 'profileImg',
})
export class ProfileImgPipe implements PipeTransform {

  transform( user?: string): string {


    if ( user) return user; //https:///google.com/flash.png

    return 'assets/no-image.png';
  }
}
