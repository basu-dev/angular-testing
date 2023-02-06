import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { AppService } from './services/app.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>,
    el: DebugElement,
    app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterModule,
        ServiceWorkerModule
      ],
      providers: [
        { provide: AppService, useValue: jasmine.createSpyObj('AppService', ['addSubscription', 'sendNotification']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have send notification button', () => {
    const sendBtn = el.query(By.css('#send-notification'));
    expect(sendBtn).toBeTruthy();
  });
});
