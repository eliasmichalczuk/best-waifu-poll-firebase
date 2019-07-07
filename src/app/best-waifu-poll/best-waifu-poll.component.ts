import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { BestWaifuPollService } from './best-waifu-poll.service';

@Component({
  selector: 'app-best-waifu-poll',
  templateUrl: './best-waifu-poll.component.html',
  styleUrls: ['./best-waifu-poll.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BestWaifuPollComponent implements OnInit  {

  allImages = [];
  images = [];
  selectedWaifus = [];

  constructor(
    private bestWaifuService: BestWaifuPollService
  ) {
  }

  ngOnInit() {
    this.setImages();
  }


  setImages() {
    this.allImages = this.bestWaifuService.getImages();
    this.images = this.allImages.slice(0, 2);
  }

  selectWaifu(bestWaifuName: string, worstWaifuName: string) {
    this.selectedWaifus.push({bestWaifuName, worstWaifuName});
    const newWaifu = this.getNewWaifu(this.allImages.findIndex(waifu => waifu.name === bestWaifuName),
      this.allImages.findIndex(waifu => waifu.name === worstWaifuName));
    if (this.images[0].name === worstWaifuName) {
      this.images[0] = newWaifu;
    } else {
      this.images[1] = newWaifu;
    }
  }

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
