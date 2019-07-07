import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestWaifuPollComponent } from './best-waifu-poll.component';

describe('BestWaifuPollComponent', () => {
  let component: BestWaifuPollComponent;
  let fixture: ComponentFixture<BestWaifuPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestWaifuPollComponent ]
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
});
