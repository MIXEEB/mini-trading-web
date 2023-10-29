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
  contractAddress: string = '0x8ab9fdf5addf07ef58af37d4ebc0dadd5cd08f6d';
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
      .pipe(map(this.mapMiniatureData))
  }

  buyMiniature(index: number): Observable<any> {
    const data = (this.contract.methods as any).buyMiniature(index).encodeABI(); 

    return from(this.web3.eth.sendTransaction({
      from: this.connectedAccount,
      to: this.contractAddress,
      data: data,
      gas: 3000000,
      gasLimit: 3000000,
      value: 1//wei
    }));
  }

  listenToMiniatureMintedEvent(): Observable<MiniatureData[]> {
    return new Observable((observer) => {
      this.contract.events["Minted"]()
        .on('data', (event: any) => {        
          const data = event.returnValues;
          const newMiniature: MiniatureData = {
            name: data.name,
            description: data.description,
            miniatureUrl: data.url,
            price: data.price,
            owner: data.owner
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

  mintMiniature(miniature: MiniatureData): Observable<any> {
    const data = (this.contract.methods as any).createMiniature(
      miniature.name,
      miniature.description,
      miniature.miniatureUrl,
      miniature.price
    ).encodeABI(); 

    return from(this.web3.eth.sendTransaction({
      from: this.connectedAccount,
      to: this.contractAddress,
      data: data,
      gas: 3000000,
      gasLimit: 3000000
    }));
  }

  mintMiniatureBatch(miniatures: MiniatureData[]): Observable<any> {
    const data = (this.contract.methods as any).createMiniaturesBatch(
      miniatures.map(miniature => miniature.name),
      miniatures.map(miniature => miniature.description),
      miniatures.map(miniature => miniature.miniatureUrl),
      miniatures.map(miniature => miniature.price)
    ).encodeABI(); 

    return from(this.web3.eth.sendTransaction({
      from: this.connectedAccount,
      to: this.contractAddress,
      data: data,
      gas: 3000000
    }));
  }

  private mapMiniatureData(miniatures: any): MiniatureData[] {
    if (miniatures?.length) {
      return (miniatures?.map((miniature: any, index: number) => {
        return {
          index,
          name: miniature.name,
          miniatureUrl: miniature.url,
          price: miniature.price,
          owner: miniature.owner
        }
      }));
    }
    return [];
  }
}