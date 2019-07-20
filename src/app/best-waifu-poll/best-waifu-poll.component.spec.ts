import { BestWaifuPollService } from './best-waifu-poll.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestWaifuPollComponent } from './best-waifu-poll.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BestWaifuPollComponent', () => {
  let component: BestWaifuPollComponent;
  let fixture: ComponentFixture<BestWaifuPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BestWaifuPollComponent],
      imports: [
        BrowserAnimationsModule,
        BrowserModule
      ],
      providers: [
        {
          provide: BestWaifuPollService,
          useClass: BestWaifuPollMockService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestWaifuPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar uma nova waifu', () => {
    expect(component.getNewWaifu(0, 1)).toEqual(
      {
        id: 'someId',
        nome: 'Emilia',
        url: 'https://vignette.wikia.nocookie.net/rezero/images/c/c0/Emilia_Anime_2.png/revision/latest?cb=20160408203829',
        votes: 0
      }
    );
  });
});

export class BestWaifuPollMockService {

  updateVotes(waifus: any[]) {
    Promise.resolve('alright');
  }

  getImages2(): Observable<any> {
    return of([
      {
        payload: {
          doc: {
            _key: {
              path: {
                segments: [0, 0, 0, 0, 0, 0, 'someId']
              }
            },
            _document: {
              proto: {
                fields: {
                  nome: {
                    stringValue: 'Emilia'
                  },
                  url: {
                    stringValue:
                      'https://vignette.wikia.nocookie.net/rezero/images/c/c0/Emilia_Anime_2.png/revision/latest?cb=20160408203829'
                  },
                  votes: {
                    integerValue: 0
                  }
                }
              }
            }
          }
        }
      },
      {
        payload: {
          doc: {
            _key: {
              path: {
                segments: [0, 0, 0, 0, 0, 0, 'someId']
              }
            },
            _document: {
              proto: {
                fields: {
                  nome: {
                    stringValue: 'Emilia'
                  },
                  url: {
                    stringValue:
                      'https://vignette.wikia.nocookie.net/rezero/images/c/c0/Emilia_Anime_2.png/revision/latest?cb=20160408203829'
                  },
                  votes: {
                    integerValue: 0
                  }
                }
              }
            }
          }
        }
      },
      {
        payload: {
          doc: {
            _key: {
              path: {
                segments: [0, 0, 0, 0, 0, 0, 'someId']
              }
            },
            _document: {
              proto: {
                fields: {
                  nome: {
                    stringValue: 'Emilia'
                  },
                  url: {
                    stringValue:
                      'https://vignette.wikia.nocookie.net/rezero/images/c/c0/Emilia_Anime_2.png/revision/latest?cb=20160408203829'
                  },
                  votes: {
                    integerValue: 0
                  }
                }
              }
            }
          }
        }
      }
      // {id: '1', nome: 'Emilia',
      // url: 'https://vignette.wikia.nocookie.net/rezero/images/c/c0/Emilia_Anime_2.png/revision/latest?cb=20160408203829', votes: 0},
      // {id: '1', nome: 'Zero Two',
      // url: 'https://i.ytimg.com/vi/0sLaYGjGIDo/maxresdefault.jpg', votes: 0},
      // {id: '1', nome: 'Nao Tomori',
      // url: 'https://vignette.wikia.nocookie.net/charlotte-anime/images/7/77/CurrentNao.png/revision/latest?cb=20160403195311', votes: 0},
      // {id: '1', nome: 'Lucy Heartfillia',
      // url: 'https://vignette.wikia.nocookie.net/fairytail/images/9/9c/Lucy_X792_image.png/revision/latest?cb=20190106110751', votes: 0},
    ]);
  }
}
