import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule, SwPush, SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppService } from './services/app.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>,
    el: DebugElement,
    app: AppComponent,
    swPush = jasmine.createSpyObj('SwPush', ['isEnabled', 'messages', 'requestSubscription']);
  swPush.messages = of([]);

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
        { provide: AppService, useValue: jasmine.createSpyObj('AppService', ['addSubscription', 'sendNotification']) },
        { provide: SwUpdate, useValue: jasmine.createSpyObj('SwUpdate', ['checkForUpdate', 'activateUpdate']) },
        { provide: SwPush, useValue: swPush },
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
