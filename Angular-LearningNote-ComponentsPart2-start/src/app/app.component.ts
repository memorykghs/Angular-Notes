import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [];

  onServerCreated(serverElements: [{serverName: string, serverContent: string}]){

  }

  onblueprintCreated(serverElements: [{serverName: string, serverContent: string}]){

  }
}
