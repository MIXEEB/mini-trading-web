import { Injectable } from '@angular/core';
import { Observable, from, map, of, tap } from 'rxjs';
import Web3, { Contract } from 'web3';
import TradableMiniature from '../../assets/abi/TradableMiniature.json';
import { MiniatureData } from '../models/miniature-data.interface';

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
    return from(requestAccount)
      .pipe(
        tap(accounts => {
          if (accounts.length !== 0) {
            this.connectedAccount = accounts[0];
          }  
        })
      )
  }

  disconnectFromMetamask() {
    this.connectedAccount = '';
  }

  getAllMiniatures(): Observable<MiniatureData[]> { 
    return (from((this.contract.methods as any).getAllMiniatures().call()) as Observable<any>)
      .pipe(map(this.mapMiniatureData)
    )
  }

  listenToMiniatureMintedEvent(): Observable<MiniatureData[]> {
    return new Observable((observer) => {
      this.contract.events["Minted"]()
        .on('data', (event: any) => {        
          const data = event.returnValues;
          const newMiniature: MiniatureData = {
            name: data.name,
            miniatureUrl: data.url,
            price: data.price,
          }
          observer.next([newMiniature]);
        }
      );  
    })
  }
  
  getOwnedMiniatures(): Observable<MiniatureData[]> {
    if (!this.connectedAccount) {
      return of([]);
    }

    return (from((this.contract.methods as any).getOwnedMiniatures().call({
      from: this.connectedAccount
    })) as Observable<any>)
      .pipe(map(this.mapMiniatureData)
    )
  }

  private mapMiniatureData(miniatures: any): MiniatureData[] {
    if (miniatures?.length) {
      return (miniatures?.map((miniature: any) => {
        return {
          name: miniature.name,
          miniatureUrl: miniature.url,
          price: miniature.price
        }
      }));
    }
    return [];
  }
}