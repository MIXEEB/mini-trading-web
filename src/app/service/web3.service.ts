import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private web3!: Web3;

  constructor() { 
    if (typeof (window as any)['ethereum'] !== 'undefined') {
      this.web3 = new Web3((window as any)['ethereum']);
    }
  }

  connectToMetamask(): Observable<string[]> {
    const requestAccount = this.web3.eth.requestAccounts();
    const observable = from(requestAccount);

    return observable;
  }
  
}