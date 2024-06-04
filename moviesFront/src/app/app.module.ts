import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ar_EG } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ar from '@angular/common/locales/ar';
import { FormsModule } from '@angular/forms';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzCardModule } from 'ng-zorro-antd/card';

registerLocaleData(ar);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NzNoAnimationModule,
    NzCardModule


  ],
  providers: [
    provideAnimationsAsync(),
    { provide: NZ_I18N, useValue: ar_EG },
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
