import { Component, OnDestroy } from '@angular/core';
import { Web3Service } from 'src/app/service/web3.service';
import { MetamaskConnectionStatus } from './metamask-connection-status.enum';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  
  navigationButtons = [
    { name: 'Gallery', path: 'gallery' },
    { name: 'My Collection', path: 'my-collection'},
    { name: 'Minting', path: 'minting'}
  ]

  constructor(
    private web3Service: Web3Service,
    private router: Router) {
  }

  pathSelected(path: string) {
    return this.router.url.includes(path);
  }

  connectClicked() {
    this.status = MetamaskConnectionStatus.Connecting;
    this.connectSubscription = this.web3Service.connectToMetamask()
      .subscribe(() => {
        this.status = MetamaskConnectionStatus.Connected;
        this.account = this.web3Service.connectedAccount;
      });
  }

  changePath(path: string) {
    this.router.navigate([path]);
  }

  disconnectClicked() {
    this.account = "";
    this.status = MetamaskConnectionStatus.Disconnected;
    this.connectSubscription.unsubscribe();
    this.web3Service.disconnectFromMetamask();
  }

  isDisabled(name: string) {
    if (name === 'My Collection') {
      return !this.web3Service.connectedAccount 
    }

    return false;
  }

  ngOnDestroy(): void {
    this.connectSubscription.unsubscribe();
  }
}
