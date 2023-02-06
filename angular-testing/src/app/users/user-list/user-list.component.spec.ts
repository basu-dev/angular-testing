import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { click } from 'src/app/common/test-utils';
import { USERS } from '../mock/users.mock';

import { UserListComponent } from './user-list.component';
import { UserService } from '../services/users.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let el:DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers:[{
        provide:UserService,
        useValue:jasmine.createSpyObj('UserService',["getUsers"])
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
    
    component.users$ = of(USERS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should show users',()=>{
    const userListEl = el.query(By.css('.user-list'));
    expect(userListEl.children).toBeTruthy();
    expect(userListEl.children.length).toBe(10);
    let firstEl = userListEl.children[0] ;
    expect(firstEl.nativeElement.textContent.trim()).toBe('Leanne Graham')
  })

  it('should show selected user',fakeAsync(()=>{
    const singleUserEl = el.queryAll(By.css('.user'))[0];
    click(singleUserEl);
    flush();
    fixture.detectChanges();
    const selectedUserEle = el.query(By.css('.selected-user'));
    expect(selectedUserEle.nativeElement.textContent).toContain(USERS[0].name)
  })); 
});
