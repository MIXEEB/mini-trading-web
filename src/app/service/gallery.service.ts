import { Injectable } from '@angular/core';
import { MiniatureData } from '../models/miniature-data.interface';
import { Observable, concatMap, map, of, scan, switchMap } from 'rxjs';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private web3Service: Web3Service) { }

  getGallery(): Observable<MiniatureData[]> {
    return this.web3Service.getAllMiniatures();
  }

}
