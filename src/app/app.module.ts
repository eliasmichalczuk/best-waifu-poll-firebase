import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { BestWaifuPollComponent } from './best-waifu-poll/best-waifu-poll.component';

@NgModule({
  declarations: [
    BestWaifuPollComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  entryComponents: [
    BestWaifuPollComponent
  ],
  providers: [],
  bootstrap: [BestWaifuPollComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el = createCustomElement(BestWaifuPollComponent,
      { injector: this.injector});

    customElements.define('best-waifu-pool', el);
  }
}
