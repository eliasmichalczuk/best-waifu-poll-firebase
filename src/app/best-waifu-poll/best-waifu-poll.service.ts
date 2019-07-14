import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { Waifu } from './waifu.interface';

@Injectable({
  providedIn: 'root'
})
export class BestWaifuPollService {

  constructor(
    private afs: AngularFirestore
  ) {
  }

  getImages2() {
    // certo
    return this.afs.collection('waifus').stateChanges();
  }

  updateVotes(waifus: Waifu[]) {
    // console.log(waifus);
    // return;
    const updatingDatabase: Promise<any>[] = [];
    waifus.forEach((waifu: Waifu) => {
      updatingDatabase.push(this.afs.collection('waifus').doc(`${waifu.id}`).update({votes: waifu.votes}));
    });
    return Promise.all(updatingDatabase);
  }

  getImages(): Observable<Waifu[]> {
    return of([
      {id: '1', nome: 'Emilia',
      url: 'https://vignette.wikia.nocookie.net/rezero/images/c/c0/Emilia_Anime_2.png/revision/latest?cb=20160408203829', votes: 0},
      {id: '1', nome: 'Zero Two',
      url: 'https://i.ytimg.com/vi/0sLaYGjGIDo/maxresdefault.jpg', votes: 0},
      {id: '1', nome: 'Nao Tomori',
      url: 'https://vignette.wikia.nocookie.net/charlotte-anime/images/7/77/CurrentNao.png/revision/latest?cb=20160403195311', votes: 0},
      {id: '1', nome: 'Lucy Heartfillia',
      url: 'https://vignette.wikia.nocookie.net/fairytail/images/9/9c/Lucy_X792_image.png/revision/latest?cb=20190106110751', votes: 0},
    ]);
  }
}

    // return this.db.list('/', ref => ref.limitToLast(2));

   // const res = this.afs.firestore.collection('waifus').get();
    // this.afs.firestore.disableNetwork();
    // return res;
