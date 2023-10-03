import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import Web3, { Contract } from 'web3';
import TradableMiniature from '../../assets/abi/TradableMiniature.json';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3!: Web3;
  private contract!: Contract<any>;
  //ToDo: dynamic convinient way to update contract address
  contractAddress: string = '0x0933A336E7adcAD65bffD394c9EFFa5c0fB3447F';
  connectedAccount: string = '';

  constructor() { 
    if (typeof (window as any)['ethereum'] !== 'undefined') {
      this.web3 = new Web3((window as any)['ethereum']);
    }

    this.setupContract();
  }

  private setupContract() {
    this.contract = new this.web3.eth.Contract(
      TradableMiniature,
      this.contractAddress
    );
  }

  connectToMetamask(): Observable<string[]> {
    const requestAccount = this.web3.eth.requestAccounts();
    const observable = from(requestAccount);

    return observable;
  }

  getAllMiniatures(){ 

    /*
    (contract.methods as any).getAllMiniatures().call()
      .then((miniatures: any) => {
        miniatures.forEach((miniature: any) => {
          this.miniatures.push({
            name: miniature.name,
            miniatureUrl: miniature.url,
            price: miniature.price
          })
          this.miniatures = [...this.miniatures];
        })
      })
      */
  }


}