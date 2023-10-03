import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/service/web3.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

    constructor(private web3Service: Web3Service) {
    }
  
    ngOnInit() {
      this.web3Service
        .getGallery()
        .subscribe();
    }
}
