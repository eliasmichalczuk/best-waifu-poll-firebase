import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BestWaifuPollService {

  constructor(
    private afs: AngularFirestore
  ) {
  }

  getImages2() {
    // return this.db.list('/', ref => ref.limitToLast(2));
    // this.afs.collection('waifus').get();
    const res = this.afs.firestore.collection('waifus').get();
    this.afs.firestore.disableNetwork();
    return res;
  }

  getImages() {
    return [
      {name: 'Emilia', url: 'https://vignette.wikia.nocookie.net/rezero/images/c/c0/Emilia_Anime_2.png/revision/latest?cb=20160408203829'},
      {name: 'Zero Two', url: 'https://i.ytimg.com/vi/0sLaYGjGIDo/maxresdefault.jpg'},
      {name: 'Nao Tomori', url: 'https://vignette.wikia.nocookie.net/charlotte-anime/images/7/77/CurrentNao.png/revision/latest?cb=20160403195311'},
      {name: 'Lucy Heartfillia', url: 'https://vignette.wikia.nocookie.net/fairytail/images/9/9c/Lucy_X792_image.png/revision/latest?cb=20190106110751'},
    ];
  }
}
