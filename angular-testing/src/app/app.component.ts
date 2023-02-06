import { Component, isDevMode } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-testing';

  constructor(private swUpdate: SwUpdate, private swPush: SwPush, private _appService: AppService) {
    this.checkForAppUpdate();
    this.askForPushNotification();
    this.listenForNotifications();
  }

  ngOnInit() {
  }

  async checkForAppUpdate() {
    if (!this.swUpdate.isEnabled) return;
    let updateAvailable = await this.swUpdate.checkForUpdate();
    if (!updateAvailable) return;
    if (isDevMode()) {
      if (!confirm('There is an update available. Would you like to update you app to latest version?')) return;
      this.swUpdate.activateUpdate().then(_ => location.reload());
    } else {
      this.swUpdate.activateUpdate().then(_ => location.reload());
    }
  }

  async askForPushNotification() {
    if (!this.swPush.isEnabled) return;
    this.swPush.requestSubscription({ serverPublicKey: 'BMGvFXXYcamGRO9NAusAx-o8Boea4sJmHczP8P-n83IkdNcxlKCpyg-Cu4ptSI7FUq8E5aWk02y44LgAfL7tGv8' }).then(res => {
      this._appService.addSubscription(res).subscribe(
        res => console.log(res)
      );
    }).catch(e => console.error(e));
  }

  sendNotification() {
    this._appService.sendNotification().subscribe();
  }

  listenForNotifications() {
    this.swPush.messages.subscribe(console.log);
  }
}
