import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowServer = false;
    serverCreationStatus = 'No server was created!';
    serverName = '';

    constructor() {
        setTimeout(() => {
            this.allowServer = true;
        }, 2000);
    }

    ngOnInit(): void {
    }

    onCreateServer() {
        this.serverCreationStatus = 'Server was created!';
    }

    onUpdateServerName(event: Event) {
        // console.log(event);
        this.serverName = (event.target as HTMLInputElement).value;
    }
}
