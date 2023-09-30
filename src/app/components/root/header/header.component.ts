import { Component, OnDestroy } from '@angular/core';
import { Web3Service } from 'src/app/service/web3.service';
import { MetamaskConnectionStatus } from './metamask-connection-status.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy{

  connectSubscription!: Subscription;
  account!: string;
  status: MetamaskConnectionStatus = MetamaskConnectionStatus.Disconnected;
  metamaskConnectionStatus = MetamaskConnectionStatus;
  

  constructor(private web3Service: Web3Service) {
  }

  connectClicked() {
    this.status = MetamaskConnectionStatus.Connecting;
    this.connectSubscription = this.web3Service.connectToMetamask().subscribe(accounts => {
      if (accounts?.length) {
        this.status = MetamaskConnectionStatus.Connected;
        this.account = accounts[0];
      }
    });
  }


  disconnectClicked() {
    this.account = "";
    this.status = MetamaskConnectionStatus.Disconnected;
    this.connectSubscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.connectSubscription.unsubscribe();
  }
}
