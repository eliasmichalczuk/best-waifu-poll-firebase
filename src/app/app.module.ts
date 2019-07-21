import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BestWaifuPollComponent } from './best-waifu-poll/best-waifu-poll.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app/app.component';

@NgModule({
  declarations: [
    BestWaifuPollComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig, 'angularfs'),
    // AngularFirestoreModule,
    // AngularFireDatabaseModule,
    // NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    // BestWaifuPollComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  // constructor(private injector: Injector) {
  // }

  // ngDoBootstrap() {
  //   const el = createCustomElement(BestWaifuPollComponent,
  //     { injector: this.injector});

  //   customElements.define('best-waifu-pool', el);
  // }
}
