import { Waifu } from './waifu.interface';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map, take, retry } from 'rxjs/operators';
import { BestWaifuPollService } from './best-waifu-poll.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-best-waifu-poll',
  templateUrl: './best-waifu-poll.component.html',
  styleUrls: ['./best-waifu-poll.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BestWaifuPollComponent implements OnInit {

  allImages: Waifu[] = [];
  images: Waifu[] = [];
  selectedWaifus: Array<any> = [];
  userFinishedVoting = false;
  firebaseSubscription: Observable<any>;

  constructor(
    private bestWaifuService: BestWaifuPollService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.setImages();
    // this.bestWaifuService.getImages2().subscribe(respo => console.log(respo));
  }


  setImages() {
    this.bestWaifuService.getImages2().then(res => {
      res.forEach(e => {
        this.allImages.push({
          nome: String(e['_document']['proto']['fields']['nome'].stringValue),
          url: String(e['_document']['proto']['fields']['url'].stringValue),
          votes: Number(e['_document']['proto']['fields']['votes'].integerValue)
        });
      });
      this.images = this.allImages.slice(0, 2);
      this.setImages();
    }, (err) => console.log(err));
  }

  selectWaifu(bestWaifuName: string, worstWaifuName: string) {
    this.selectedWaifus.push({ bestWaifuName, worstWaifuName });
    const newWaifu = this.getNewWaifu(this.allImages.findIndex(waifu => waifu.nome === bestWaifuName),
      this.allImages.findIndex(waifu => waifu.nome === worstWaifuName));
    if (this.images[0].nome === worstWaifuName) {
      this.images[0] = newWaifu;
    } else {
      this.images[1] = newWaifu;
    }
  }

  // this.bestWaifuService.getImages2().subscribe(res => {
  //   res.forEach(e => {
  //     this.allImages.push({
  //       nome: String(e.payload.doc['_document']['proto']['fields']['nome'].stringValue),
  //       url: String(e.payload.doc['_document']['proto']['fields']['url'].stringValue),
  //       votes: Number(e.payload.doc['_document']['proto']['fields']['votes'].integerValue)
  //     });
  //   });
  //   this.images = this.allImages.slice(0, 2);
  //   console.log(this.allImages);
  //   this.setImages();
  // }, (err) => console.log(err));

  getNewWaifu(bestWaifuIndex: number, worstWaifuIndex: number) {
    let newWaifu;
    if (bestWaifuIndex > worstWaifuIndex) {
      newWaifu = this.allImages[bestWaifuIndex + 1];
    } else {
      newWaifu = this.allImages[worstWaifuIndex + 1];
    }
    return newWaifu;
  }


  setImages2() {
    // this.bestWaifuService.getImages()
    // .snapshotChanges()
    // .pipe(
    //   map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    // )
    // .subscribe(images => console.log(images));

    // this.bestWaifuService.getImages().then(images => console.log(images));

    // .snapshotChanges()
    // .pipe(
    //   map(list => list.map(item => item.payload.val()))
    // )
    // .subscribe(list => console.log(list));
  }
}
