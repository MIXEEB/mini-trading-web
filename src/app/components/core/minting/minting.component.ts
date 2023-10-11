import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Web3Service } from 'src/app/service/web3.service';

@Component({
  selector: 'app-minting',
  templateUrl: './minting.component.html',
  styleUrls: ['./minting.component.scss']
})
export class MintingComponent {
  miniatureForm: FormGroup;

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
        debugger
        console.log(response);
      });
  }

}
