import { WaifuNameAndUserVotes } from './waifu-name-user-votes.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BestWaifuPollService } from './best-waifu-poll.service';
import { Waifu } from './waifu.interface';
@Component({
  selector: 'app-best-waifu-poll',
  templateUrl: './best-waifu-poll.component.html',
  styleUrls: ['./best-waifu-poll.component.css'],
  animations: [
    trigger('rollLeftImageWhenUserVoted', [
      state('voting', style({
        opacity: 1
      })),
      state('voted-to-left', style({
        transform: 'translateX(-100%) rotateZ(1080deg)',
        opacity: 0
      })),
      state('voted-to-right', style({
        transform: 'translateX(100%) rotateZ(1080deg)',
        opacity: 0
      })),
      transition('voting => voted-to-left', animate('2000ms ease-in')),
      transition('voting => voted-to-right', animate('2000ms ease-in')),
    ])
  ]
})
export class BestWaifuPollComponent implements OnInit {

  allImages: Waifu[] = [];
  images: Waifu[] = [];
  selectedWaifus: any[] = [];
  userFinishedVoting = false;
  imagesAreShowing = true;
  votedWaifus: WaifuNameAndUserVotes[] = [];
  resultsOnlyObservable: any[] = [];

  constructor(
    private bestWaifuService: BestWaifuPollService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.setImages();
  }

  selectWaifu(bestWaifuName: string, worstWaifuName: string) {
    this.selectedWaifus.push({ bestWaifuName, worstWaifuName });
    const newWaifu = this.getNewWaifu(this.allImages.findIndex(waifu => waifu.nome === bestWaifuName),
    this.allImages.findIndex(waifu => waifu.nome === worstWaifuName));
    // não não existem mais opções no array
    if (!newWaifu) {
      return this.runAnimations();
    }
    if (this.images[0].nome === worstWaifuName) {
      this.images[0] = newWaifu;
    } else {
      this.images[1] = newWaifu;
    }
  }

  getNewWaifu(bestWaifuIndex: number, worstWaifuIndex: number): Waifu {
    let newWaifu;
    if (bestWaifuIndex > worstWaifuIndex) {
      newWaifu = this.allImages[bestWaifuIndex + 1];
    } else {
      newWaifu = this.allImages[worstWaifuIndex + 1];
    }
    return newWaifu;
  }

  getResults() {
    this.selectedWaifus.forEach(objectBestWaifuNameWorstWaifuName => {
      const votedWaifu: WaifuNameAndUserVotes =
      this.votedWaifus.find(votedWaifuu => votedWaifuu.nome === objectBestWaifuNameWorstWaifuName.bestWaifuName);
      // const waifu: Waifu = this.allImages.find(waifuu => waifuu.nome = objectBestWaifuNameWorstWaifuName.bestWaifuName);
      const worstWaifuVotedBefore: WaifuNameAndUserVotes =
      this.votedWaifus.find(votedWaifuu => votedWaifuu.nome === objectBestWaifuNameWorstWaifuName.worstWaifuName);
      let worstWaifuVotes = 0;
      if (worstWaifuVotedBefore) {
        worstWaifuVotes = worstWaifuVotedBefore.votes;
      }
      if (votedWaifu) {
        votedWaifu.votes++;
        votedWaifu.votes = votedWaifu.votes + worstWaifuVotes;
      } else {
        this.votedWaifus.push({nome: objectBestWaifuNameWorstWaifuName.bestWaifuName, votes: worstWaifuVotes + 1});
      }
    });
    this.votedWaifus.forEach((votedWaifu: WaifuNameAndUserVotes) => {
      const waifu: Waifu = this.allImages.find(waifuu => waifuu.nome === votedWaifu.nome);
      if (waifu) {
        waifu.votes = waifu.votes + votedWaifu.votes;
      }
    });
    this.bestWaifuService.updateVotes(this.allImages)
      .then(() => {
        console.log('all saved');
        this.getValues();
      })
      .catch((err) => console.log(err));
  }

  runAnimations() {
    this.userFinishedVoting = true;
    const animationDuration = 2000;
    setTimeout(() => {
      this.getResults();
      this.imagesAreShowing = false;
    }, animationDuration);
  }

  setImages() {
    // this.bestWaifuService.getImages().subscribe((images: Waifu[]) => {
    //   this.allImages = images;
    //   this.images = this.allImages.slice(0, 2);
    // });


    // this.bestWaifuService.getImages2().then(res => {
    //   res.forEach(e => {
    //     this.allImages.push({
    //       nome: String(e['_document']['proto']['fields']['nome'].stringValue),
    //       url: String(e['_document']['proto']['fields']['url'].stringValue),
    //       votes: Number(e['_document']['proto']['fields']['votes'].integerValue)
    //     });
    //   });
    //   this.images = this.allImages.slice(0, 2);
    //   this.setImages();
    // }, (err) => console.log(err));


    // certo 
    this.bestWaifuService.getImages2().subscribe(res => {
      res.forEach(e => {
        this.allImages.push({
          id: e.payload.doc['_key']['path']['segments'][6],
          nome: String(e.payload.doc['_document']['proto']['fields']['nome'].stringValue),
          url: String(e.payload.doc['_document']['proto']['fields']['url'].stringValue),
          votes: Number(e.payload.doc['_document']['proto']['fields']['votes'].integerValue),
        });
      });
      this.images = this.allImages.slice(0, 2);
    }, (err) => console.log(err));
  }

  getValues() {
    this.bestWaifuService.getImages2()
    .subscribe(res => {
      res.forEach(e => {
        this.resultsOnlyObservable.push({
          nome: String(e.payload.doc['_document']['proto']['fields']['nome'].stringValue),
          url: String(e.payload.doc['_document']['proto']['fields']['url'].stringValue),
          votes: Number(e.payload.doc['_document']['proto']['fields']['votes'].integerValue)
        });
      });
    });
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
