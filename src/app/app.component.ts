import { ChangeDetectorRef, Component } from '@angular/core';
import Web3 from 'web3';
import TradableMiniature from '../assets/abi/TradableMiniature.json';
import { FormControl, FormGroup } from '@angular/forms';
import { MiniatureData } from './models/miniature-data.interface';

//POC Component
@Component({
  selector: 'app-root-dep',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mini-trading-web';
  connectedAccount!: string;
  miniatureUrls: string[] = [];
  selectedMiniatureUrl: string = '';
  contractAddress: string = '';
  miniatureDataForm: FormGroup;
  miniatures: MiniatureData[] = [];
  private web3!: Web3;

  constructor(private cdr: ChangeDetectorRef) {
    if (typeof (window as any)['ethereum'] !== 'undefined') {
      this.web3 = new Web3((window as any)['ethereum']);
    }

    this.miniatureDataForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      miniatureUrl: new FormControl(''),
      price: new FormControl(''),
    })

    
    this.miniatureUrls = [
      './assets/miniatures/bot.png',
      './assets/miniatures/outcast.png',
      './assets/miniatures/prince.png',
      './assets/miniatures/shroom.png',
    ]
  }

  get name() {
    const formControl = this.miniatureDataForm.get('name');
    if (formControl) {
      return formControl.value;
    }

    return new FormControl('');
  }

  updateMiniatureUrl(url: string) {
    this.miniatureDataForm.get('miniatureUrl')?.setValue(url);
  }

  connectToMetamask() {
    this.web3.eth.requestAccounts()
      .then(accounts => {
        if (accounts.length !== 0) {
          this.connectedAccount = accounts[0];
        }
      })
      .catch(error => {
        console.log('error', error);
      });


    this.listenToEvents();
    this.getAllMiniatures();
  }

  async mint() {
    const contract = new this.web3.eth.Contract(
      TradableMiniature,
      this.contractAddress
    )

    const data = (contract.methods as any).createMiniature(
      this.miniatureDataForm.get('name')?.value,
      this.miniatureDataForm.get('description')?.value,
      this.miniatureDataForm.get('miniatureUrl')?.value,
      this.miniatureDataForm.get('price')?.value,
    ).encodeABI();

    const response = await this.web3.eth.sendTransaction({
      from: this.connectedAccount,
      to: this.contractAddress,
      data: data,
      gas: 3000000,
      gasLimit: 3000000,
    });

    if (response != null) {
      console.log('minted');
    }
  }

  paste() {
    navigator.clipboard.readText().then(cliptext => {
      this.contractAddress = cliptext;
    })
  }

  getAllMiniatures(){ 
    const contract = new this.web3.eth.Contract(
      TradableMiniature,
      this.contractAddress
    );

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
  }

  listenToEvents() {
    const contract = new this.web3.eth.Contract(
      TradableMiniature,
      this.contractAddress
    )
    
    contract.events["Minted"]()
      .on('data', (event: any) => {

        const data = event.returnValues;
        const newMiniature: MiniatureData = {
          name: data.name,
          miniatureUrl: data.url,
          price: data.price,
        }
        this.miniatures = [...this.miniatures, newMiniature];
        this.cdr.detectChanges();
      }
    );  
  }

  staticMiniData: MiniatureData = {
    name: 'Bot',
    miniatureUrl: './assets/miniatures/bot.png',
    price: 0.1,
  } 
}
