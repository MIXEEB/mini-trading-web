import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MiniatureData } from 'src/app/models/miniature-data.interface';
import { Web3Service } from 'src/app/service/web3.service';

@Component({
  selector: 'app-minting',
  templateUrl: './minting.component.html',
  styleUrls: ['./minting.component.scss']
})
export class MintingComponent {
  miniatureForm: FormGroup;

  batchSize: FormControl = new FormControl(1);

  constructor(private web3Service: Web3Service) {
    this.miniatureForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      miniatureUrl: new FormControl(''),
      price: new FormControl(''),
    })
  }

  mint() {
    this.web3Service.mintMiniature(this.miniatureForm.value)
      .subscribe((response) => {
        console.log(response);
      });
  }

  mintBatch() { 
    const batch: MiniatureData[] = [];
    for (let i = 0; i < this.batchSize.value; i++) {
      batch.push({
        name: "name" + i,
        description: "description" + i,
        miniatureUrl: ".assets/miniatures/bot.png" + i,
        price: 1,
        owner: ""
      })
    }

    this.web3Service.mintMiniatureBatch(batch)
      .subscribe((response) => {
        console.log(response)
      })
  }

}
