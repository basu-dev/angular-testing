import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-testing';

  constructor(private swUpdate:SwUpdate){
    this.checkForUpdate();
  }

  ngOnInit(){
  }
  async checkForUpdate(){
    if(!this.swUpdate.isEnabled)return;
    let updateAvailable = await this.swUpdate.checkForUpdate()
    if(!updateAvailable)return;
    if(!confirm('There is an update available. Would you like to update you app to latest version?'))return;
    this.swUpdate.activateUpdate().then(_=>location.reload());
  }
}
